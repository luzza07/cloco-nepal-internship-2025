
function validate() {
   
    const name = document.forms["Form"]["name"].value;
    const address = document.forms["Form"]["address"].value;
    const email = document.forms["Form"]["email"].value;
    const number = document.forms["Form"]["number"].value;
    const id = document.forms["Form"]["id"].value;
    const gender = document.forms["Form"]["gender"];
    const date = document.forms["Form"]["date"].value;
    const techStack = document.querySelectorAll('input[type="checkbox"]:checked');
    const experience = document.getElementById("dropdown").value;
    const education = document.getElementById("dropdown2").value;
    const essay = document.getElementById("msg").value;
    const references = document.getElementById("msg2").value;

    // Check if any required field is empty
    if (name === "" || address === "" || email === "" || number === "" || id === "" || 
        !isGenderSelected(gender) || date === "" || techStack.length === 0 || 
        experience === "" || education === "" || essay === "" || references === "") {
        
        // Show alert if any field is empty
        alert("Please fill out all fields.");
        return false; // Prevent form submission
    }

    return true; 
}

// Function to check if a gender is selected
function isGenderSelected(gender) {
    for (let i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            return true; 
        }
    }
    return false; 
}
