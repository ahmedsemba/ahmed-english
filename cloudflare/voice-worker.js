const corsHeaders = {
  "Access-Control-Allow-Origin": "https://ahmedsemba.github.io",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" }
  });
}

function base64url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/=/g, "").replace(/\\+/g, "-").replace(/\\//g, "_");
}

function randomText(length = 24) {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return base64url(bytes);
}

async function signToken(payload, secret) {
  const header = base64url(new TextEncoder().encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const body = base64url(new TextEncoder().encode(JSON.stringify(payload)));
  const input = header + "." + body;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(input));
  return input + "." + base64url(new Uint8Array(signature));
}

function safeName(value) {
  return String(value || "مشارك").replace(/[<>\u0000-\u001f]/g, "").trim().slice(0, 60) || "مشارك";
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/health") {
      return json({
        ok: true,
        configured: Boolean(env.LIVEKIT_URL && env.LIVEKIT_API_KEY && env.LIVEKIT_API_SECRET && env.TEACHER_PIN && env.CLASSROOMS)
      });
    }

    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    if (!env.CLASSROOMS || !env.LIVEKIT_URL || !env.LIVEKIT_API_KEY || !env.LIVEKIT_API_SECRET || !env.TEACHER_PIN) {
      return json({ error: "Voice service is not configured yet." }, 503);
    }

    if (url.pathname === "/create") {
      if (body.teacherPin !== env.TEACHER_PIN) return json({ error: "Teacher PIN is incorrect." }, 403);
      const roomId = randomText(18);
      const roomName = "ahmed_class_" + roomId;
      const joinCode = randomText(9);
      const room = {
        roomId,
        roomName,
        joinCode,
        title: safeName(body.title || "حصة مباشرة"),
        grade: safeName(body.grade || "للكل"),
        createdAt: Date.now()
      };
      await env.CLASSROOMS.put("room:" + roomId, JSON.stringify(room), { expirationTtl: 4 * 60 * 60 });
      return json({ ok: true, roomId, roomName, joinCode, livekitUrl: env.LIVEKIT_URL });
    }

    if (url.pathname === "/token") {
      const roomId = String(body.roomId || "");
      const roomRaw = await env.CLASSROOMS.get("room:" + roomId);
      if (!roomRaw) return json({ error: "الحصة غير موجودة أو انتهت." }, 404);
      const room = JSON.parse(roomRaw);
      const role = body.role === "teacher" ? "teacher" : "student";

      if (role === "teacher") {
        if (body.teacherPin !== env.TEACHER_PIN) return json({ error: "Teacher PIN is incorrect." }, 403);
      } else if (!body.joinCode || body.joinCode !== room.joinCode) {
        return json({ error: "رمز دخول الحصة غير صحيح." }, 403);
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
          canPublishData: true,
          roomAdmin: role === "teacher"
        }
      }, env.LIVEKIT_API_SECRET);

      return json({ ok: true, token, livekitUrl: env.LIVEKIT_URL, identity, role });
    }

    if (url.pathname === "/end") {
      if (body.teacherPin !== env.TEACHER_PIN) return json({ error: "Teacher PIN is incorrect." }, 403);
      const roomId = String(body.roomId || "");
      await env.CLASSROOMS.delete("room:" + roomId);
      return json({ ok: true });
    }

    return json({ error: "Not found" }, 404);
  }
};
