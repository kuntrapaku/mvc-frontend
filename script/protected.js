document.addEventListener('DOMContentLoaded', async function () {
    checkAuthentication(); // Ensure the user is authenticated
  
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8080/api/protected-endpoint', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Add token to Authorization header
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Protected data:', data);
        // Display the data on the page
      } else {
        console.error('Access denied:', await response.json());
        alert('Access denied. Please log in again.');
        logout(); // Clear token and redirect
      }
    } catch (error) {
      console.error('Error fetching protected data:', error);
      alert('An error occurred. Please try again later.');
    }
  });
  
  document.getElementById('logout').addEventListener('click', logout);
  