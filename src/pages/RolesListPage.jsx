import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate
import { FaFilter, FaSearch, FaBell, FaUser } from 'react-icons/fa';

const RolesList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Role'); // Default filter
  const [subFilters, setSubFilters] = useState([]); // Subfilters for active filter
  const [datePosted, setDatePosted] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const predefinedLocations = ['Hyderabad', 'Bangalore', 'Mumbai', 'Kerala', 'Chennai']; // Static locations

  const locationSearch = useLocation();
  const navigate = useNavigate(); // Added navigate function

  useEffect(() => {
    const params = new URLSearchParams(locationSearch.search);
    const title = params.get('title');
    const industry = params.get('industry');

    const query = `?${title ? `title=${encodeURIComponent(title)}` : ''}${
      industry ? `&industry=${encodeURIComponent(industry)}` : ''
    }`;
    fetch(`http://localhost:8080/api/roles${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRoles(data);
        setFilteredRoles(data); // Initialize filtered roles with all roles
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [locationSearch.search]);

  const mainFilters = {
    Role: ['Date Posted', 'Location'],
    Videos: ['Type', 'Length'],
    ShootingLocations: ['Region', 'Duration'],
  };

  const handleMainFilterClick = (filter) => {
    setActiveFilter(filter);
    setSubFilters(mainFilters[filter] || []);
  };

  const handleDateSelect = (dateOption) => {
    setDatePosted(dateOption);
    setShowDateDropdown(false);
  };

  const handleLocationSelect = (locationOption) => {
    setSelectedLocation(locationOption);
    setShowLocationDropdown(false);
  };

  const handleShowResults = () => {
    const filtered = roles.filter((role) => {
      const matchesDate = datePosted ? role.datePosted === datePosted : true;
      const matchesLocation = selectedLocation
        ? role.location.toLowerCase().includes(selectedLocation.toLowerCase())
        : true;
      return matchesDate && matchesLocation;
    });

    setFilteredRoles(filtered); // Update filtered roles
  };

  const handleApply = (role) => {
    navigate('/contact', { state: { role } }); // Navigate to Contact Page with role details
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-3">
      {/* Main Filters Section */}
      <div className="d-flex gap-3 mb-3">
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaFilter /> {activeFilter}
          </button>
          <ul className="dropdown-menu">
            {Object.keys(mainFilters).map((filter) => (
              <li key={filter}>
                <button
                  className="dropdown-item"
                  onClick={() => handleMainFilterClick(filter)}
                >
                  {filter}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Subfilters Section */}
        {activeFilter === 'Role' && (
          <>
            {/* Date Posted Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                onClick={() => setShowDateDropdown(!showDateDropdown)}
              >
                Date Posted
              </button>
              {showDateDropdown && (
                <div className="dropdown-menu show">
                  <div
                    className={`dropdown-item ${
                      datePosted === 'Any Time' ? 'active' : ''
                    }`}
                    onClick={() => handleDateSelect('Any Time')}
                  >
                    Any Time
                  </div>
                  <div
                    className={`dropdown-item ${
                      datePosted === 'Past 24 Hours' ? 'active' : ''
                    }`}
                    onClick={() => handleDateSelect('Past 24 Hours')}
                  >
                    Past 24 Hours
                  </div>
                  <div
                    className={`dropdown-item ${
                      datePosted === 'Past Week' ? 'active' : ''
                    }`}
                    onClick={() => handleDateSelect('Past Week')}
                  >
                    Past Week
                  </div>
                  <div
                    className={`dropdown-item ${
                      datePosted === 'Past Month' ? 'active' : ''
                    }`}
                    onClick={() => handleDateSelect('Past Month')}
                  >
                    Past Month
                  </div>
                </div>
              )}
            </div>

            {/* Location Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              >
                Location
              </button>
              {showLocationDropdown && (
                <div className="dropdown-menu show">
                  {predefinedLocations.map((loc, index) => (
                    <div
                      key={index}
                      className={`dropdown-item ${
                        selectedLocation === loc ? 'active' : ''
                      }`}
                      onClick={() => handleLocationSelect(loc)}
                      style={{ cursor: 'pointer' }}
                    >
                      {loc}
                    </div>
                  ))}
                  <div className="d-flex justify-content-between mt-2 px-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowLocationDropdown(false)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleShowResults}>
                      Show Results ({filteredRoles.length})
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Right-side icons */}
        <div className="ms-auto d-flex gap-3">
          <FaSearch size={20} />
          <FaBell size={20} />
          <FaUser size={20} />
        </div>
      </div>

      {/* Roles List Section */}
      <div className="row">
        <div className="col-md-6">
          <h1>Filtered Roles ({filteredRoles.length})</h1>
          {filteredRoles.length === 0 ? (
            <p>No roles found for the selected filters.</p>
          ) : (
            <ul className="list-group">
              {filteredRoles.map((role) => (
                <li
                  key={role.id}
                  className="list-group-item"
                  onClick={() => setSelectedRole(role)}
                  style={{ cursor: 'pointer' }}
                >
                  <h2>{role.title}</h2>
                  <p>
                    <strong>Industry:</strong> {role.industry}
                  </p>
                  <p>
                    <strong>Location:</strong> {role.location}
                  </p>
                  <button
                    className="btn btn-success mt-2"
                    onClick={() => handleApply(role)} // Navigate to Contact Page
                  >
                    Apply
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Role Details Section */}
        <div className="col-md-6">
          {selectedRole ? (
            <div>
              <h2>{selectedRole.title}</h2>
              <p>{selectedRole.description}</p>
              <p>
                <strong>Industry:</strong> {selectedRole.industry}
              </p>
              <p>
                <strong>Location:</strong> {selectedRole.location}
              </p>
              <div className="d-flex gap-3 my-3">
                <button
                  className="btn btn-success"
                  onClick={() => handleApply(selectedRole)} // Navigate to Contact Page
                >
                  Apply
                </button>
                <button className="btn btn-secondary">Save</button>
              </div>
            </div>
          ) : (
            <p>Select a role to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolesList;
