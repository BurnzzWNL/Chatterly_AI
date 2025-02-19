import { GoogleAI } from "./googleai";
import { MistralAI } from "./mistralai";
import { NvidiaDeepSeekAI } from "./nvidiadeepseekai";
import { OpenAIModel } from "./openai";  // ✅ Updated import

const SUPPORTED_MODELS = ["googleai", "mistralai", "nvidiadeepseekai", "openai"];

export function getModel(modelName) {
  if (!modelName || typeof modelName !== "string") {
    throw new Error("❌ ModelFactory Error: Model name must be a valid non-empty string.");
  }

  const normalizedModel = modelName.toLowerCase();
  let apiKey;

  switch (normalizedModel) {
    case "googleai":
      apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
      if (!apiKey) throw new Error("❌ Missing Google AI API key.");
      return new GoogleAI(apiKey);

    case "mistralai":
      apiKey = import.meta.env.VITE_MISTRAL_AI_API_KEY;
      if (!apiKey) throw new Error("❌ Missing Mistral AI API key.");
      return new MistralAI(apiKey);

    case "nvidiadeepseekai":
      apiKey = import.meta.env.VITE_NVIDIA_DEEPSEEK_API_KEY;
      if (!apiKey) throw new Error("❌ Missing Nvidia DeepSeek AI API key.");
      return new NvidiaDeepSeekAI(apiKey);

    case "openai":
      apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) throw new Error("❌ Missing OpenAI API key.");
      return new OpenAIModel(apiKey);  // ✅ Updated class reference

    default:
      throw new Error(`❌ Unknown model: "${modelName}". Supported models: ${SUPPORTED_MODELS.join(", ")}.`);
  }
}
