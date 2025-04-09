import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const MediaUpload = ({ onPostSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [postText, setPostText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle file uploads
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files).map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  // Function to remove uploaded files from state
  const handleRemoveFile = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
  };

  // Function to handle post submission
  const handlePost = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage("You must be logged in to post!");
      return;
    }

    const formData = new FormData();
    formData.append("text", postText);
    uploadedFiles.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post("http://localhost:8080/api/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Post response:", response.data);

      // Pass the new post data back to HomePage
      onPostSubmit({
        id: response.data.id,
        text: postText,
        mediaUrls: response.data.mediaUrls || [],
        username: response.data.username,
      });

      handleCloseModal();  // Close modal after successful post
    } catch (error) {
      console.error("Error posting content:", error.response?.data || error.message);
      setErrorMessage("Failed to post content. Please try again.");
    }
  };

  // Function to close the modal and reset state
  const handleCloseModal = () => {
    setShowModal(false);
    setUploadedFiles([]);
    setPostText("");
    setErrorMessage("");
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Share Media
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control mb-3"
            placeholder="Share your thoughts..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            rows="3"
          ></textarea>

          <div className="d-flex flex-column align-items-center">
            <label htmlFor="fileUpload" className="btn btn-outline-primary mb-3">
              + Upload from computer
            </label>
            <input
              type="file"
              id="fileUpload"
              accept="image/*,video/*"
              multiple
              onChange={handleFileUpload}
              className="d-none"
            />
            <div className="uploaded-files w-100">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-3 border rounded p-2"
                >
                  <img
                    src={file.preview}
                    alt={file.name}
                    style={{ maxWidth: "80px", maxHeight: "80px" }}
                    className="me-3"
                  />
                  <span>{file.name}</span>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handlePost}
            disabled={!postText && uploadedFiles.length === 0}
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MediaUpload;
