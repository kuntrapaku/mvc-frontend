import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:8080/api/search?query=${query}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setErrorMessage("Failed to fetch search results.");
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleConnect = async (recipientId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error("User not authenticated");
      }
  
      const response = await axios.post('http://localhost:8080/api/connections/send', 
        null,  // No body, data sent in URL params
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            recipientId: recipientId,
          }
        }
      );

      if (response.data.success) {
        setSuccessMessage(`Connection request sent to ${recipientId}`);
      } else {
        setErrorMessage(response.data.message || "Failed to send connection request");
      }

      console.log("Connection request sent:", response.data);
    } catch (error) {
      setErrorMessage("Error sending connection request. Please try again.");
      console.error("Error sending connection request:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Search Results for "{query}"</h2>

      {/* Success and Error Messages */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      {results.length > 0 ? (
        <div className="row">
          {results.map((result) => (
            <div key={result.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{result.username}</h5>
                  <p className="card-text">
                    {result.fullName || "No additional details available"}
                  </p>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate(`/profile/${result.id}`)}
                  >
                    View Profile
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleConnect(result.id)}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
