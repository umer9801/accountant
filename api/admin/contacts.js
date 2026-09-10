import { getDb } from "../_db.js";
import { requireAdmin, cors } from "../_auth.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!requireAdmin(req)) return res.status(401).json({ error: "Unauthorized" });

  const db = await getDb();
  const col = db.collection("contacts");

  if (req.method === "GET") {
    const contacts = await col.find({}).sort({ createdAt: -1 }).toArray();
    return res.status(200).json(contacts);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    await col.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ success: true });
  }

  if (req.method === "PATCH") {
    const { id } = req.query;
    await col.updateOne({ _id: new ObjectId(id) }, { $set: { read: true } });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
