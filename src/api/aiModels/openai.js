import OpenAI from "openai";

export class OpenAIModel {
  #model;
  #openai;

  constructor(apiKey, model = "gpt-4o-mini") {
    if (!apiKey) throw new Error("OpenAI API key is required.");
    this.#model = model;
    this.#openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  }

  async chat(content, history = []) {
    if (!content) throw new Error("Invalid message content.");
    const result = await this.#openai.chat.completions.create({
      model: this.#model,
      messages: [...history, { content, role: "user" }],
    });
    return result.choices?.[0]?.message?.content || "No response received.";
  }
}
