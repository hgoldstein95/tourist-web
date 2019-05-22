export interface WebRepository {
  provider: "github" | "gitlab";
  name: string;
}

export interface Index {
  [key: string]: WebRepository;
}

export type Commit = string;
export type Repository = string;

export interface Tour {
  repositories: Map<Repository, Commit>;
  stops: Stop[];
  title: string;
  description: string;
}

export interface Stop {
  body: string;
  line: number;
  relPath: string;
  repository: string;
  title: string;
}
