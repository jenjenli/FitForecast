const signUpForm = document.getElementById("signup-form");

        signUpForm.addEventListener("submit", function(event) {
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
            window.location.href = "../perfernces/preferences.html";  
        });