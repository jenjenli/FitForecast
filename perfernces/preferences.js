// Add event listeners to all buttons with preference-btn class
const buttons = document.querySelectorAll('.preference-btn');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Toggle the 'selected' class for the clicked button
        this.classList.toggle('selected');
    });
});

// Handle save preferences button click
document.getElementById("savePreferencesBtn").addEventListener("click", function() {
    // Collect selected preferences
    const selectedPreferences = [];
    
    buttons.forEach(button => {
        if (button.classList.contains('selected')) {
            selectedPreferences.push(button.id);  // Collect the button's ID
        }
    });

    // Log the selected preferences
    console.log('Selected Preferences:', selectedPreferences);

    // You can add further code here to save preferences, such as sending them to a server
});
