"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 mx-auto">
      <h1 className="text-2xl">Diff formatter</h1>
      <GitDiffFormatter />
    </main>
  );
}

const styles = {
  added: { color: "green", backgroundColor: "#e6ffe6", padding: "2px 4px" },
  removed: { color: "red", backgroundColor: "#ffe6e6", padding: "2px 4px" },
  unchanged: { color: "black", padding: "2px 4px" },
  diffContainer: { whiteSpace: "pre-wrap", fontFamily: "monospace" },
};

// Component to format and display git diff
const GitDiffFormatter: React.FC = () => {
  const [diffText, setDiffText] = useState<string>("");

  // Function to handle change in the text area
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDiffText(event.target.value);
  };

  // Function to render the diff with basic styling
  const renderDiff = (diff: string) => {
    // Split the diff into lines
    const delimiter = "###DELIM###";
    const escapedLineBreakPattern = /(?<!\\)\\n/g; // Matches '\n' not preceded by a backslash
    const modifiedText = diffText.replace(escapedLineBreakPattern, delimiter);
    const lines = modifiedText.split(delimiter);

    return lines.map((line, index) => {
      if (line.startsWith("diff")) return <div key={index}>{line}</div>;
      if (line.startsWith("---") || line.startsWith("+++"))
        return <div key={index}>{line}</div>;
      if (line.startsWith("@@")) return <div key={index}>{line}</div>;
      if (line.startsWith("+"))
        return (
          <div key={index} style={styles.added}>
            {line}
          </div>
        );
      if (line.startsWith("-"))
        return (
          <div key={index} style={styles.removed}>
            {line}
          </div>
        );
      return (
        <div key={index} style={styles.unchanged}>
          {line}
        </div>
      );
    });
  };

  return (
    <>
      <Textarea
        value={diffText}
        onChange={handleChange}
        placeholder="Paste your git diff here"
        autoSize
      />
      <div style={styles.diffContainer}>{renderDiff(diffText)}</div>
    </>
  );
};
