import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

// Simple in-memory rate limiter (per instance)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

function validatePayload(body: Record<string, unknown>) {
  const errors: string[] = [];
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";

  if (name.length < 2) errors.push("El nombre debe tener al menos 2 caracteres");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Email no válido");
  if (message.length < 10) errors.push("El mensaje debe tener al menos 10 caracteres");
  if (subject.length > 200) errors.push("El asunto es demasiado largo");

  return { valid: errors.length === 0, errors, name, email, message, subject, phone, website };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("cf-connecting-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Demasiados envíos. Inténtelo más tarde." }),
        { status: 429, headers: corsHeaders }
      );
    }

    const body = await req.json();
    const { valid, errors, name, email, message, subject, phone, website } =
      validatePayload(body);

    // Honeypot: if website field is filled, silently accept but don't store
    if (website) {
      return new Response(JSON.stringify({ ok: true, id: "ok" }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (!valid) {
      return new Response(JSON.stringify({ error: "Validación fallida", details: errors }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const userAgent = req.headers.get("user-agent") ?? null;
    const referrer = req.headers.get("referer") ?? null;
    const pagePath = typeof body.page_path === "string" ? body.page_path : null;

    // Insert into DB first (priority: never lose the message)
    const { data: row, error: dbError } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        ip,
        user_agent: userAgent,
        referrer,
        page_path: pagePath,
        status: "new",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Error al guardar el mensaje" }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Send email via Resend (best-effort — message is already saved)
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const contactTo = Deno.env.get("CONTACT_TO_EMAIL") ?? "miguel.mas.castellano@gmail.com";
    const contactFrom = Deno.env.get("CONTACT_FROM_EMAIL") ?? "onboarding@resend.dev";
    const appUrl = Deno.env.get("APP_URL") ?? "https://mascastellanoprocuradores.lovable.app";

    if (resendApiKey) {
      try {
        const emailSubject = `[Contacto] ${subject || "Nuevo mensaje"} — ${name}`;
        const adminLink = `${appUrl}/admin/contact/${row.id}`;
        const fecha = new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" });

        const htmlBody = `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
  <h2 style="color:#1a1a1a;border-bottom:2px solid #c9a84c;padding-bottom:10px">Nuevo mensaje de contacto</h2>
  <table style="width:100%;border-collapse:collapse;margin:20px 0">
    <tr><td style="padding:8px 12px;font-weight:bold;color:#555;width:120px">Nombre</td><td style="padding:8px 12px">${name}</td></tr>
    <tr style="background:#f9f9f9"><td style="padding:8px 12px;font-weight:bold;color:#555">Email</td><td style="padding:8px 12px"><a href="mailto:${email}">${email}</a></td></tr>
    ${phone ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#555">Teléfono</td><td style="padding:8px 12px">${phone}</td></tr>` : ""}
    <tr style="background:#f9f9f9"><td style="padding:8px 12px;font-weight:bold;color:#555">Asunto</td><td style="padding:8px 12px">${subject || "—"}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:bold;color:#555">Fecha</td><td style="padding:8px 12px">${fecha}</td></tr>
  </table>
  <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:20px 0">
    <h3 style="margin:0 0 8px;color:#333">Mensaje</h3>
    <p style="white-space:pre-wrap;margin:0;color:#444">${message}</p>
  </div>
  <a href="${adminLink}" style="display:inline-block;background:#c9a84c;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;margin-top:12px">Ver en el panel admin</a>
</div>`;

        const textBody = `Nuevo mensaje de contacto\n\nNombre: ${name}\nEmail: ${email}${phone ? `\nTeléfono: ${phone}` : ""}\nAsunto: ${subject || "—"}\nFecha: ${fecha}\n\nMensaje:\n${message}\n\nVer en admin: ${adminLink}`;

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: contactFrom,
            to: [contactTo],
            reply_to: email,
            subject: emailSubject,
            html: htmlBody,
            text: textBody,
          }),
        });

        if (!res.ok) {
          const errBody = await res.text();
          console.error("Resend error:", res.status, errBody);
        }
      } catch (emailErr) {
        console.error("Email send failed:", emailErr);
        // Message is already saved — don't fail the request
      }
    } else {
      console.warn("RESEND_API_KEY not configured — skipping email");
    }

    return new Response(JSON.stringify({ ok: true, id: row.id }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("Contact function error:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: corsHeaders }
    );
  }
});
