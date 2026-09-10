import { signToken, cors } from "../_auth.js";

export default function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = signToken({ role: "admin", username });
    return res.status(200).json({ token });
  }
  return res.status(401).json({ error: "Invalid credentials" });
}
