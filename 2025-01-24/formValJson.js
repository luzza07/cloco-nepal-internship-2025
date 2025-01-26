
// Validate Name
function validateName() {
    const name = document.getElementById("name").value;
    const nameError = document.getElementById("nameError");
    if (name.length < 3 || name.length > 20) {
      nameError.textContent = "Name must be between 3 and 20 characters.";
      return false;
    } else {
      nameError.textContent = "";
      return true;
    }
  }

  // Validate Address
  function validateAddress() {
    const address = document.getElementById("address").value;
    const addressError = document.getElementById("addressError");
    if (address.length < 5) {
      addressError.textContent =
        "Address must be at least 5 characters long.";
      return false;
    } else {
      addressError.textContent = "";
      return true;
    }
  }

  // Validate Email
  function validateEmail() {
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      return false;
    } else {
      emailError.textContent = "";
      return true;
    }
  }

  // Validate Phone Number
  function validatePhone() {
    const phone = document.getElementById("phone").value;
    const phoneError = document.getElementById("phoneError");
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      phoneError.textContent = "Phone number must be a 10-digit number.";
      return false;
    } else {
      phoneError.textContent = "";
      return true;
    }
  }

  // Validate IQ
  function validateIQ() {
    const iq = document.getElementById("iq").value;
    const iqError = document.getElementById("iqError");
    if (iq < 70 || iq > 160) {
      iqError.textContent = "IQ must be between 70 and 160.";
      return false;
    } else {
      iqError.textContent = "";
      return true;
    }
  }

  // Validate Gender
  function validateGender() {
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
      alert("Please select your gender.");
      return false;
    }
    return true;
  }

  // Validate Date
  function validateDate() {
    const date = document.getElementById("date").value;
    if (!date) {
      alert("Please select a date for the outing.");
      return false;
    }
    return true;
  }

  // Validate Essay
  function validateEssay() {
    const essay = document.getElementById("essay").value;
    const essayError = document.getElementById("essayError");
    if (essay.length < 10) {
      essayError.textContent = "Essay must be at least 10 characters long.";
      return false;
    } else {
      essayError.textContent = "";
      return true;
    }
  }

  // Validate Entire Form and log JSON data
  async function validate(event) {
    event.preventDefault(); // Prevent default form submission

    const isNameValid = validateName();
    const isAddressValid = validateAddress();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isIQValid = validateIQ();
    const isGenderValid = validateGender();
    const isDateValid = validateDate();
    const isEssayValid = validateEssay();

    if (
      isNameValid &&
      isAddressValid &&
      isEmailValid &&
      isPhoneValid &&
      isIQValid &&
      isGenderValid &&
      isDateValid &&
      isEssayValid
    ) {
      // Collect form data into JSON
      const formData = {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        iq: parseInt(document.getElementById("iq").value),
        gender: document.querySelector('input[name="gender"]:checked')
          .value,
        dateOfProposedOuting: document.getElementById("date").value,
        reasonForDating: document.getElementById("essay").value,
        references: document.getElementById("references").value,
        politicalPersuasion: document.getElementById("dropdown").value,
        educationLevelCompleted: document.getElementById("dropdown2").value,
        hasTattoosOrPiercings: document.getElementById("ch1").checked,
        isMoreThanTwoYearsOlder: document.getElementById("ch2").checked,
        ownsPanelVanOrV8Ute: document.getElementById("ch3").checked,
        worksFullTime: document.getElementById("ch4").checked,
        parentsAreRich: document.getElementById("ch5").checked,
        dateInWellLitLocation: document.getElementById("ch6").checked,
      };
      console.log(JSON.stringify(formData));

      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/67961a93e41b4d34e47ee58a",
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "X-Master-Key":
                "$2a$10$KCA6iTzDK4MQJDqbvnGmEexO.gMRbCVkQQemCqTbGF6KkpKqMWK3S",
            },
            body: JSON.stringify(formData),
          }
        );

        const result = await response.json();
        console.log(result);
        if (response.ok) {
          alert("Data posted successfully!");
          console.log("Response Data:", result);
        } else {
          alert("Failed to update data.");
          console.error("Error Response:", result);
        }
      } catch (error) {
        console.error("Network or API error:", error);
        alert("An error occurred while posting data.");
      }
    }

    // alert("we will contact you shortly...");
    fetchData();
  }
  async function fetchData() {
    try {
      const response = await fetch(
        "https://api.jsonbin.io/v3/b/67961a93e41b4d34e47ee58a",
        {
          method: "GET",
          headers: {
            "X-Master-Key":
              "$2a$10$KCA6iTzDK4MQJDqbvnGmEexO.gMRbCVkQQemCqTbGF6KkpKqMWK3S",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Fetched Data:", result);

      const outputDiv = document.getElementById("output");
      outputDiv.innerHTML = "";

      const data = result.record;
      const item = document.createElement("h1");
      item.textContent = "JSONBIN API OUTPUT:";
      outputDiv.appendChild(item);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const item = document.createElement("p");
          item.textContent = `${key}: ${data[key]}`;
          outputDiv.appendChild(item);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      const errorMessage = document.createElement("p");
      errorMessage.textContent =
        "Failed to fetch data. Please check the console for details.";
      document.getElementById("output").appendChild(errorMessage);
    }
  }