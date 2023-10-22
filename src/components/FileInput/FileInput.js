import React from "react";

const FileInput = ({ handleFileChange }) => {
  return (
    <div className="file-input-container">
      <label htmlFor="fileInput" style={{
        cursor: "pointer",
        color: "#2086ea",
        fontWeight: 500,
      }}>
        Select File
      </label>
      <input type="file" id="fileInput" onChange={handleFileChange} />
    </div>
  );
};

export default FileInput;
