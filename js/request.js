// request.js
export async function login(data) {
    try {
      const res = await fetch("https://json-api.uz/api/project/fn37/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_API_TOKEN", // Tokenni qo‘shing
        },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Login failed with status: ${res.status}`
        );
      }
  
      const result = await res.json();
      if (!result || typeof result !== "object") {
        throw new Error("Invalid response from server");
      }
      return result;
    } catch (err) {
      throw new Error(err.message || "Network error occurred");
    }
  }