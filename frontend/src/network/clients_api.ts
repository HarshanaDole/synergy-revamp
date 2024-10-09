import { Client } from "../admin/models/client";
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

export async function fetchClients(): Promise<Client[]> {
  const response = await fetchData(`${API_BASE_URL}/api/clients`, {
    method: "GET",
  });
  return response.json();
}

export async function fetchClient(clientId?: string): Promise<Client> {
  const response = await fetchData(`${API_BASE_URL}/api/clients/` + clientId, {
    method: "GET",
  });
  return response.json();
}

export interface ClientInput {
  name: string;
  imageUrl?: string;
}

export async function createClient(client: FormData): Promise<Client> {
  const response = await fetchData(`${API_BASE_URL}/api/clients`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: client,
  });
  return response.json();
}

export async function updateClient(
  clientId: string,
  client: FormData
): Promise<Client> {
  const response = await fetchData(`${API_BASE_URL}/api/clients/` + clientId, {
    method: "POST",
    credentials: "include",
    body: client,
  });
  return response.json();
}

export async function deleteClient(clientId: string) {
  await fetchData(`${API_BASE_URL}/api/clients/` + clientId, {
    method: "DELETE",
  });
}
