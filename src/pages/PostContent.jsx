import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MediaUpload from "../components/MediaUpload";

const PostContent = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [postText, setPostText] = useState("");

  // Handle post submission
  const handlePostSubmit = (newPost) => {
    console.log("Post submitted successfully:", newPost);
    // Example: Add logic to update the state or timeline with the new post
    alert("Post created successfully!");
    navigate("/"); // Redirect to homepage or timeline
  };

  const handlePost = () => {
    if (!postText && uploadedFiles.length === 0) {
      alert("Please add content to your post.");
      return;
    }

    // Create the post object
    const newPost = {
      text: postText,
      media: uploadedFiles.map((file) => file.preview),
      createdAt: new Date(),
    };

    console.log("Posted:", newPost);

    // Redirect to timeline/homepage
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="mb-4">Create a Post</h2>
        <textarea
          className="form-control mb-3"
          placeholder="Share your thoughts..."
          rows="3"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        ></textarea>
        <MediaUpload
          onPostSubmit={handlePostSubmit} // Pass the function to handle the post
        />
        <div className="uploaded-media mt-3">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="mb-3">
              {file.type.startsWith("image") ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  style={{ maxWidth: "100%" }}
                />
              ) : (
                <video
                  controls
                  src={file.preview}
                  style={{ maxWidth: "100%" }}
                ></video>
              )}
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
