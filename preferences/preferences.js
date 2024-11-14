document.querySelectorAll(".preference-btn").forEach(button => {
    button.addEventListener("click", function() {
        button.classList.toggle("selected");
    });
});

document.getElementById("savePreferencesBtn").addEventListener("click", function() {
    const preferences = {
        sensitivity: {
            cold: document.getElementById("sensitive-cold").classList.contains("selected"),
            heat: document.getElementById("sensitive-heat").classList.contains("selected"),
            light: document.getElementById("sensitive-light").classList.contains("selected"),
        },
        health: {
            asthma: document.getElementById("asthma").classList.contains("selected"),
            skinCondition: document.getElementById("skin-condition").classList.contains("selected"),
            jointPain: document.getElementById("joint-pain").classList.contains("selected"),
        },
        preferred: {
            cold: document.getElementById("cold-weather").classList.contains("selected"),
            hot: document.getElementById("hot-weather").classList.contains("selected"),
            moderate: document.getElementById("moderate-weather").classList.contains("selected"),
        }
    };

    const username = localStorage.getItem("storedUsername");
    console.log(username);
    if (username) {
        localStorage.setItem(`preferences-${username}`, JSON.stringify(preferences));

        window.location.href = "../login/login.html"; 
    } else {
        alert("No user is logged in.");
    }
});
