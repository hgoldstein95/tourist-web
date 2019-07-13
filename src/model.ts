export type WebRepository =
  | {
      provider: "github";
      name: string;
    }
  | {
      provider: "gitlab";
      name: string;
      project: number;
    };

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

export function parseTour(json: string): Tour | string {
  let obj: any;
  try {
    obj = JSON.parse(json);
  } catch (_) {
    return "Failed to parse file as JSON.";
  }
  try {
    if (typeof obj.repositories != "object") throw new Error();
    obj.repositories = new Map(
      (obj.repositories as any[]).map((repo: any) => [
        repo.repository,
        repo.commit
      ])
    );
    if (!isTour(obj)) throw new Error();
  } catch (_) {
    return "Could not parse file as tour.";
  }
  return obj;
}

export function writeTour(tour: Tour): string {
  const repos = {} as any;
  Array.from(tour.repositories.entries()).forEach(([k, v]) => {
    repos[k] = v;
  });
  return JSON.stringify({
    ...tour,
    repositories: repos
  });
}

export function parseIndex(json: string): Index | string {
  let obj: any;
  try {
    obj = JSON.parse(json);
  } catch (_) {
    return "Failed to parse file as JSON.";
  }
  const err = "Could not parse object as index.";
  if (typeof obj != "object") {
    return err;
  }
  return new Map(Object.entries(obj));
}

export function writeIndex(index: Index): string {
  const obj = {} as any;
  Array.from(index.entries()).forEach(([k, v]) => {
    obj[k] = v;
  });
  return JSON.stringify(obj);
}
