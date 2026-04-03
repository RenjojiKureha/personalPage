export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  readingTime: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  github?: string;
  demo?: string;
  cover?: string;
  featured: boolean;
  content: string;
}

export interface NavItem {
  label: string;
  href: string;
}
