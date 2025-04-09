import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import filmRoles from '../data/roles.json'; // Ensure your film roles data is correctly imported
import MovieRoleCard from '../components/MovieRoleCard';

const MovieRolesPage = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [searchTitle, setSearchTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [filteredTitles, setFilteredTitles] = useState([]); // For storing filtered titles
  const [roles, setRoles] = useState(filmRoles);

  // Function to handle changes in the search field and provide suggestions
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTitle(term);
    if (term) {
      const filtered = roles
        .map(role => role.title)
        .filter(title => title.toLowerCase().includes(term.toLowerCase()))
        .slice(0, 5); // Limit the number of suggestions to 5
      setFilteredTitles([...new Set(filtered)]); // Use Set to remove duplicates
    } else {
      setFilteredTitles([]);
    }
  };

  // Select a title from suggestions
  const handleTitleSelect = (title) => {
    setSearchTitle(title);
    setFilteredTitles([]);
  };

  // Navigate to roles list page with filters
  const handleSearch = () => {
    const query = `?${searchTitle ? `title=${encodeURIComponent(searchTitle)}` : ''}${
      industry ? `&industry=${encodeURIComponent(industry)}` : ''
    }`;
  
    console.log(`Navigating to: /roles${query}`); // Debug the query string
    navigate(`/roles${query}`); // Navigate to RolesListPage with query params
  };
  

  return (
    <div className="container mt-3">
      <div className="row">
        {/* Search Filters Section */}
        <div className="col-md-4">
          {/* Input for Title */}
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Title, skill, or company"
            value={searchTitle}
            onChange={handleInputChange}
          />
          {/* Suggestions for Title */}
          {filteredTitles.length > 0 && (
            <ul className="list-group">
              {filteredTitles.map((title, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleTitleSelect(title)}
                >
                  {title}
                </li>
              ))}
            </ul>
          )}
          {/* Dropdown for Industry */}
          <select
            className="form-control mb-2"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option value="">Select Industry</option>
            {['TFI', 'HFI', 'TAMIL', 'KFI', 'ENGLISH'].map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          {/* Search Button */}
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Filtered Roles Display */}
        <div className="col-md-8">
          {roles
            .filter(
              (role) =>
                role.title === searchTitle &&
                (industry ? role.industry === industry : true)
            )
            .map((role) => (
              <MovieRoleCard key={role.id} role={role} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRolesPage;
