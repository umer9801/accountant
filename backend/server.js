import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { readFileSync } from "fs";

// Load env from backend/.env
const env = Object.fromEntries(
  readFileSync(new URL(".env", import.meta.url), "utf-8")
    .split("\n")
    .filter(l => l.trim() && !l.startsWith("#"))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const MONGO_URI  = env.MONGODB_URI;
const JWT_SECRET = env.JWT_SECRET;
const ADMIN_USER = env.ADMIN_USERNAME;
const ADMIN_PASS = env.ADMIN_PASSWORD;
const PORT       = env.PORT || 5000;
const SMTP_USER  = env.SMTP_USER;
const SMTP_PASS  = env.SMTP_PASS;

// ─── MongoDB ──────────────────────────────────────────────────
const client = new MongoClient(MONGO_URI);
await client.connect();
const db = client.db("properaccounting");
console.log("✅ MongoDB connected");

// ─── Nodemailer ───────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

async function sendEmails({ name, email, phone, company, service, message }) {
  const adminHtml = `
<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(11,31,58,.1);">
  <tr><td style="background:linear-gradient(135deg,#0B1F3A,#1D4ED8);padding:32px 40px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;">New Client Enquiry</h1>
    <p style="color:rgba(255,255,255,.7);margin:8px 0 0;font-size:14px;">Submitted via properaccounting.co.uk</p>
  </td></tr>
  <tr><td style="background:#EFF6FF;border-left:4px solid #1D4ED8;padding:14px 40px;">
    <p style="margin:0;color:#1D4ED8;font-size:14px;font-weight:600;">⚡ Someone wants to contact you — please respond promptly</p>
  </td></tr>
  <tr><td style="padding:32px 40px 0;">
    <table width="100%" cellpadding="0" cellspacing="0">
      ${[["Name", name],["Email", email],["Phone", phone||"—"],["Company", company||"—"],["Service", service||"—"]]
        .map(([l,v])=>`<tr>
          <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;width:38%;font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.5px;">${l}</td>
          <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#0B1F3A;font-weight:500;">${v}</td>
        </tr>`).join("")}
    </table>
  </td></tr>
  <tr><td style="padding:24px 40px 0;">
    <p style="margin:0 0 10px;font-size:16px;font-weight:700;color:#0B1F3A;">Message</p>
    <div style="background:#f8fafc;border-radius:12px;padding:18px;border:1px solid #e2e8f0;">
      <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">${message}</p>
    </div>
  </td></tr>
  <tr><td style="padding:28px 40px;">
    <a href="mailto:${email}" style="display:inline-block;background:linear-gradient(135deg,#1D4ED8,#10B981);color:#fff;text-decoration:none;padding:13px 30px;border-radius:50px;font-size:14px;font-weight:700;">Reply to ${name}</a>
  </td></tr>
  <tr><td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
    <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} Proper Accounting Ltd · Bartle House, 9 Oxford Court, Manchester M2 3WQ</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;

  const userHtml = `
<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(11,31,58,.1);">
  <tr><td style="background:linear-gradient(135deg,#0B1F3A,#1D4ED8);padding:32px 40px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;">Thank You, ${name}</h1>
    <p style="color:rgba(255,255,255,.7);margin:8px 0 0;font-size:14px;">We've received your enquiry</p>
  </td></tr>
  <tr><td style="padding:36px 40px 0;">
    <p style="margin:0 0 14px;font-size:15px;color:#334155;line-height:1.7;">Dear ${name},</p>
    <p style="margin:0 0 14px;font-size:15px;color:#334155;line-height:1.7;">
      Thank you for contacting <strong>Proper Accounting Ltd</strong>. We have received your enquiry${service ? ` regarding <strong>${service}</strong>` : ""} and a member of our team will be in touch with you shortly.
    </p>
    <p style="margin:0 0 28px;font-size:15px;color:#334155;line-height:1.7;">
      We aim to respond to all enquiries within one business day. If urgent, please call us directly.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="48%" style="background:#f8fafc;border-radius:12px;padding:18px;border:1px solid #e2e8f0;">
          <p style="margin:0 0 4px;font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:.5px;">Phone / WhatsApp</p>
          <p style="margin:0;font-size:15px;color:#0B1F3A;font-weight:600;">07774999123</p>
        </td>
        <td width="4%"></td>
        <td width="48%" style="background:#f8fafc;border-radius:12px;padding:18px;border:1px solid #e2e8f0;">
          <p style="margin:0 0 4px;font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:.5px;">Office Hours</p>
          <p style="margin:0;font-size:15px;color:#0B1F3A;font-weight:600;">Mon–Fri · 9:00–18:00</p>
        </td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:20px 40px;">
    <div style="background:#EFF6FF;border-radius:12px;padding:18px;border:1px solid #BFDBFE;">
      <p style="margin:0 0 4px;font-size:11px;color:#1D4ED8;font-weight:700;text-transform:uppercase;letter-spacing:.5px;">Our Office</p>
      <p style="margin:0;font-size:14px;color:#1e3a5f;">Bartle House, 9 Oxford Court, Manchester, England, M2 3WQ</p>
    </div>
  </td></tr>
  <tr><td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
    <p style="margin:0 0 6px;font-size:12px;color:#94a3b8;">This is an automated confirmation. Please do not reply to this email.</p>
    <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} Proper Accounting Ltd · All rights reserved</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;

  await Promise.all([
    transporter.sendMail({
      from: `"Proper Accounting Ltd" <${SMTP_USER}>`,
      to: SMTP_USER,
      subject: `New Enquiry from ${name} — ${service || "General"}`,
      html: adminHtml,
    }),
    transporter.sendMail({
      from: `"Proper Accounting Ltd" <${SMTP_USER}>`,
      to: email,
      subject: "We've received your enquiry — Proper Accounting Ltd",
      html: userHtml,
    }),
  ]);
}

