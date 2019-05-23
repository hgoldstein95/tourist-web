export interface WebRepository {
  provider: "github" | "gitlab";
  name: string;
}

export type Index = Map<Repository, WebRepository>;

export type Commit = string;
export type Repository = string;

export interface Tour {
  repositories: Map<Repository, Commit>;
  stops: Stop[];
  title: string;
  description: string;
}

export function isTour(tour: any): tour is Tour {
  return (
    tour.repositories instanceof Map &&
    typeof tour.title === "string" &&
    typeof tour.description === "string" &&
    Array.isArray(tour.stops) &&
    tour.stops.every((stop: any) => isStop(stop))
  );
}

export interface Stop {
  body: string;
  line: number;
  relPath: string;
  repository: string;
  title: string;
}

export function isStop(stop: any): stop is Stop {
  return (
    typeof stop.body === "string" &&
    typeof stop.line === "number" &&
    typeof stop.relPath === "string" &&
    typeof stop.repository === "string" &&
    typeof stop.title === "string"
  );
}
