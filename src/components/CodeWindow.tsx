import React, { useRef, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { Theme, makeStyles } from "@material-ui/core/styles";

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

  return (
    <MonacoEditor
      ref={monaco}
      height="80vh"
      language="typescript"
      options={{
        readOnly: true,
        minimap: { enabled: false }
      }}
    />
  );
};
