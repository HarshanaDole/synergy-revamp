import { User } from "../admin/models/user";
import { API_BASE_URL } from "./config";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, { ...init, credentials: "include" });

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();

    let errorMessage: string = "An unexpected error occurred";

    // Ensure errorBody is an object
    if (typeof errorBody === "object" && errorBody !== null) {
      // If errorBody has a single error message as a string
      if (
        Object.keys(errorBody).length === 1 &&
        typeof Object.values(errorBody)[0] === "string"
      ) {
        errorMessage = Object.values(errorBody)[0] as string;
      } else {
        // Handle the case where errorBody has arrays of messages
        const firstKey = Object.keys(errorBody)[0];

        if (firstKey) {
          const errorsArray = errorBody[firstKey];

          // Check if errorsArray is an array and has items
          if (Array.isArray(errorsArray) && errorsArray.length > 0) {
            errorMessage = errorsArray[0]; // Take the first error message
          } else {
            errorMessage = "An unexpected error occurred"; // Fallback message
          }
        }
      }
    }

    console.log("errorBody: ", errorBody);
    console.log("errorMessage: ", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData(`${API_BASE_URL}/api/users`, {
    method: "GET",
  });
  return response.json();
}

export async function getAllUsers(): Promise<User[]> {
  const response = await fetchData(`${API_BASE_URL}/api/users/admins`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
}

export interface SignUpCredentials {
  secret_key: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchData(`${API_BASE_URL}/api/auth/logout`, { method: "POST" });
}

export interface UpdateCredentials {
  username?: string;
  password: string;
  newPassword?: string;
  confirmPassword?: string;
}

export async function updateProfile(
  id: string,
  credentials: UpdateCredentials
): Promise<User> {
  try {
    const response = await fetchData(`${API_BASE_URL}/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An unexpected error occurred");
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating profile:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred");
    }
  }
}

export async function deleteProfile(id: string) {
  await fetchData(`${API_BASE_URL}/api/users/${id}`, {
    method: "DELETE",
  });
}
