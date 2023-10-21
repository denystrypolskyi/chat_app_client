import React from "react";

const FileInput = ({ onChange }) => {
  return (
    <div className="file-input-container">
      <label htmlFor="fileInput" className="custom-file-input">
        Choose Profile Picture
      </label>
      <input type="file" id="fileInput" onChange={() => onChange()} />
    </div>
  );
};

export default FileInput;
