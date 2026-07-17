import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { readFileSync } from "fs";

// Load env
const env = Object.fromEntries(
  readFileSync(".env", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("=").map((s) => s.trim()))
);
const MONGO_URI = env.MONGODB_URI;
const JWT_SECRET = env.JWT_SECRET;
const ADMIN_USER = env.ADMIN_USERNAME;
const ADMIN_PASS = env.ADMIN_PASSWORD;
const PORT = env.PORT || 5000;

// MongoDB
const client = new MongoClient(MONGO_URI);
await client.connect();
const db = client.db("properaccounting");
console.log("✅ MongoDB connected");

const app = express();
app.use(cors());
app.use(express.json());

// ─── Auth middleware ───────────────────────────────────────────
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
// Public: submit
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, company, service, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "Name, email and message required" });
  await db.collection("contacts").insertOne({
    name, email,
    phone: phone || "",
    company: company || "",
    service: service || "",
    message,
    read: false,
    createdAt: new Date(),
  });
  res.status(201).json({ success: true });
});

// Admin: get all contacts
app.get("/api/admin/contacts", requireAdmin, async (req, res) => {
  const contacts = await db.collection("contacts").find({}).sort({ createdAt: -1 }).toArray();
  res.json(contacts);
});

// Admin: delete contact
app.delete("/api/admin/contacts/:id", requireAdmin, async (req, res) => {
  await db.collection("contacts").deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ success: true });
});

// Admin: mark contact as read
app.patch("/api/admin/contacts/:id/read", requireAdmin, async (req, res) => {
  await db.collection("contacts").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { read: true } }
  );
  res.json({ success: true });
});

// ─── Reviews ─────────────────────────────────────────────────
// Public: submit review (pending)
app.post("/api/reviews", async (req, res) => {
  const { name, role, quote, rating } = req.body;
  if (!name || !quote)
    return res.status(400).json({ error: "Name and review required" });
  await db.collection("reviews").insertOne({
    name,
    role: role || "",
    quote,
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    status: "pending",
    createdAt: new Date(),
  });
  res.status(201).json({ success: true });
});

// Public: get approved reviews only
app.get("/api/reviews", async (req, res) => {
  const reviews = await db.collection("reviews")
    .find({ status: "approved" })
    .sort({ createdAt: -1 })
    .toArray();
  res.json(reviews);
});

// Admin: get all reviews (including pending)
app.get("/api/admin/reviews", requireAdmin, async (req, res) => {
  const reviews = await db.collection("reviews").find({}).sort({ createdAt: -1 }).toArray();
  res.json(reviews);
});

// Admin: approve review
app.patch("/api/admin/reviews/:id/approve", requireAdmin, async (req, res) => {
  await db.collection("reviews").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { status: "approved" } }
  );
  res.json({ success: true });
});

// Admin: delete review
app.delete("/api/admin/reviews/:id", requireAdmin, async (req, res) => {
  await db.collection("reviews").deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ success: true });
});

// ─── Start ────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
