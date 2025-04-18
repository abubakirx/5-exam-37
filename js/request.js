export async function login(user) {
  try {
    const req = await fetch("https://json-api.uz/api/project/fn37/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const res = await req.json();

    if (req.status === 200) {
      return res;
    } else {
      throw new Error(res.message || "Login failed: Invalid credentials");
    }
  } catch (err) {
    throw err;
  }
}

export async function register(user) {
  try {
    console.log("Sending register request:", user);
    const req = await fetch(
      "https://json-api.uz/api/project/fn37/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const res = await req.json();

    if (req.status === 200) {
      return res;
    } else {
      throw new Error(
        res.message || "Registration failed: User already exists"
      );
    }
  } catch (err) {
    throw err;
  }
}
