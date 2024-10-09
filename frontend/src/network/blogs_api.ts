import { Blog } from "../admin/models/blog";
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

export async function fetchBlogs(): Promise<Blog[]> {
  const response = await fetch(`${API_BASE_URL}/api/blogs`);
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
}

export async function fetchBlog(blogId?: string): Promise<Blog> {
  const response = await fetchData(`${API_BASE_URL}/api/blogs/` + blogId, {
    method: "GET",
  });
  return response.json();
}

export interface BlogInput {
  imageUrl?: string;
  headline: string;
  author: string;
  subheadings: {
    subheading: string;
    content: string;
  }[];
}

export async function createBlog(blog: FormData): Promise<Blog> {
  const response = await fetchData(`${API_BASE_URL}/api/blogs`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: blog,
  });
  return response.json();
}

export async function updateBlog(
  blogId: string,
  blog: FormData
): Promise<Blog> {
  const response = await fetchData(`${API_BASE_URL}/api/blogs/` + blogId, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: blog,
  });
  return response.json();
}

export async function deleteBlog(blogId: string) {
  await fetchData(`${API_BASE_URL}/api/blogs/` + blogId, {
    method: "DELETE",
  });
}
