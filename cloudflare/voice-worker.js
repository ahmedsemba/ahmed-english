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


function liveKitHttpUrl(value) {
  return String(value || "").replace(/^wss:/i, "https:").replace(/^ws:/i, "http:").replace(/\/+$/, "");
}
async function createRoomAdminToken(env, roomName) {
  const now = Math.floor(Date.now() / 1000);
  return signToken({
    iss: env.LIVEKIT_API_KEY,
    sub: "classroom_worker",
    nbf: now - 5,
    exp: now + 5 * 60,
    video: { room: roomName, roomAdmin: true }
  }, env.LIVEKIT_API_SECRET);
}
async function liveKitRoomService(env, roomName, method, payload = {}) {
  const token = await createRoomAdminToken(env, roomName);
  const response = await fetch(liveKitHttpUrl(env.LIVEKIT_URL) + "/twirp/livekit.RoomService/" + method, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ room: roomName, ...payload })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.msg || result.error || "LiveKit room management request failed.");
  }
  return result;
}
function isMicrophoneTrack(track) {
  return track && (track.source === 2 || track.source === "MICROPHONE");
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

    // Proxy only publicly shared Drive PDFs so browsers can load them into PDF.js.
    // The file remains in Google Drive; this Worker streams it without storing a copy.
    if (request.method === "GET" && url.pathname === "/pdf") {
      const fileId = url.searchParams.get("fileId") || "";
      const resourceKey = url.searchParams.get("resourceKey") || "";
      if (!/^[A-Za-z0-9_-]{10,200}$/.test(fileId) ||
          (resourceKey && !/^[A-Za-z0-9_-]{5,200}$/.test(resourceKey))) {
        return reply({ error: "Invalid Google Drive file ID." }, 400);
      }
      try {
        const upstream = await fetch(
          "https://drive.google.com/uc?export=download&id=" + encodeURIComponent(fileId) +
            (resourceKey ? "&resourcekey=" + encodeURIComponent(resourceKey) : ""),
          { redirect: "follow", headers: { "User-Agent": "Mozilla/5.0" } }
        );
        if (!upstream.ok) return reply({ error: "Google Drive could not provide this file. Check that link sharing is enabled." }, 502);
        const contentLength = Number(upstream.headers.get("Content-Length") || 0);
        if (contentLength > 40 * 1024 * 1024) return reply({ error: "PDF is larger than the 40 MB classroom demo limit." }, 413);
        const maxPdfBytes = 40 * 1024 * 1024;
        if (!upstream.body) return reply({ error: "Google Drive returned an empty response." }, 502);
        const reader = upstream.body.getReader();
        const chunks = [];
        let totalBytes = 0;
        while (true) {
          const part = await reader.read();
          if (part.done) break;
          totalBytes += part.value.byteLength;
          if (totalBytes > maxPdfBytes) {
            await reader.cancel();
            return reply({ error: "PDF is larger than the 40 MB classroom demo limit." }, 413);
          }
          chunks.push(part.value);
        }
        if (totalBytes < 5) return reply({ error: "The Drive response is empty or incomplete." }, 502);
        const bytes = new Uint8Array(totalBytes);
        let offset = 0;
        for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
        const signature = new TextDecoder().decode(bytes.subarray(0, 5));
        if (signature !== "%PDF-") {
          return reply({ error: "Google Drive returned a preview or confirmation page instead of a PDF. The file may be too large or have restricted downloads." }, 502);
        }
        return new Response(bytes, {
          status: 200,
          headers: {
            ...CORS,
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline; filename=\"classroom-material.pdf\"",
            "Cache-Control": "private, max-age=60",
            "X-Content-Type-Options": "nosniff"
          }
        });
      } catch (error) {
        return reply({ error: "Could not retrieve the public PDF from Google Drive." }, 502);
      }
    }

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
      const allowedGrades = [
        "للكل",
        "الصف الأول الابتدائي", "الصف الثاني الابتدائي", "الصف الثالث الابتدائي",
        "الصف الرابع الابتدائي", "الصف الخامس الابتدائي", "الصف السادس الابتدائي",
        "الصف الأول الإعدادي", "الصف الثاني الإعدادي", "الصف الثالث الإعدادي"
      ];
      const grade = String(body.grade || "");
      const materialId = String(body.materialId || "").trim();
      const materialTitle = String(body.materialTitle || "").trim();
      const driveFileId = String(body.driveFileId || "").trim();
      if (!allowedGrades.includes(grade)) return reply({ error: "اختر صفًا دراسيًا صحيحًا." }, 400);
      if (!materialId || materialId.length > 160 || !materialTitle || !/^[A-Za-z0-9_-]{10,200}$/.test(driveFileId)) {
        return reply({ error: "يجب اختيار ملزمة PDF صالحة من قسم الملازم قبل إنشاء الحصة." }, 400);
      }
      const roomId = randomText(18);
      const roomName = "ahmed_class_" + roomId;
      const joinCode = randomText(9);
      const teacherSecret = randomText(32);
      const room = {
        roomId, roomName, joinCode,
        teacherSecretHash: await hashSecret(teacherSecret),
        title: safeName(body.title || "حصة مباشرة"),
        grade,
        materialId,
        materialTitle: safeName(materialTitle),
        driveFileId,
        createdAt: Date.now()
      };
      await env.CLASSROOMS.put("room:" + roomId, JSON.stringify(room), { expirationTtl: 4 * 60 * 60 });
      return reply({ ok: true, roomId, roomName, joinCode, teacherSecret, livekitUrl: env.LIVEKIT_URL });
    }

    if (url.pathname === "/token" || url.pathname === "/end" || url.pathname === "/participants" || url.pathname === "/mute" || url.pathname === "/mute-all") {
      const roomId = String(body.roomId || "");
      if (!validRoomId(roomId)) return reply({ error: "Invalid classroom ID." }, 400);
      const roomRaw = await env.CLASSROOMS.get("room:" + roomId);
      if (!roomRaw) return reply({ error: "الحصة غير موجودة أو انتهت." }, 404);
      let room;
      try { room = JSON.parse(roomRaw); }
      catch { return reply({ error: "Classroom data is unavailable." }, 500); }

      if (url.pathname === "/end" || url.pathname === "/participants" ||
          url.pathname === "/mute" || url.pathname === "/mute-all") {
        const suppliedHash = await hashSecret(String(body.teacherSecret || ""));
        if (!sameSecret(suppliedHash, room.teacherSecretHash)) {
          return reply({ error: "Teacher authorization failed." }, 403);
        }
        if (url.pathname === "/end") {
          await env.CLASSROOMS.delete("room:" + roomId);
          return reply({ ok: true });
        }
        try {
          const listed = await liveKitRoomService(env, room.roomName, "ListParticipants");
          const students = (listed.participants || [])
            .filter(participant => String(participant.identity || "").startsWith("student_"))
            .map(participant => {
              const mic = (participant.tracks || []).find(isMicrophoneTrack);
              return {
                identity: participant.identity,
                name: safeName(participant.name || "طالب"),
                hasMic: Boolean(mic && mic.sid),
                micMuted: Boolean(mic && mic.muted),
                trackSid: mic && mic.sid ? mic.sid : null
              };
            });
          if (url.pathname === "/participants") return reply({ ok: true, participants: students });
          const targets = url.pathname === "/mute-all"
            ? students.filter(student => student.hasMic && !student.micMuted)
            : students.filter(student => student.identity === String(body.identity || "") && student.hasMic);
          if (url.pathname === "/mute" && !targets.length) {
            return reply({ error: "لم يتم العثور على ميكروفون نشط لهذا الطالب." }, 404);
          }
          let mutedCount = 0;
          for (const student of targets) {
            await liveKitRoomService(env, room.roomName, "MutePublishedTrack", {
              identity: student.identity,
              track_sid: student.trackSid,
              muted: true
            });
            mutedCount++;
          }
          return reply({ ok: true, mutedCount });
        } catch (error) {
          return reply({ error: "تعذر التحكم في الميكروفون عبر LiveKit: " + String(error.message || error).slice(0, 180) }, 502);
        }
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
      return reply({
        ok: true, token, livekitUrl: env.LIVEKIT_URL, identity, role,
        grade: room.grade, materialId: room.materialId,
        materialTitle: room.materialTitle, driveFileId: room.driveFileId
      });
    }
    return reply({ error: "Not found." }, 404);
  }
};
