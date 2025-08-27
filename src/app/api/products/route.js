import { connect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await connect();
  const products = await db.collection("products").find().toArray();
  return NextResponse.json(products);
}
