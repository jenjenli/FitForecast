// Add event listeners to all buttons with preference-btn class
// Add event listeners to all buttons with the "preference-btn" class
document.querySelectorAll(".preference-btn").forEach(button => {
    button.addEventListener("click", function() {
        // Toggle the button's "selected" state (or add/remove class)
        button.classList.toggle("selected");
    });
});

// When "Save Preferences" button is clicked, save selected preferences
document.getElementById("savePreferencesBtn").addEventListener("click", function() {
    // Collect preferences based on which buttons are selected
    const preferences = {
        sensitivity: [],
        healthConditions: [],
        preferredWeather: []
    };

    // Example of collecting preferences based on selected buttons
    if (document.getElementById("sensitive-cold").classList.contains("selected")) {
        preferences.sensitivity.push("Sensitive to Cold");
    }
    if (document.getElementById("sensitive-heat").classList.contains("selected")) {
        preferences.sensitivity.push("Sensitive to Heat");
    }
    if (document.getElementById("sensitive-light").classList.contains("selected")) {
        preferences.sensitivity.push("Sensitive to Light");
    }
    // Repeat for other categories like "healthConditions" and "preferredWeather"

    // Save preferences to localStorage under the current username
    const username = localStorage.getItem("currentUser");
    const allPreferences = JSON.parse(localStorage.getItem("userPreferences")) || {};
    allPreferences[username] = preferences;
    localStorage.setItem("userPreferences", JSON.stringify(allPreferences));

    // Redirect to the weather page after saving preferences
    window.location.href = "../weatherPage/index.html";
});

