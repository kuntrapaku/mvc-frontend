document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form submission from refreshing the page
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Save token in localStorage
        alert('Login successful!');
        window.location.href = 'protected.html'; // Redirect to protected page
      } else {
        const errorData = await response.json();
        document.getElementById('error-message').innerText = errorData.message || 'Login failed!';
      }
    } catch (error) {
      console.error('Error during login:', error);
      document.getElementById('error-message').innerText = 'An unexpected error occurred.';
    }
  });
  