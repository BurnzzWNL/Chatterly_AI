import { GoogleGenerativeAI } from "@google/generative-ai";

export class GoogleAI {
  #chat;
  #model;

  constructor(apiKey, model = "gemini-2.0-flash-exp") {
    if (!apiKey) throw new Error("Google AI API key is required.");
    this.#model = model;
    this.initializeAI(apiKey);
  }

  initializeAI(apiKey) {
    try {
      const googleai = new GoogleGenerativeAI(apiKey);
      const gemini = googleai.getGenerativeModel({ model: this.#model });
      this.#chat = gemini.startChat({ history: [] });
    } catch (error) {
      console.error("Error initializing Google AI:", error);
      throw new Error("Failed to initialize Google AI model.");
    }
  }

  async chat(content) {
    if (!content) throw new Error("Invalid message content.");
    const result = await this.#chat.sendMessage(content);
    return result.response.text();
  }
}
