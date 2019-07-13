import { Tour, Index } from "./model";

export interface UploadTourPage {
  kind: "UploadTour";
}

export interface CreateIndexPage {
  kind: "CreateIndex";
  tour: Tour;
}

export type Context =
  | { kind: "LocalPackage"; content: Map<string, string> }
  | { kind: "ResolveWithIndex"; index: Index };

export interface ViewTourPage {
  kind: "ViewTour";
  tour: Tour;
  context: Context;
}

export type Page = UploadTourPage | CreateIndexPage | ViewTourPage;

export function parseContext(s: string): Context | string {
  return "Failed";
}
