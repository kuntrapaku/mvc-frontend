// Check if the user is authenticated
function checkAuthentication() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in to access this page.');
      window.location.href = 'login.html';
    }
  }
  
  // Log the user out
  function logout() {
    localStorage.removeItem('token'); // Remove the token
    alert('You have been logged out!');
    window.location.href = 'login.html';
  }
  