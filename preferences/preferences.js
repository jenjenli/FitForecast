document.getElementById("savePreferencesBtn").addEventListener("click", function() {
    const preferences = {
        sensitivity: {
            cold: document.getElementById("sensitive-cold").classList.contains("selected"),
            heat: document.getElementById("sensitive-heat").classList.contains("selected"),
            light: document.getElementById("sensitive-light").classList.contains("selected"),
        },
        healthConditions: {
            asthma: document.getElementById("asthma").classList.contains("selected"),
            skinCondition: document.getElementById("skin-condition").classList.contains("selected"),
            jointPain: document.getElementById("joint-pain").classList.contains("selected"),
        },
        preferredWeather: {
            cold: document.getElementById("cold-weather").classList.contains("selected"),
            hot: document.getElementById("hot-weather").classList.contains("selected"),
            moderate: document.getElementById("moderate-weather").classList.contains("selected"),
        }
    };

    // Assuming username is stored in localStorage from the signup process
    const username = localStorage.getItem("username");

    if (username) {
        localStorage.setItem(`preferences-${username}`, JSON.stringify(preferences));
    } else {
        alert("No user is logged in.");
    }
});
