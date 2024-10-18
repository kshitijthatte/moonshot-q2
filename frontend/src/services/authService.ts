export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
