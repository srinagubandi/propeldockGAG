import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    product: "Propeldock",
    version: "1.0.0",
    promise: "A clearer way to work together.",
    action: "Move work forward.",
    timestamp: new Date().toISOString(),
  });
}
