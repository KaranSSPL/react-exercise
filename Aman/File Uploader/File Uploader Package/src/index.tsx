import React from 'react';

import { default as FilesSave } from "./components/FilesSave";

const App = () => {
  const callBackFunction = (files: { type: string; data: string | ArrayBuffer | null | undefined; fileName: string; }[]) => {
    console.log("Files uploaded:", files);
  }
  return (
    <FilesSave onFileUpload={callBackFunction} />
  )
}

export default App
