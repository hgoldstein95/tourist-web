import React, { useState } from "react";
import { UploadTourPage, Page } from "../pageTypes";
import { Typography, Grid, Button } from "@material-ui/core";
import { ErrorSnackbar } from "../components/ErrorSnackbar";
import { parseTour, writeTour } from "../model";
import yauzl from "yauzl";

async function readFileAsText(f: File): Promise<string> {
  const fr = new FileReader();
  return new Promise((resolve, _reject) => {
    fr.readAsText(f);
    fr.onload = loaded => {
      const text = (loaded.target as any).result;
      resolve(text);
    };
  });
}

async function readFileAsBuffer(f: File): Promise<ArrayBuffer> {
  const fr = new FileReader();
  return new Promise((resolve, _reject) => {
    fr.readAsArrayBuffer(f);
    fr.onload = loaded => {
      const text = (loaded.target as any).result;
      resolve(text);
    };
  });
}

async function readStreamToString(stream: any): Promise<string> {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

async function unzipContents(b: Buffer): Promise<Map<string, string>> {
  let entries = new Map<string, string>();
  return new Promise((resolve, reject) => {
    yauzl.fromBuffer(b, { lazyEntries: true }, (err, zipFile) => {
      if (err || !zipFile) {
        reject(err || new Error("Zip file is null"));
        return;
      }
      zipFile.readEntry();
      zipFile.on("entry", (entry: yauzl.Entry) => {
        if (!/\/$/.test(entry.fileName)) {
          // Normal file
          zipFile.openReadStream(entry, (err, readStream) => {
            if (err || !readStream) {
              return reject(err || new Error("Read stream is null."));
            }
            readStreamToString(readStream).then(val => {
              entries.set(entry.fileName, val);
              zipFile.readEntry();
            });
          });
        } else {
          zipFile.readEntry();
        }
      });
      zipFile.on("end", () => {
        zipFile.close();
        resolve(entries);
      });
    });
  });
}

export const UploadTour: React.FC<{
  page: UploadTourPage;
  route: (s: Page) => void;
}> = props => {
  const [error, setError] = useState(null as string | null);

  async function uploadTour(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];

    if (file.name.endsWith(".tour.pkg")) {
      const buffer = await readFileAsBuffer(file);
      const entries = await unzipContents(Buffer.from(buffer));
      const json = entries.get("tour.tour");
      if (!json) {
        setError("No file called 'tour.tour' in package.");
        return;
      }
      entries.delete("tour.tour");
      const tour = parseTour(json);
      if (typeof tour === "string") {
        setError(tour);
        return;
      }
      // We don't save to local storage here because the data could potentially
      // be large
      props.route({
        kind: "ViewTour",
        tour,
        context: { kind: "LocalPackage", content: entries }
      });
    } else if (file.name.endsWith(".tour")) {
      const json = await readFileAsText(file);
      const tour = parseTour(json);
      if (typeof tour === "string") {
        setError(tour);
        return;
      }
      localStorage.setItem("savedTour", writeTour(tour));
      props.route({
        kind: "CreateIndex",
        tour
      });
    } else {
      setError("Please upload a file with extension '.tour' or '.tour.pkg'.");
    }
  }

  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ marginTop: "10%" }}
      >
        <Grid item xs={7} style={{ textAlign: "center" }}>
          <Typography variant="h3" style={{ marginBottom: 20 }}>
            Welcome to Tourist!
          </Typography>
          <p>
            Tourist is a new approach to documentation that allows programmers
            to explain low-level technical details of a system while
            simultaneously providing the context of how those details fit into
            the broader architecture. It lets programmers document code in the
            same way that they would explain it in person: by walking the
            consumer step-by-step through the important parts of a codebase.
          </p>
          <Button
            style={{ marginTop: 80 }}
            color="primary"
            variant="outlined"
            component="label"
          >
            Upload a Tour
            <input
              type="file"
              style={{ display: "none" }}
              onInput={uploadTour}
            />
          </Button>
        </Grid>
      </Grid>
      <ErrorSnackbar
        show={error !== null}
        hideError={() => setError(null)}
        message={error || undefined}
      />
    </div>
  );
};
