// Wait for the DOM content to load before executing the script
console.log(localStorage);
console.log(localStorage.getItem("storedUsername"));

document.addEventListener("DOMContentLoaded", function() {
  // Get the login button
  const loginButton = document.getElementById("login-button");

  // Listen for click events on the login button
  loginButton.addEventListener("click", function(event) {
    event.preventDefault();  // Prevent the default form submission

    // Get the values entered by the user
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve the stored credentials from localStorage
    const storedUsername = localStorage.getItem("storedUsername");
    const storedPassword = localStorage.getItem("storedPassword");

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
