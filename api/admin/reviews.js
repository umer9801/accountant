import { getDb } from "../_db.js";
import { requireAdmin, cors } from "../_auth.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!requireAdmin(req)) return res.status(401).json({ error: "Unauthorized" });

  const db = await getDb();
  const col = db.collection("reviews");

  if (req.method === "GET") {
    const reviews = await col.find({}).sort({ createdAt: -1 }).toArray();
    return res.status(200).json(reviews);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    await col.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ success: true });
  }

  if (req.method === "PATCH") {
    const { id } = req.query;
    await col.updateOne({ _id: new ObjectId(id) }, { $set: { status: "approved" } });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
