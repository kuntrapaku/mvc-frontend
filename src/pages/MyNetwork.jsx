import React, { useState, useEffect } from "react";
import "../styles/mynetwork.css";
import axios from "axios";
import { Link } from "react-router-dom";

const MyNetwork = () => {
  const [invitations, setInvitations] = useState([]);
  const [connections, setConnections] = useState([]);

  // Fetch both invitations + connections on mount
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const [invitesRes, connectionsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/connections/requests", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/api/connections", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setInvitations(invitesRes.data);
        setConnections(connectionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAll();
  }, []);

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `http://localhost:8080/api/connections/accept/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        alert(response.data.message);

        setInvitations((prev) => prev.filter((invite) => invite.id !== id));

        const updated = await axios.get("http://localhost:8080/api/connections", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setConnections(updated.data);
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleIgnore = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(`http://localhost:8080/api/connections/ignore/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvitations((prev) => prev.filter((invite) => invite.id !== id));
    } catch (error) {
      console.error("Error ignoring request:", error);
    }
  };

  return (
    <div className="network-container">
      <div className="sidebar">
        <h4>Manage my network</h4>
        <ul>
          <li>
            <Link to="/connections">Connections</Link> <span>{connections.length}</span>
          </li>
          <li>Following & Followers</li>
          <li>Groups</li>
          <li>Events</li>
          <li>Pages</li>
          <li>Newsletters</li>
        </ul>
      </div>

      <div className="content">
        <div className="tabs">
          <button className="active-tab">Grow</button>
          <button>Catch up</button>
        </div>

        {/* Connections Section */}
        {connections.length === 0 ? (
  <p>No connections yet.</p>
) : (
  connections.map((conn) => (
    <div key={conn.id} className="connection-card">
      <p><strong>{conn.fullName}</strong> (@{conn.username})</p>
    </div>
  ))
)}

        {/* Invitations Section */}
        <div className="invitations-section">
          <h5>Invitations ({invitations.length})</h5>
          {invitations.map((invite) => (
            <div className="invite-card" key={invite.id}>
              <p>
                <strong>{invite.fullName}</strong> (@{invite.username}) wants to connect with you.
              </p>
              <button className="accept-btn" onClick={() => handleAccept(invite.id)}>Accept</button>
              <button className="ignore-btn" onClick={() => handleIgnore(invite.id)}>Ignore</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyNetwork;
