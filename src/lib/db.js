// Simple MongoDB helper for the whole app.
// We read the connection string from .env.local (DB_ADDRESS)
// and return the "app" database. We keep a single shared client
// so Next.js doesn't open a new connection on every request.

import { MongoClient } from 'mongodb';

const uri = process.env.DB_ADDRESS;   // your Atlas URI from .env.local
let client; let clientPromise;

// Keep one global connection between hot reloads in dev
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

// Use the "app" database name (matches what you created in Atlas)
export async function db(){
  const c = await clientPromise;
  return c.db('app');
}