// ─── Express setup ────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json());

// ─── Auth middleware ──────────────────────────────────────────
function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== "admin") throw new Error();
    req.admin = payload;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

// ─── Admin login ──────────────────────────────────────────────
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ role: "admin", username }, JWT_SECRET, { expiresIn: "8h" });
    return res.json({ token });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// ─── Contact form ─────────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, company, service, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "Name, email and message required" });

  await db.collection("contacts").insertOne({
    name, email, phone: phone||"", company: company||"",
    service: service||"", message, read: false, createdAt: new Date(),
  });

  try {
    await sendEmails({ name, email, phone, company, service, message });
    console.log(`✅ Emails sent for enquiry from ${name}`);
  } catch (e) {
    console.error("❌ Email error:", e.message);
  }

  res.status(201).json({ success: true });
});

app.get("/api/admin/contacts", requireAdmin, async (req, res) => {
  const contacts = await db.collection("contacts").find({}).sort({ createdAt: -1 }).toArray();
  res.json(contacts);
});

app.delete("/api/admin/contacts/:id", requireAdmin, async (req, res) => {
  await db.collection("contacts").deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ success: true });
});

app.patch("/api/admin/contacts/:id/read", requireAdmin, async (req, res) => {
  await db.collection("contacts").updateOne(
    { _id: new ObjectId(req.params.id) }, { $set: { read: true } }
  );
  res.json({ success: true });
});

// ─── Reviews ─────────────────────────────────────────────────
app.post("/api/reviews", async (req, res) => {
  const { name, role, quote, rating } = req.body;
  if (!name || !quote) return res.status(400).json({ error: "Name and review required" });
  await db.collection("reviews").insertOne({
    name, role: role||"", quote,
    rating: Math.min(5, Math.max(1, Number(rating)||5)),
    status: "pending", createdAt: new Date(),
  });
  res.status(201).json({ success: true });
});

app.get("/api/reviews", async (req, res) => {
  const reviews = await db.collection("reviews").find({ status: "approved" }).sort({ createdAt: -1 }).toArray();
  res.json(reviews);
});

app.get("/api/admin/reviews", requireAdmin, async (req, res) => {
  const reviews = await db.collection("reviews").find({}).sort({ createdAt: -1 }).toArray();
  res.json(reviews);
});

app.patch("/api/admin/reviews/:id/approve", requireAdmin, async (req, res) => {
  await db.collection("reviews").updateOne(
    { _id: new ObjectId(req.params.id) }, { $set: { status: "approved" } }
  );
  res.json({ success: true });
});

app.delete("/api/admin/reviews/:id", requireAdmin, async (req, res) => {
  await db.collection("reviews").deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ success: true });
});

// ─── Start ────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
