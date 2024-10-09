import { Project } from "../admin/models/project";
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

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/api/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  const data: Project[] = await response.json();

  // Type assertion to ensure data is an array of projects
  return data.map((project) => ({
    ...project,
    client: {
      ...project.client,
      // Ensure client object contains the necessary properties
      name: project.client?.name || "Unknown Client", // Default if name is missing
    },
  }));
}

export async function fetchProject(projectId?: string): Promise<Project> {
  const response = await fetchData(
    `${API_BASE_URL}/api/projects/` + projectId,
    {
      method: "GET",
    }
  );
  return response.json();
}

export interface ProjectInput {
  imageUrl?: string;
  type: string;
  client_id: string;
  location: string;
  year: string;
  description?: string;
}

export async function createProject(project: FormData): Promise<Project> {
  const response = await fetchData(`${API_BASE_URL}/api/projects`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: project,
  });
  return response.json();
}

export async function updateProject(
  projectId: string,
  project: FormData
): Promise<Project> {
  const response = await fetchData(
    `${API_BASE_URL}/api/projects/` + projectId,
    {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: project,
    }
  );
  return response.json();
}

export async function deleteProject(projectId: string) {
  await fetchData(`${API_BASE_URL}/api/projects/` + projectId, {
    method: "DELETE",
  });
}
