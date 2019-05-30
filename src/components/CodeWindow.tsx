import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

const useStyles = makeStyles((theme: Theme) => {
  return {
    selectedLine: {
      backgroundColor: "yellow"
    }
  };
});

export const CodeWindow: React.FC<{
  code: string;
  focusLine: number;
}> = props => {
  const FONT_SIZE = 16;
  const LINE_HEIGHT = 1.2; // should be standard

  const classes = useStyles();
  const codeView = useRef(null as HTMLDivElement | null);

  useEffect(() => {
    const elem = codeView.current;
    if (!elem) {
      return;
    }
    elem.scrollTo(
      0,
      Math.max(0, (props.focusLine - 5) * FONT_SIZE * LINE_HEIGHT)
    );
  }, [props.code, props.focusLine]);

  return (
    <div
      ref={codeView}
      style={{
        overflow: "auto",
        position: "relative",
        maxHeight: "80vh",
        lineHeight: LINE_HEIGHT,
        fontSize: FONT_SIZE
      }}
    >
      <SyntaxHighlighter
        showLineNumbers
        customStyle={{
          margin: 0
        }}
        lineProps={(
          lineNumber: number
        ): React.HTMLAttributes<HTMLSpanElement> => {
          return lineNumber - 1 === props.focusLine
            ? { className: classes.selectedLine }
            : {};
        }}
        wrapLines={true}
        lineNumberStyle={(lineNumber: number): any => {
          return lineNumber - 1 === props.focusLine
            ? { fontWeight: "bold" }
            : {};
        }}
      >
        {props.code}
      </SyntaxHighlighter>
    </div>
  );
};
