export interface Blog {
  id: string;
  headline: string;
  author: string;
  imageUrl: string;
  created_at: string;
  updated_at: string;
  subheadings: {
    subheading: string;
    content: string;
  }[];
}
