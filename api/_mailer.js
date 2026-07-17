import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email to admin — full contact details
export function adminEmailHtml({ name, email, phone, company, service, message }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>New Enquiry — Proper Accounting Ltd</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(11,31,58,0.10);">
        
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0B1F3A 0%,#1D4ED8 100%);padding:36px 40px;text-align:center;">
            <img src="https://accountant-68hw4gydw-umarilyas811-9969s-projects.vercel.app/logo.png" alt="Proper Accounting Ltd" style="height:56px;object-fit:contain;margin-bottom:16px;" />
            <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;letter-spacing:-0.3px;">New Client Enquiry</h1>
            <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">Submitted via properaccounting.co.uk</p>
          </td>
        </tr>

        <!-- Alert banner -->
        <tr>
          <td style="background:#EFF6FF;border-left:4px solid #1D4ED8;padding:16px 40px;">
            <p style="margin:0;color:#1D4ED8;font-size:14px;font-weight:600;">⚡ Action Required — A new enquiry needs your attention</p>
          </td>
        </tr>

        <!-- Contact details -->
        <tr>
          <td style="padding:36px 40px 0;">
            <h2 style="margin:0 0 24px;font-size:18px;color:#0B1F3A;font-weight:700;">Contact Details</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                ["Full Name", name],
                ["Email Address", email],
                ["Phone", phone || "Not provided"],
                ["Company", company || "Not provided"],
                ["Service of Interest", service || "Not specified"],
              ].map(([label, value]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;width:40%;">
                  <span style="font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">${label}</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                  <span style="font-size:14px;color:#0B1F3A;font-weight:500;">${value}</span>
                </td>
              </tr>`).join("")}
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:24px 40px 0;">
            <h2 style="margin:0 0 12px;font-size:18px;color:#0B1F3A;font-weight:700;">Message</h2>
            <div style="background:#f8fafc;border-radius:12px;padding:20px;border:1px solid #e2e8f0;">
              <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">${message}</p>
            </div>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:32px 40px;">
            <a href="mailto:${email}" style="display:inline-block;background:linear-gradient(135deg,#1D4ED8,#10B981);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:14px;font-weight:700;">
              Reply to ${name}
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} Proper Accounting Ltd · Bartle House, 9 Oxford Court, Manchester M2 3WQ</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Confirmation email to user
export function userEmailHtml({ name, service }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Thank You — Proper Accounting Ltd</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(11,31,58,0.10);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0B1F3A 0%,#1D4ED8 100%);padding:36px 40px;text-align:center;">
            <img src="https://accountant-68hw4gydw-umarilyas811-9969s-projects.vercel.app/logo.png" alt="Proper Accounting Ltd" style="height:56px;object-fit:contain;margin-bottom:16px;" />
            <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">Thank You, ${name}</h1>
            <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">We've received your enquiry</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 0;">
            <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
              Dear ${name},
            </p>
            <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
              Thank you for getting in touch with <strong>Proper Accounting Ltd</strong>. We have received your enquiry regarding <strong>${service || "our accounting services"}</strong> and a member of our team will be in contact with you shortly.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#334155;line-height:1.7;">
              We aim to respond to all enquiries within one business day. In the meantime, if your matter is urgent, please do not hesitate to call us directly.
            </p>

            <!-- Info cards -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="48%" style="background:#f8fafc;border-radius:12px;padding:20px;border:1px solid #e2e8f0;vertical-align:top;">
                  <p style="margin:0 0 6px;font-size:12px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Phone</p>
                  <p style="margin:0;font-size:15px;color:#0B1F3A;font-weight:600;">07774999123</p>
                </td>
                <td width="4%"></td>
                <td width="48%" style="background:#f8fafc;border-radius:12px;padding:20px;border:1px solid #e2e8f0;vertical-align:top;">
                  <p style="margin:0 0 6px;font-size:12px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Office Hours</p>
                  <p style="margin:0;font-size:15px;color:#0B1F3A;font-weight:600;">Mon–Fri · 9:00–18:00</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Address -->
        <tr>
          <td style="padding:24px 40px;">
            <div style="background:#EFF6FF;border-radius:12px;padding:20px;border:1px solid #BFDBFE;">
              <p style="margin:0 0 4px;font-size:12px;color:#1D4ED8;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Our Office</p>
              <p style="margin:0;font-size:14px;color:#1e3a5f;">Bartle House, 9 Oxford Court, Manchester, England, M2 3WQ</p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0 0 8px;font-size:12px;color:#94a3b8;">This is an automated confirmation. Please do not reply to this email.</p>
            <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} Proper Accounting Ltd · All rights reserved</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
