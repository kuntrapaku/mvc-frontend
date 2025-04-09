import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MovieRolesPage from "./pages/MovieRolesPage";
import RolesListPage from "./pages/RolesListPage";
import ContactPage from "./pages/ContactPage";
import PostContent from "./pages/PostContent";
import LoginPage from "./pages/LoginPage";
import RegisterForm from "./pages/RegisterPage";
import ProtectedPage from "./pages/ProtectedPage"; // New protected page
import { AuthProvider } from "./components/AuthContext"; // Auth context
import ProtectedRoute from "./components/ProtectedRoute"; // Protected route wrapper
import MyNetwork from "./pages/MyNetwork";
import './App.css';
import Connections from "./pages/Connections";
import SearchResults from "./pages/SearchResults";


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MovieRolesPage />} />
            <Route path="/roles" element={<RolesListPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/post-content" element={<PostContent />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/network" element={<MyNetwork />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/profile/:username" element={<ProfilePage />} />


            {/* Protected Routes */}
            <Route path="/protected" element={
              <ProtectedRoute>
                <ProtectedPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;

