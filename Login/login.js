// Handle the form submission
/*document.getElementById("login-button").addEventListener("click", function () {
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
  }*/

  // Wait for the DOM content to load before executing the script
document.addEventListener("DOMContentLoaded", function() {
  // Get the login form and the login button
  const loginButton = document.getElementById("login-button");

  // Listen for click events on the login button
  loginButton.addEventListener("click", function(event) {
    event.preventDefault();  // Prevent the default form submission

    // Get the values entered by the user
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve the stored credentials from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // Check if the entered username and password match the stored credentials
    if (username === storedUsername && password === storedPassword) {
      // Redirect to the weather page if login is successful
      window.location.href = "../weatherpage/index.html";
    } else {
      // Display an error message if the login is invalid
      document.getElementById("error-message").innerText = "Invalid username or password.";
    }
  });
});

  