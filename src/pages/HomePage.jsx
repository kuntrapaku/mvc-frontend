import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import PostCard from "../components/PostCard";
import MediaUpload from "../components/MediaUpload";
import axios from "axios";

const HomePage = () => {
  const [posts, setPosts] = useState([]); // State to store posts

  // Fetch posts from the backend
  

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="container mt-4">
      {/* Top Navigation Bar */}
      <div className="top-bar d-flex justify-content-between align-items-center mb-3">
        <h3>MovieConnect</h3>
        <div className="top-buttons">
          <Link to="/register" className="top-button">
            Register
          </Link>
          <Link to="/login" className="top-button">
            Login
          </Link>
        </div>
      </div>

      <div className="row">
        {/* Left Sidebar */}
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Welcome, User!</h5>
            <ul>
              <li onClick={() => alert("Navigate to Connections")}>
                Connections
              </li>
              <li onClick={() => alert("Navigate to Groups")}>Groups</li>
              <li onClick={() => alert("Navigate to Saved Items")}>
                Saved Items
              </li>
            </ul>
          </div>
        </div>

        {/* Feed Section */}
        <div className="col-md-6">
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="What's on your mind?"
              rows="3"
            ></textarea>
            <div className="d-flex gap-3 mt-2">
              {/* Pass the callback to MediaUpload */}
              <MediaUpload onPostSubmit={handleNewPost} />
            </div>
          </div>

          {/* Display posts dynamically */}
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Movie Network News</h5>
            <ul>
              <li>Latest Movies Released</li>
              <li>Upcoming Blockbusters</li>
              <li>Trending Reviews</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
