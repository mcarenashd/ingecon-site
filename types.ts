export interface NavLink {
  href: string;
  label: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  client?: string;
  year?: number;
  location?: string;
  constructionValue?: number;
  supervisionValue?: number;
}

export interface Client {
  name: string;
  logo: string;
}
