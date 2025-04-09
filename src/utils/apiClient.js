const apiClient = (url, options = {}) => {
    const token = localStorage.getItem("authToken");
  
    // Set default headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };
  
    return fetch(url, { ...options, headers }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    });
  };
  
  export default apiClient;
  