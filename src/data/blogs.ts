export interface Blog {
  title: string;
  description: string;
  date: string;
  readTime?: string;
  link: string;
  tags?: string[];
  image?: string;
}

export const Blogs: Blog[] = [];
