export interface Repository {
  id: number;
  title?: string;
  stars: number;
}

export interface RepositoryHttp {
  id: number;
  full_name: string;
  description: string;
  forks: number;
  updated_at: Date;
  stargazers_count: number;
  owner?: Owner;
  topics: string[];
}

export interface Owner {
  id: number;
  avatar_url: string;
  login: string;
}

export type RepositoryV2 = RepositoryHttp & { isBookmark: boolean };
