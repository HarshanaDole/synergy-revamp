import { Contact } from "../admin/models/contact";
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

export async function fetchContacts(): Promise<Contact[]> {
  const response = await fetchData(`${API_BASE_URL}/api/contacts`, {
    method: "GET",
  });
  return response.json();
}

export async function fetchContact(contactId?: string): Promise<Contact> {
  const response = await fetchData(
    `${API_BASE_URL}/api/contacts/` + contactId,
    {
      method: "GET",
    }
  );
  return response.json();
}

export interface ContactInput {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export async function createContact(contact: ContactInput): Promise<Contact> {
  const response = await fetchData(`${API_BASE_URL}/api/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  return response.json();
}

export async function deleteContact(contactId: number) {
  await fetchData(`${API_BASE_URL}/api/contacts/` + contactId, {
    method: "DELETE",
  });
}
