// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

export const fetchPosts = async () => {
  return axios.get(`${API_URL}posts`);
};

export const fetchRoles = async () => {
  return axios.get(`${API_URL}roles`);
};
