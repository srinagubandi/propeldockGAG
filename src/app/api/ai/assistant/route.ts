import { NextResponse } from "next/server";
import { generateCompletion, OPEN_WEIGHT_MODELS } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { prompt, model = OPEN_WEIGHT_MODELS.GENERAL } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Field 'prompt' is required." }, { status: 400 });
    }

    const result = await generateCompletion({
      prompt,
      model,
      systemPrompt:
        "You are the Propeldock Enterprise AI Copilot. You assist agencies and clients with changelog updates, bug triaging, checklist drafting, and executive reports. Be concise, structured, professional, and action-oriented.",
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("OpenRouter AI Assistant error:", err);
    return NextResponse.json(
      { error: err.message || "An error occurred with OpenRouter open-weight generation." },
      { status: 500 }
    );
  }
}
