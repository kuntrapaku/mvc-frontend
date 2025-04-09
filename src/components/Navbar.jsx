import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUserFriends, FaFilm, FaEnvelope, FaBell, FaUser } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Handles changes in the search input field
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Submitting the search query and navigating to search results
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MovieConnect</Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" to="/"><FaHome /> Home</Link>
            <Link className="nav-link" to="/network"><FaUserFriends /> My Network</Link>
            <Link className="nav-link" to="/movies"><FaFilm /> Movies</Link>
            <Link className="nav-link" to="/messaging"><FaEnvelope /> Messaging</Link>
            <Link className="nav-link" to="/notifications"><FaBell /> Notifications</Link>
            <Link className="nav-link" to="/profile"><FaUser /> Profile</Link>
          </div>
        </div>

        {/* Unified LinkedIn-like Search Bar */}
        <div className="search-container d-flex align-items-center">
          <form onSubmit={handleSearchSubmit} className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Search for users, titles, posts..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button type="submit" className="btn btn-primary ms-2">Search</button>
          </form>
        </div>

        <div className="auth-container ms-3">
          {!token ? (
            <>
              <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
              <Link className="btn btn-outline-success" to="/register">Register</Link>
            </>
          ) : (
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </nav>
  );
};

export default Navbar;
