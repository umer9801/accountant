import { getDb } from "../../../_db.js";
import { requireAdmin, cors } from "../../../_auth.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!requireAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
  if (req.method !== "PATCH") return res.status(405).json({ error: "Method not allowed" });

  const { id } = req.query;
  const db = await getDb();
  await db.collection("reviews").updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "approved" } }
  );
  return res.status(200).json({ success: true });
}
