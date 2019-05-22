import { Tour, Index } from "./model";

export interface UploadTourPage {
  kind: "UploadTour";
}

export interface CreateIndexPage {
  kind: "CreateIndex";
  tour: Tour;
}

export interface ViewTourPage {
  kind: "ViewTour";
  tour: Tour;
  index: Index;
}

export type Page = UploadTourPage | CreateIndexPage | ViewTourPage;
