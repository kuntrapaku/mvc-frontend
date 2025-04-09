import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate for redirection

const ContactPage = () => {
  const location = useLocation(); // Access the passed data
  const navigate = useNavigate(); // To redirect to RolesListPage
  const { selectedRole } = location.state || {}; // Destructure the selected role

  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const countryCodes = [
    { code: "+91", name: "India" },
    { code: "+1", name: "United States" },
    { code: "+44", name: "United Kingdom" },
    { code: "+61", name: "Australia" },
    { code: "+33", name: "France" },
  ];

  const handleSubmit = () => {
    if (!email || !phoneNumber || !countryCode) {
      setError("Please fill in all the fields.");
      return;
    }

    // Clear any previous errors
    setError("");

    // Simulate submission logic
    console.log("Submitted Details:", { email, countryCode, phoneNumber });

    // Show popup message
    alert("Your application has been submitted successfully!");

    // Redirect back to RolesListPage
    navigate("/roles");
  };

  return (
    <div className="container mt-5">
      <h1>Apply for {selectedRole?.title || "the Role"}</h1>
      <p>{selectedRole?.description || "Fill out your details below."}</p>
      <div className="card p-4 shadow">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="countryCode" className="form-label">
            Country Code
          </label>
          <select
            className="form-select"
            id="countryCode"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
          >
            <option value="">Select Country Code</option>
            {countryCodes.map((country, index) => (
              <option key={index} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button
          className="btn btn-primary w-100"
          onClick={handleSubmit} // Trigger submission logic
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
