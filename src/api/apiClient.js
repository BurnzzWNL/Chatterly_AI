/**
 * Generic API client to handle requests with authentication and error handling.
 * @param {string} endpoint - The API endpoint to call.
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE).
 * @param {Object} [body=null] - Request body for POST/PUT.
 * @param {Object} [headers={}] - Additional headers.
 * @param {boolean} [authRequired=true] - Whether authentication is needed.
 * @returns {Promise<Object>} - Parsed response JSON or error.
 */
export async function apiRequest(endpoint, method = "GET", body = null, headers = {}, authRequired = true) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API base URL is missing. Set VITE_API_BASE_URL in environment variables.");
  }

  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  };

  // Inject API Key if required
  if (authRequired) {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing. Set VITE_API_KEY in environment variables.");
    }
    requestOptions.headers.Authorization = `Bearer ${apiKey}`;
  }

  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, requestOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `API Error: ${response.status} - ${response.statusText}. ${errorData?.message || "No additional details"}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error in API request:", { endpoint, method, error: error.message });
    throw error;
  }
}
