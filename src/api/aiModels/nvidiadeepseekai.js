export class NvidiaDeepSeekAI {
  #baseUrl;
  #apiKey;
  #model;

  /**
   * Constructor to initialize Nvidia DeepSeek AI.
   * @param {string} model - The AI model to use (default: "deepseek-ai/deepseek-r1").
   * @param {string} baseUrl - The base URL for the Nvidia API.
   */
  constructor(
    model = "deepseek-ai/deepseek-r1",
    baseUrl = "https://integrate.api.nvidia.com/v1"
  ) {
    this.#apiKey = import.meta.env.VITE_NVIDIA_DEEPSEEK_API_KEY;

    if (!this.#apiKey) {
      throw new Error("API key is missing. Set VITE_NVIDIA_DEEPSEEK_API_KEY in environment variables.");
    }

    this.#baseUrl = baseUrl;
    this.#model = model;
  }

  /**
   * Sends a non-streaming chat message to the Nvidia DeepSeek AI.
   * @param {string} content - The user message to send.
   * @param {number} retries - Number of retry attempts in case of failure.
   * @returns {Promise<string>} - The AI's response text.
   */
  async chat(content, retries = 2) {
    if (!content || typeof content !== "string" || content.trim() === "") {
      throw new Error("Invalid content provided. Content must be a non-empty string.");
    }

    const body = {
      model: this.#model,
      messages: [{ role: "user", content }],
    };

    while (retries >= 0) {
      try {
        const response = await fetch(`${this.#baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.#apiKey}`,
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            `API Error: ${response.status} - ${response.statusText}. ${
              errorData?.message || "No additional details available."
            }`
          );
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "No response received.";
      } catch (error) {
        console.error("Error in NvidiaDeepSeekAI chat:", error);

        if (retries === 0) {
          throw new Error("Failed to send message to Nvidia DeepSeek AI after multiple attempts.");
        }

        console.warn(`Retrying chat request... Attempts left: ${retries}`);
        retries--;
      }
    }
  }

  /**
   * Sends a streaming chat message to the Nvidia DeepSeek AI.
   * @param {string} content - The user message to send.
   * @returns {AsyncGenerator<string>} - A generator yielding chunks of response text.
   */
  async *chatStream(content) {
    if (!content || typeof content !== "string" || content.trim() === "") {
      throw new Error("Invalid content provided. Content must be a non-empty string.");
    }

    const body = {
      model: this.#model,
      messages: [{ role: "user", content }],
      stream: true, // Enables streaming
    };

    try {
      const response = await fetch(`${this.#baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.#apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `API Error: ${response.status} - ${response.statusText}. ${
            errorData?.message || "No additional details available."
          }`
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        yield decoder.decode(value);
      }
    } catch (error) {
      console.error("Error in NvidiaDeepSeekAI chatStream:", error);
      throw new Error("Failed to stream response from Nvidia DeepSeek AI. Please try again.");
    }
  }
}
