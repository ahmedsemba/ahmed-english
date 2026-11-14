const ALLOWED_ORIGIN = "https://ahmedsemba.github.io";
const CORS = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin"
};

function reply(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}
function base64url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/=/g, "").replaceAll("+", "-").replaceAll("/", "_");
}
function randomText(size = 24) {
  return base64url(crypto.getRandomValues(new Uint8Array(size)));
}
function safeName(value) {
  return String(value || "مشارك").replace(/[<>]/g, "").replace(/[\x00-\x1F]/g, "").trim().slice(0, 60) || "مشارك";
}
function validRoomId(value) {
  return typeof value === "string" && /^[A-Za-z0-9_-]{20,40}$/.test(value);
}
async function hashSecret(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
}
function sameSecret(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}
async function signToken(payload, secret) {
  const header = base64url(new TextEncoder().encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const body = base64url(new TextEncoder().encode(JSON.stringify(payload)));
  const input = header + "." + body;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(input));
  return input + "." + base64url(new Uint8Array(signature));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    if (request.method === "OPTIONS") {
      if (origin !== ALLOWED_ORIGIN) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: CORS });
    }
    if (request.method === "GET" && url.pathname === "/health") {
      return reply({
        ok: true,
        configured: Boolean(env.LIVEKIT_URL && env.LIVEKIT_API_KEY &&
          env.LIVEKIT_API_SECRET && env.TEACHER_PIN && env.CLASSROOMS)
      });
    }
    if (origin !== ALLOWED_ORIGIN) return reply({ error: "Origin not allowed." }, 403);
    if (request.method !== "POST") return reply({ error: "Method not allowed." }, 405);
    if (!request.headers.get("Content-Type")?.toLowerCase().includes("application/json")) {
      return reply({ error: "Content-Type must be application/json." }, 415);
    }
    if (!env.CLASSROOMS || !env.LIVEKIT_URL || !env.LIVEKIT_API_KEY ||
        !env.LIVEKIT_API_SECRET || !env.TEACHER_PIN) {
      return reply({ error: "Voice service is not configured yet." }, 503);
    }

    let body;
    try { body = await request.json(); }
    catch { return reply({ error: "Invalid JSON body." }, 400); }

    if (url.pathname === "/create") {
      if (!sameSecret(String(body.teacherPin || ""), String(env.TEACHER_PIN))) {
        return reply({ error: "Teacher PIN is incorrect." }, 403);
      }
      const roomId = randomText(18);
      const roomName = "ahmed_class_" + roomId;
      const joinCode = randomText(9);
      const teacherSecret = randomText(32);
      const room = {
        roomId, roomName, joinCode,
        teacherSecretHash: await hashSecret(teacherSecret),
        title: safeName(body.title || "حصة مباشرة"),
        grade: safeName(body.grade || "للكل"),
        createdAt: Date.now()
      };
      await env.CLASSROOMS.put("room:" + roomId, JSON.stringify(room), { expirationTtl: 4 * 60 * 60 });
      return reply({ ok: true, roomId, roomName, joinCode, teacherSecret, livekitUrl: env.LIVEKIT_URL });
    }

    if (url.pathname === "/token" || url.pathname === "/end") {
      const roomId = String(body.roomId || "");
      if (!validRoomId(roomId)) return reply({ error: "Invalid classroom ID." }, 400);
      const roomRaw = await env.CLASSROOMS.get("room:" + roomId);
      if (!roomRaw) return reply({ error: "الحصة غير موجودة أو انتهت." }, 404);
      let room;
      try { room = JSON.parse(roomRaw); }
      catch { return reply({ error: "Classroom data is unavailable." }, 500); }

      if (url.pathname === "/end") {
        const suppliedHash = await hashSecret(String(body.teacherSecret || ""));
        if (!sameSecret(suppliedHash, room.teacherSecretHash)) {
          return reply({ error: "Teacher authorization failed." }, 403);
        }
        await env.CLASSROOMS.delete("room:" + roomId);
        return reply({ ok: true });
      }

      const role = body.role === "teacher" ? "teacher" : "student";
      if (role === "teacher") {
        const suppliedHash = await hashSecret(String(body.teacherSecret || ""));
        if (!sameSecret(suppliedHash, room.teacherSecretHash)) {
          return reply({ error: "Teacher authorization failed." }, 403);
        }
      } else if (!sameSecret(String(body.joinCode || ""), room.joinCode)) {
        return reply({ error: "رمز دخول الحصة غير صحيح." }, 403);
      }

      const now = Math.floor(Date.now() / 1000);
      const identity = role + "_" + randomText(12);
      const token = await signToken({
        iss: env.LIVEKIT_API_KEY,
        sub: identity,
        nbf: now - 5,
        exp: now + 2 * 60 * 60,
        name: safeName(body.participantName),
        video: {
          roomJoin: true,
          room: room.roomName,
          canPublish: true,
          canSubscribe: true,
          canPublishData: role === "teacher",
          roomAdmin: role === "teacher"
        }
      }, env.LIVEKIT_API_SECRET);
      return reply({ ok: true, token, livekitUrl: env.LIVEKIT_URL, identity, role });
    }
    return reply({ error: "Not found." }, 404);
  }
};
