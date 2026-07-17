import { getDb } from "./_db.js";
import { requireAdmin, cors } from "./_auth.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const db = await getDb();
  const col = db.collection("contacts");

  if (req.method === "POST") {
    const { name, email, phone, company, service, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ error: "Name, email and message required" });
    await col.insertOne({
      name, email,
      phone: phone || "",
      company: company || "",
      service: service || "",
      message,
      read: false,
      createdAt: new Date(),
    });
    return res.status(201).json({ success: true });
  }

  if (req.method === "GET") {
    if (!requireAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
    const contacts = await col.find({}).sort({ createdAt: -1 }).toArray();
    return res.status(200).json(contacts);
  }

  if (req.method === "DELETE") {
    if (!requireAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
    const { id } = req.query;
    await col.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
