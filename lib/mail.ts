import nodemailer from "nodemailer";

type EmailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text: string;
  attachments?: EmailAttachment[];
};

async function sendWithResend(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY || "";
  const from = process.env.ORDER_FROM_EMAIL || "Royalis Lab <info@royalislabs.com>";
  const replyTo = process.env.ORDER_REPLY_TO_EMAIL || process.env.ETRANSFER_EMAIL || "info@royalislabs.com";

  if (!apiKey) {
    throw new Error("Resend email is not configured.");
  }

  if (payload.attachments?.length) {
    throw new Error("Resend attachment delivery is not implemented.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: payload.to,
      reply_to: replyTo,
      subject: payload.subject,
      html: payload.html,
      text: payload.text
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend email failed: ${response.status} ${details}`);
  }
}

export async function sendTransactionalEmail(payload: EmailPayload) {
  const emailProvider = (process.env.EMAIL_PROVIDER || "").toLowerCase();
  const resendApiKey = process.env.RESEND_API_KEY || "";

  if (emailProvider === "resend" || resendApiKey) {
    await sendWithResend(payload);
    return;
  }

  const smtpUser = process.env.GOOGLE_WORKSPACE_SMTP_USER || "";
  const smtpPass = (process.env.GOOGLE_WORKSPACE_SMTP_PASS || "").replace(/\s+/g, "");
  const smtpHost = process.env.GOOGLE_WORKSPACE_SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.GOOGLE_WORKSPACE_SMTP_PORT || "465");
  const smtpSecure = (process.env.GOOGLE_WORKSPACE_SMTP_SECURE || "true").toLowerCase() !== "false";
  const smtpTimeout = Number(process.env.GOOGLE_WORKSPACE_SMTP_TIMEOUT_MS || "15000");
  const from =
    process.env.ORDER_FROM_EMAIL ||
    `Royalis Lab <${smtpUser || process.env.ETRANSFER_EMAIL || "info@royalislabs.com"}>`;
  const replyTo = process.env.ORDER_REPLY_TO_EMAIL || process.env.ETRANSFER_EMAIL || smtpUser;

  if (!smtpUser || !smtpPass) {
    if (process.env.VERCEL_ENV === "production") {
      throw new Error("Google Workspace email is not configured.");
    }

    console.info("Royalis Google Workspace email preview", {
      from,
      replyTo,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      attachments: payload.attachments?.map((attachment) => ({
        filename: attachment.filename,
        contentType: attachment.contentType,
        bytes: attachment.content.byteLength
      }))
    });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number.isFinite(smtpPort) ? smtpPort : 465,
    secure: smtpSecure,
    connectionTimeout: Number.isFinite(smtpTimeout) ? smtpTimeout : 15000,
    greetingTimeout: Number.isFinite(smtpTimeout) ? smtpTimeout : 15000,
    socketTimeout: Number.isFinite(smtpTimeout) ? smtpTimeout : 15000,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const timeoutMs = Number.isFinite(smtpTimeout) ? smtpTimeout : 15000;

  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("Google Workspace email timed out."));
      }, timeoutMs);

      transporter
        .sendMail({
          from,
          to: payload.to,
          replyTo,
          subject: payload.subject,
          html: payload.html,
          text: payload.text,
          attachments: payload.attachments
        })
        .then(resolve)
        .catch(reject)
        .finally(() => clearTimeout(timer));
    });
  } finally {
    transporter.close();
  }
}
