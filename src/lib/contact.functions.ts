import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";

// Simple in-memory rate limiter (per instance)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

type ContactInput = Record<string, unknown>;

function validatePayload(body: ContactInput) {
  const errors: string[] = [];
  const name = typeof body['name'] === "string" ? (body['name'] as string).trim() : "";
  const email = typeof body['email'] === "string" ? (body['email'] as string).trim() : "";
  const message = typeof body['message'] === "string" ? (body['message'] as string).trim() : "";
  const subject = typeof body['subject'] === "string" ? (body['subject'] as string).trim() : "";
  const phone = typeof body['phone'] === "string" ? (body['phone'] as string).trim() : "";
  const website = typeof body['website'] === "string" ? (body['website'] as string).trim() : "";

  if (name.length < 2) errors.push("El nombre debe tener al menos 2 caracteres");
  if (name.length > 100) errors.push("El nombre es demasiado largo");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Email no válido");
  if (email.length > 255) errors.push("Email demasiado largo");
  if (message.length < 10) errors.push("El mensaje debe tener al menos 10 caracteres");
  if (message.length > 2000) errors.push("El mensaje es demasiado largo");
  if (subject.length > 200) errors.push("El asunto es demasiado largo");
  if (phone.length > 20) errors.push("Teléfono demasiado largo");

  return { valid: errors.length === 0, errors, name, email, message, subject, phone, website };
}

export type ContactResult =
  | { ok: true; id: string }
  | { error: string; details?: string[] };

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): ContactInput => {
    if (input == null || typeof input !== "object") return {};
    return input as ContactInput;
  })
  .handler(async ({ data: body }): Promise<ContactResult> => {
    try {
      const ip =
        getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
        getRequestHeader("cf-connecting-ip") ??
        "unknown";

      if (isRateLimited(ip)) {
        return { error: "Demasiados envíos. Inténtelo más tarde." };
      }

      const { valid, errors, name, email, message, subject, phone, website } =
        validatePayload(body);

      // Honeypot: if website field is filled, silently accept but don't store
      if (website) {
        return { ok: true, id: "ok" };
      }

      if (!valid) {
        return { error: "Validación fallida", details: errors };
      }

      const supabaseUrl = process.env['SUPABASE_URL']!;
      const supabaseKey = process.env['SUPABASE_SERVICE_ROLE_KEY']!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const userAgent = getRequestHeader("user-agent") ?? null;
      const referrer = getRequestHeader("referer") ?? null;
      const pagePath = typeof body['page_path'] === "string" ? (body['page_path'] as string) : null;

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

      if (dbError || !row) {
        console.error("DB insert error:", dbError);
        return { error: "Error al guardar el mensaje" };
      }

      // Send email via Resend (best-effort — message is already saved)
      const resendApiKey = process.env['RESEND_API_KEY'];
      const contactTo = process.env['CONTACT_TO_EMAIL'] ?? "miguel.mas.castellano@gmail.com";
      const contactFrom = process.env['CONTACT_FROM_EMAIL'] ?? "onboarding@resend.dev";
      const appUrl = process.env['APP_URL'] ?? "https://mascastellanoprocuradores.com";

      if (resendApiKey) {
        try {
          const escapeHtml = (s: string) =>
            s
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#39;");

          const eName = escapeHtml(name);
          const eEmail = escapeHtml(email);
          const ePhone = escapeHtml(phone);
          const eSubject = escapeHtml(subject);
          const eMessage = escapeHtml(message);

          const emailSubject = `[Contacto] ${subject || "Nuevo mensaje"} — ${name}`.replace(/[\r\n]+/g, " ");
          const adminLink = `${appUrl}/admin/contact/${row.id}`;
          const fecha = new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" });

          const htmlBody = `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
  <h2 style="color:#1a1a1a;border-bottom:2px solid #c9a84c;padding-bottom:10px">Nuevo mensaje de contacto</h2>
  <table style="width:100%;border-collapse:collapse;margin:20px 0">
    <tr><td style="padding:8px 12px;font-weight:bold;color:#555;width:120px">Nombre</td><td style="padding:8px 12px">${eName}</td></tr>
    <tr style="background:#f9f9f9"><td style="padding:8px 12px;font-weight:bold;color:#555">Email</td><td style="padding:8px 12px"><a href="mailto:${encodeURIComponent(email)}">${eEmail}</a></td></tr>
    ${phone ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#555">Teléfono</td><td style="padding:8px 12px">${ePhone}</td></tr>` : ""}
    <tr style="background:#f9f9f9"><td style="padding:8px 12px;font-weight:bold;color:#555">Asunto</td><td style="padding:8px 12px">${eSubject || "—"}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:bold;color:#555">Fecha</td><td style="padding:8px 12px">${fecha}</td></tr>
  </table>
  <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:20px 0">
    <h3 style="margin:0 0 8px;color:#333">Mensaje</h3>
    <p style="white-space:pre-wrap;margin:0;color:#444">${eMessage}</p>
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

      return { ok: true, id: row.id as string };
    } catch (err) {
      console.error("Contact function error:", err);
      return { error: "Error interno del servidor" };
    }
  });
