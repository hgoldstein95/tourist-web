import React, { useRef, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { Theme, makeStyles } from "@material-ui/core/styles";

const LANG_MAP = {
  apex: "apex",
  azcli: "azcli",
  bat: "bat",
  clj: "clojure",
  cljs: "clojure",
  coffee: "coffee",
  cpp: "cpp",
  cs: "csharp",
  cshtml: "razor",
  csp: "csp",
  css: "css",
  dockerfile: "dockerfile",
  fs: "fsharp",
  fsi: "fsharp",
  go: "go",
  graphql: "graphql",
  h: "cpp",
  handlebars: "handlebars",
  html: "html",
  ini: "ini",
  java: "java",
  js: "javascript",
  jsx: "javascript",
  kt: "kotlin",
  less: "less",
  lua: "lua",
  m: "objective-c",
  md: "markdown",
  mm: "objective-c",
  msdax: "msdax",
  mysql: "mysql",
  pas: "pascal",
  pgsql: "pgsql",
  php: "php",
  pl: "perl",
  pm: "perl",
  postiats: "postiats",
  powerquery: "powerquery",
  pp: "pascal",
  ps1: "powershell",
  pug: "pug",
  py: "python",
  r: "r",
  rb: "ruby",
  redis: "redis",
  redshift: "redshift",
  rs: "rust",
  sb: "sb",
  scheme: "scheme",
  scss: "scss",
  sh: "shell",
  solidity: "solidity",
  sql: "sql",
  st: "st",
  swift: "swift",
  tcl: "tcl",
  ts: "typescript",
  tsx: "typescript",
  vb: "vb",
  xml: "xml",
  yaml: "yaml"
};

function guessLanguage(ext: string): string {
  return (LANG_MAP as any)[ext] || "text";
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    focusLine: {
      borderTop: "1px solid black",
      borderBottom: "1px solid black"
    },
    focusLineDeco: {
      width: "5px !important",
      marginLeft: 3,
      backgroundColor: theme.palette.primary.main
    }
  };
});

export const CodeWindow: React.FC<{
  code: string;
  focusLine: number;
  fileName: string;
}> = props => {
  const classes = useStyles();
  const monaco = useRef(null as MonacoEditor | null);

  useEffect(() => {
    if (!monaco.current) return;
    const editor = monaco.current.editor;
    if (!editor) return;
    const model = editor.getModel();
    if (!model) return;
    model.setValue(props.code);
    editor.revealLineInCenter(props.focusLine);
    editor.deltaDecorations(
      [],
      [
        {
          range: {
            startLineNumber: props.focusLine,
            startColumn: 0,
            endLineNumber: props.focusLine,
            endColumn: 0
          },
          options: {
            isWholeLine: true,
            className: classes.focusLine,
            linesDecorationsClassName: classes.focusLineDeco
          }
        }
      ]
    );
  }, [monaco, props, classes]);

  const pathParts = props.fileName.split(/\./g);
  const lang =
    pathParts.length < 2 ? "" : guessLanguage(pathParts[pathParts.length - 1]);

  return (
    <MonacoEditor
      ref={monaco}
      height="80vh"
      language={lang}
      options={{
        readOnly: true,
        minimap: { enabled: false }
      }}
    />
  );
};
