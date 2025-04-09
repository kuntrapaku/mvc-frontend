// src/components/PostCard.jsx
import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{post.username || "[Unknown User]"}</h5>
        <p className="card-text">{post.text || "No content available."}</p>
        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div className="mt-3">
            {post.mediaUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="Uploaded media"
                className="img-fluid rounded"
                style={{ maxWidth: "100%" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
