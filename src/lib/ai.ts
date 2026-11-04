import OpenAI from "openai";

const apiKey = process.env.OPENROUTER_API_KEY || "";

export const openRouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: apiKey,
  defaultHeaders: {
    "HTTP-Referer": process.env.APP_URL || "https://propeldockgag-production.up.railway.app",
    "X-Title": "Propeldock Platform",
  },
});

/**
 * High-tier open-weight models only:
 * - GENERAL_MODEL: DeepSeek-V3 (deepseek/deepseek-chat) for operations, drafts, and speed
 * - REASONING_MODEL: Meta Llama 3.3 70B (meta-llama/llama-3.3-70b-instruct) for triage, synthesis, and reporting
 */
export const OPEN_WEIGHT_MODELS = {
  GENERAL: "deepseek/deepseek-chat",
  SYNTHESIS: "meta-llama/llama-3.3-70b-instruct",
} as const;

export async function generateCompletion({
  prompt,
  systemPrompt = "You are Propeldock AI, a precise, helpful enterprise platform assistant.",
  model = OPEN_WEIGHT_MODELS.GENERAL,
  temperature = 0.3,
}: {
  prompt: string;
  systemPrompt?: string;
  model?: string;
  temperature?: number;
}) {
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured.");
  }

  const response = await openRouter.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    temperature,
  });

  return {
    content: response.choices[0]?.message?.content || "",
    model: response.model || model,
  };
}
