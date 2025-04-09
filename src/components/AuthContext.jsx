import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); // Update state based on token presence
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token); // Save token
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // Remove token
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
