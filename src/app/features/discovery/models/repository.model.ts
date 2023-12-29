export interface RepositoryHttp {
  id: number;
  full_name: string;
  description: string;
  forks: number;
  updated_at: Date;
  stargazers_count: number;
  watchers_count: number;
  html_url: string;
  owner?: Owner;
  topics: string[];
}

export interface Owner {
  id: number;
  avatar_url: string;
  login: string;
  html_url: string;
}

export type Repository = RepositoryHttp & { isBookmark: boolean };
