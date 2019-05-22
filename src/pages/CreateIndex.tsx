import React from "react";
import { CreateIndexPage, Page } from "../pageTypes";

export const CreateIndex: React.FC<{
  page: CreateIndexPage;
  route: (s: Page) => void;
}> = props => {
  return (
    <div>
      <h1>Create Index</h1>
      {props.page.tour.title}
      <br />
      <button
      /* TODO: Route
        onClick={() =>
          props.route({
            kind: "ViewTour",
            tour: { title: "My First Tour" },
            index: { key: "value" }
          })
        }
        */
      >
        Advance
      </button>
    </div>
  );
};
