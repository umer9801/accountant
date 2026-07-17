import { MongoClient } from "mongodb";

let clientPromise;

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not set");

  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  const client = await clientPromise;
  return client.db("properaccounting");
}
