const signUpForm = document.getElementById("signup-form");

        // Add an event listener for form submission
        signUpForm.addEventListener("submit", function(event) {
            // Prevent default form submission to handle redirection first
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            localStorage.setItem("storedPassword", password);
            localStorage.setItem("storedUsername", username);

            const userPreferences = {
                sensitivity: {
                    cold: false,
                    heat: false,
                    light: false,
                },
                health: {
                    asthma: false,
                    skinCondition: false,
                    jointPain: false,
                },
                preferred: {
                    cold: false,
                    hot: false,
                    moderate: false,
                }
            };
            localStorage.setItem(`preferences-${username}`, JSON.stringify(userPreferences));
            // Here you could make an AJAX request to submit the form data to the server (optional)
            // For now, let's just redirect to the preferences page after form submission
            window.location.href = "../perfernces/preferences.html";  // Redirect to preferences page after submission
        });