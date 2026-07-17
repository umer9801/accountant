import { getDb } from "./_db.js";
import { requireAdmin, cors } from "./_auth.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const db = await getDb();
  const col = db.collection("reviews");

  if (req.method === "POST") {
    const { name, role, quote, rating } = req.body;
    if (!name || !quote)
      return res.status(400).json({ error: "Name and review required" });
    await col.insertOne({
      name, role: role || "", quote,
      rating: Math.min(5, Math.max(1, Number(rating) || 5)),
      status: "pending",
      createdAt: new Date(),
    });
    return res.status(201).json({ success: true });
  }

  if (req.method === "GET") {
    const isAdmin = requireAdmin(req);
    const query = isAdmin ? {} : { status: "approved" };
    const reviews = await col.find(query).sort({ createdAt: -1 }).toArray();
    return res.status(200).json(reviews);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
