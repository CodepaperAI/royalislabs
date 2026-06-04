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

export async function sendTransactionalEmail(payload: EmailPayload) {
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
