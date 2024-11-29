import React, { useState, useEffect } from "react";

const ViewResource = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [resourceUrl, setResourceUrl] = useState("");
  useEffect(() => {
    // Set the URL of the video and thumbnail file dynamically
    const videoFileId = "6749ffc46ee760c4214bffb2"; // Replace with the actual ObjectId for the video
    const thumbnailFileId = "674a07d2e63c9fee61295d23"; // Replace with the actual ObjectId for the thumbnail
    const resourceFileId = "674a07d2e63c9fee61295d25"; // Replace with the actual ObjectId for the thumbnail
    const videoPath = `http://localhost:5000/api/course/media/${videoFileId}`;
    const thumbnailPath = `http://localhost:5000/api/course/media/${thumbnailFileId}`;
    const resourceUrl = `http://localhost:5000/api/course/media/${resourceFileId}`;

    setVideoUrl(videoPath);
    setThumbnailUrl(thumbnailPath);
    setResourceUrl(resourceUrl);
  }, []);

  return (
    <div>
      <h1>Video Resource Viewer</h1>
      <video controls width="640" poster={thumbnailUrl}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <iframe
          src={resourceUrl}
          width="640"
          height="480"
          title="PDF Viewer"
          style={{ border: "1px solid #ccc" }}
        >
          Your browser does not support the iframe element.
        </iframe>
    </div>
  );
};

export default ViewResource;
