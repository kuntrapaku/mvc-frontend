// src/components/MovieCard.jsx
import React from "react";

const MovieCard = () => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Movie Title</h5>
        <p className="card-text">Brief description of the movie...</p>
        <button className="btn btn-primary btn-sm">View Details</button>
      </div>
    </div>
  );
};

export default MovieCard;
