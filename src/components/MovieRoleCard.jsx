// src/components/MovieRoleCard.jsx
import React from 'react';

const MovieRoleCard = ({ role }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{role.title}</h5>
        <p className="card-text">{role.company} - {role.location} ({role.type})</p>
        <button className="btn btn-outline-primary">View Details</button>
      </div>
    </div>
  );
};

export default MovieRoleCard;
