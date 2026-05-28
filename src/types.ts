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
  /** Visual scale multiplier for logos with internal whitespace padding. Default 1. */
  scale?: number;
}
