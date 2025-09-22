export interface User {
  id: string
  email: string
  name: string
  token?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

// Call Next.js API route for login
export async function loginUser(credentials: LoginCredentials): Promise<User | null> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Login failed")
    }

    if (data.success && data.user) {
      return {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        token: data.token,
      }
    }

    return null
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

// Call Next.js API route for registration
export async function registerUser(credentials: RegisterCredentials): Promise<User | null> {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Registration failed")
    }

    if (data.success && data.user) {
      return {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        token: data.token,
      }
    }

    return null
  } catch (error) {
    console.error("Registration error:", error)
    throw error
  }
}

// Call Next.js API route to get current user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include", // Include cookies
    })

    if (!response.ok) {
      return null
    }

    const user = await response.json()
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

// Call Next.js API route for logout
export async function logoutUser(): Promise<void> {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })
  } catch (error) {
    console.error("Logout error:", error)
  }
}
