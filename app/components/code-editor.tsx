'use client';

import { Editor } from "@monaco-editor/react";

export default function CodeEditor() {
  return (
    <div className="flex-1">
      <Editor
        height="100%"
        defaultLanguage="python"
        defaultValue="print('Hello, world!')"
        theme="vs-dark"
        width="100%"
      />
    </div>
  );
}