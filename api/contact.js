import { getDb } from "./_db.js";
import { requireAdmin, cors } from "./_auth.js";
import { ObjectId } from "mongodb";
import { transporter, adminEmailHtml, userEmailHtml } from "./_mailer.js";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const db = await getDb();
  const col = db.collection("contacts");

  // POST — public: submit contact form
  if (req.method === "POST") {
    const { name, email, phone, company, service, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ error: "Name, email and message required" });

    // Save to DB
    await col.insertOne({
      name, email,
      phone: phone || "",
      company: company || "",
      service: service || "",
      message,
      read: false,
      createdAt: new Date(),
    });

    // Send emails (don't block response on failure)
    try {
      const adminEmail = process.env.SMTP_USER || "info@properaccounting.co.uk";

      // Email to admin
      await transporter.sendMail({
        from: `"Proper Accounting Ltd" <${adminEmail}>`,
        to: adminEmail,
        subject: `New Enquiry from ${name} — ${service || "General"}`,
        html: adminEmailHtml({ name, email, phone, company, service, message }),
      });

      // Confirmation email to user
      await transporter.sendMail({
        from: `"Proper Accounting Ltd" <${adminEmail}>`,
        to: email,
        subject: "We've received your enquiry — Proper Accounting Ltd",
        html: userEmailHtml({ name, service }),
      });
    } catch (emailErr) {
      console.error("Email send error:", emailErr);
      // Still return success — DB save worked
    }

    return res.status(201).json({ success: true });
  }

  // GET — admin: all contacts
  if (req.method === "GET") {
    if (!requireAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
    const contacts = await col.find({}).sort({ createdAt: -1 }).toArray();
    return res.status(200).json(contacts);
  }

  // DELETE — admin
  if (req.method === "DELETE") {
    if (!requireAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
    const { id } = req.query;
    await col.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
