import React, { useEffect, useState } from "react";
import "../styles/connections.css";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ NEW: Needed for linking profiles

const Connections = () => {
  const [requests, setRequests] = useState([]);
  const [acceptedConnections, setAcceptedConnections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const reqRes = await axios.get("http://localhost:8080/api/connections/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const connRes = await axios.get("http://localhost:8080/api/connections", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRequests(reqRes.data);
        setAcceptedConnections(connRes.data);
      } catch (err) {
        console.error("Error fetching connections:", err);
      }
    };

    fetchData();
  }, []);

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `http://localhost:8080/api/connections/accept/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        setRequests((prev) => prev.filter((r) => r.id !== id));

        const updated = await axios.get("http://localhost:8080/api/connections", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAcceptedConnections(updated.data);
      }
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const handleIgnore = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `http://localhost:8080/api/connections/ignore/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Error ignoring request:", err);
    }
  };

  return (
    <div className="connections-container">
      <h2>Connection Requests</h2>
      {requests.length === 0 ? (
        <p className="no-requests">No new connection requests.</p>
      ) : (
        <div className="request-list">
          {requests.map((req) => (
            <div className="request-card" key={req.id}>
              <img src={req.profilePictureUrl || "https://via.placeholder.com/50"} alt="Profile" className="profile-img" />
              <div className="request-info">
                <h4>{req.fullName}</h4>
                <p>@{req.username}</p>
              </div>
              <div className="request-actions">
                <button className="accept-btn" onClick={() => handleAccept(req.id)}>Accept</button>
                <button className="ignore-btn" onClick={() => handleIgnore(req.id)}>Ignore</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2>My Connections</h2>
      {acceptedConnections.length === 0 ? (
        <p className="no-connections">No connections yet.</p>
      ) : (
        <div className="connections-list">
          {acceptedConnections.map((conn) => (
            <Link
              to={`/profile/${conn.username}`} // ✅ NEW: Link to user's profile
              key={conn.id}
              className="connection-card"
              style={{ textDecoration: "none", color: "inherit" }} // Optional: keep styling
            >
              <img src={conn.profilePictureUrl || "https://via.placeholder.com/50"} alt="Profile" className="profile-img" />
              <div className="connection-info">
                <h4>{conn.fullName}</h4>
                <p>@{conn.username}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
