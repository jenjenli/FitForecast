// Handle the form submission
document.getElementById("login-button").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Check if the login is correct
    if (username === "user123" && password === "password123") {
      // Redirect to the index.html in the weatherpage folder
      window.location.href = "../weatherpage/index.html";
    } else {
      // Display an error message if login is incorrect
      document.getElementById("error-message").innerText = "Invalid username or password.";
    }
  });
  
  
  // Function to display error message
  function displayError(message) {
    document.getElementById("error-message").innerText = message;
  }
  