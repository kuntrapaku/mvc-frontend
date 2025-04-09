// src/components/RightSidebar.jsx
import React from 'react';

const RightSidebar = () => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-header">
        LinkedIn News
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">An item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
      </ul>
    </div>
  );
};

export default RightSidebar;
