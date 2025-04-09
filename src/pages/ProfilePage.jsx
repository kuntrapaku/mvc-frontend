import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/profilepage.css"; // Assume you style here

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const userRes = await axios.get(
          `http://localhost:8080/api/users/username/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const postsRes = await axios.get(
          `http://localhost:8080/api/posts/user/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setProfile(userRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    fetchProfile();
  }, [username]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={profile.profilePictureUrl || "https://via.placeholder.com/100"}
          alt="Profile"
          className="profile-pic"
        />
        <div className="profile-info">
          <h2>{profile.fullName}</h2>
          <p>@{profile.username}</p>
          <p>{profile.bio}</p>
          <p className="location">{profile.location || ""}</p>
        </div>
      </div>

      <div className="tabs">
        <button className="active-tab">Posts</button>
        <button disabled>Reels</button>
        <button disabled>Tagged</button>
      </div>

      <div className="posts-section">
        {posts.length === 0 ? (
          <p className="no-posts">No posts yet.</p>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                {post.mediaUrls && post.mediaUrls.length > 0 ? (
                  <img src={post.mediaUrls[0]} alt="post" />
                ) : (
                  <p>{post.text}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
