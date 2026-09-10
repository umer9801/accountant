import { getDb } from "../../_db.js";
import { requireAdmin, cors } from "../../_auth.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const isAdmin = requireAdmin(req);
  if (!isAdmin) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.query;

  if (!id) return res.status(400).json({ error: "ID required" });

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const db = await getDb();
    const col = db.collection("contacts");

    if (req.method === "DELETE") {
      await col.deleteOne({ _id: objectId });
      return res.status(200).json({ success: true });
    }

    if (req.method === "PATCH") {
      await col.updateOne({ _id: objectId }, { $set: { read: true } });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("contacts/[id] error:", err);
    return res.status(500).json({ error: err.message });
  }
}
