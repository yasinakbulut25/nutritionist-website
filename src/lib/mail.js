import nodemailer from "nodemailer";

function he(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function sendContactNotification({ ad, email, mesaj }) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Gizem Akbulut Öztürk Web" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `Yeni İletişim Mesajı: ${he(ad)}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#7c3aed,#a78bfa);padding:24px 28px">
          <h2 style="margin:0;color:#fff;font-size:18px">Yeni İletişim Mesajı 📩</h2>
          <p style="margin:4px 0 0;color:#ede9fe;font-size:13px">diyetisyengizemakbulut.com</p>
        </div>
        <div style="padding:28px;background:#fff">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr>
              <td style="padding:8px 0;color:#64748b;width:80px">Ad Soyad</td>
              <td style="padding:8px 0;color:#0f172a;font-weight:600">${he(ad)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#64748b">E-posta</td>
              <td style="padding:8px 0;color:#0f172a;font-weight:600">
                <a href="mailto:${he(email)}" style="color:#7c3aed">${he(email)}</a>
              </td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #f1f5f9;margin:16px 0" />
          <p style="margin:0 0 8px;color:#64748b;font-size:13px">Mesaj</p>
          <p style="margin:0;color:#1e293b;font-size:15px;line-height:1.6;background:#f8fafc;padding:16px;border-radius:8px;border-left:3px solid #7c3aed">${he(mesaj)}</p>
        </div>
        <div style="padding:16px 28px;background:#f8fafc;font-size:12px;color:#94a3b8;text-align:center">
          Bu e-posta otomatik olarak gönderilmiştir.
        </div>
      </div>
    `,
  });
}

export async function sendNewCommentNotification({ ekleyen, sehir, icerik }) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Gizem Akbulut Öztürk Web" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `Yeni Görüş: ${he(ekleyen)} (${he(sehir)})`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#7c3aed,#a78bfa);padding:24px 28px">
          <h2 style="margin:0;color:#fff;font-size:18px">Yeni Danışan Görüşü 💬</h2>
          <p style="margin:4px 0 0;color:#ede9fe;font-size:13px">diyetisyengizemakbulut.com</p>
        </div>
        <div style="padding:28px;background:#fff">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr>
              <td style="padding:8px 0;color:#64748b;width:80px">Ad Soyad</td>
              <td style="padding:8px 0;color:#0f172a;font-weight:600">${he(ekleyen)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#64748b">Şehir</td>
              <td style="padding:8px 0;color:#0f172a;font-weight:600">${he(sehir)}</td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #f1f5f9;margin:16px 0" />
          <p style="margin:0 0 8px;color:#64748b;font-size:13px">Görüş</p>
          <p style="margin:0;color:#1e293b;font-size:15px;line-height:1.6;background:#f8fafc;padding:16px;border-radius:8px;border-left:3px solid #7c3aed">${he(icerik)}</p>
        </div>
        <div style="padding:16px 28px;background:#f8fafc;font-size:12px;color:#94a3b8;text-align:center">
          Bu e-posta otomatik olarak gönderilmiştir.
        </div>
      </div>
    `,
  });
}
