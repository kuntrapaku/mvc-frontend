// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src="/path/to/user-image.jpg" className="card-img-top" alt="User Profile" />
      <div className="card-body">
        <h5 className="card-title">Welcome, User!</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Profile Viewers</li>
          <li className="list-group-item">Analytics</li>
          <li className="list-group-item">Saved Items</li>
          <li className="list-group-item">Groups</li>
          <li className="list-group-item">Events</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
