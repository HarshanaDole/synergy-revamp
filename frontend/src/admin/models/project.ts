import { Client } from "./client";

export interface Project {
  id: string;
  imageUrl: string;
  type: string;
  client_id: string;
  location: string;
  year: string;
  description?: string;
  created_at: string;
  updated_at: string;
  client: Client;
}
