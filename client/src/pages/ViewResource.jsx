import React, { useState } from "react";
import axios from "axios";
import { Document, Page } from "react-pdf";

const FileViewer = () => {
  const [fileType, setFileType] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileId, setFileId] = useState("");

  const handleFetchFile = async () => {
    try {
      if (!fileId) {
        alert("Please provide a valid file ID.");
        return;
      }

      const response = await axios.get(`http://localhost:5000/requestfile`, {
        params: { id: fileId },
        responseType: "blob", // Important to handle binary data
      });

      const contentType = response.headers["content-type"];
      setFileType(contentType);

      // Convert blob to URL
      const url = URL.createObjectURL(response.data);
      setFileUrl(url);
    } catch (error) {
      console.error("Error fetching file:", error);
      alert("Could not fetch the file. Please check the console for details.");
    }
  };

  const renderFile = () => {
    if (fileType.startsWith("video/")) {
      return (
        <video controls width="600">
          <source src={fileUrl} type={fileType} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (fileType.startsWith("image/")) {
      return <img src={fileUrl} alt="File Thumbnail" width="600" />;
    } else if (fileType === "application/pdf") {
      return (
        <Document file={fileUrl}>
          <Page pageNumber={1} />
        </Document>
      );
    } else {
      return <p>Unsupported file type: {fileType}</p>;
    }
  };

  return (
    <div>
      <h1>File Viewer</h1>
      <input
        type="text"
        placeholder="Enter file ID"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
      />
      <button onClick={handleFetchFile}>Fetch File</button>
      <div>{fileUrl && renderFile()}</div>
    </div>
  );
};

export default FileViewer;
