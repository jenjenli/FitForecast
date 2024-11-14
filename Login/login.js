// Wait for the DOM content to load before executing the script
console.log(localStorage);
console.log(localStorage.getItem("storedUsername"));

document.addEventListener("DOMContentLoaded", function() {
  const loginButton = document.getElementById("login-button");

  loginButton.addEventListener("click", function(event) {
    event.preventDefault();  // Prevent the default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const storedUsername = localStorage.getItem("storedUsername");
    const storedPassword = localStorage.getItem("storedPassword");

    if (username === storedUsername && password === storedPassword) {
      window.location.href = "../weatherpage/index.html";
    } else {
      document.getElementById("error-message").innerText = "Invalid username or password.";
    }
  });
});
