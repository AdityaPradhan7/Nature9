// Toggle visibility of the password field
const toggleEye = document.getElementById("toggleEye");
const pinInput = document.getElementById("pin");

toggleEye.addEventListener("click", () => {
    if (pinInput.type === "password") {
        pinInput.type = "text";
        toggleEye.textContent = "{/}";
    } else {
        pinInput.type = "password";
        toggleEye.textContent = "{•}";
    }
});


// DOB Validation
const dobInput = document.getElementById("dob");
dobInput.addEventListener("change", () => {
    const selectedDate = new Date(dobInput.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
        dobInput.setCustomValidity("Future dates are not allowed.");
    } else {
        dobInput.setCustomValidity("");
    }
});


const balanceInput = document.getElementById("balance");

// Balance validation (prevent negative input)
balanceInput.addEventListener('input', function() {
    const balanceValue = parseFloat(balanceInput.value);

    if (balanceValue < 0) {
        balanceInput.setCustomValidity('Balance cannot be negative.');
    } else {
        balanceInput.setCustomValidity(''); // Clear custom error if the value is valid
    }
});


// PIN should be atleast 6 characters long
pinInput.addEventListener('input', function() {
    if (pinInput.value.length < 6) {
        pinInput.setCustomValidity('PIN must be at least 6 characters long');
    } else {
        pinInput.setCustomValidity(''); // Clear the custom error message if length is valid
    }
});


// API Integration
document.getElementById('accountForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const formData = new FormData(this);

    const data = {
        AccountHolderName: formData.get('name'),
        Currency: formData.get('currency'),
        DOB: formData.get('dob'),
        Balance: formData.get('balance'),
        TransactionPIN: formData.get('pin')
    };

    // API request
    fetch('http://localhost:8080/tenant/default/User/ACCOUNT/NEW', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer hg4zEVZKKMfrygDnG6swMqoz3gRzZMShIGr0OeCsrC8/sL/i8zG+6EFjr7uNeh0/VYwRvra7SAxyZDL5MMx9WtDJ5j82vI/ucDI9D8/9+83dNpEi3w4yu1vPBVqEQzEfLAB6+CmzbgA+LGvSRus6ds+CRYTCCYUj/nbn3uhQC8BQok6yaAA+4Muv9PwbqwO7sAa/RrxSlzs6R6C/2Qm+Zh6VgTW0rqS2UphGDtV7Jq6SJfMD6S7wHGrsv4fkwyCqp2wZjR5bj8fhzm6rrZ8wmIlOL8iAWwfZ/ybWiq+dlPpByGTzgD1ozps/Yb04PaoTZm6ZJDRfDXtaWwLE6sNoNfkSE0r6uaxUbLegxuupI/XevBeFEcuYgOmdEPSPVRK005y6kBZJ/oicM8qNvcczregTfwlqBWqBCJrsFEhrFEJs+jnG2Z43QfXvCW9+5fcyPArGhj+wWsEDsc1FxZFlYmrLlDo7yeCa8iBs2oSYrIJY4L7ATljyTlsUOMaWMLoXYEr8YYhs/QqkUNeDmzsFvot56cJndsuOmh1DVyD2IC9BTXfi/TZ7AbHU1WSlh8ptcAk5zkwOQhUdIE0HNBrrXP0val2i/gPb9dRA2GkZHzXENmVhpWt+l9T2opYAonMNgdNwOxX2DFENkrI7Iz0X1c+hD8Xc7TuEIbfbsIelosY='
        },
        body: JSON.stringify(data),
    
    })
    .then(response => {
        // console.log(response); // Log the entire response to check its structure
        if (!response.ok) {
            throw new Error('Failed to create account');
        }
        return response.json(); // Parse JSON response
    })
    .then(responseData => {
        // console.log(responseData); // Log the response data
        if (responseData.AccountNumber) {
            alert(`Account created successfully!\n\nAccount Holder Name: ${data.AccountHolderName}\nAccount Number: ${responseData.AccountNumber}`);
        } else {
            alert('Account creation failed');
        }
    })
    .catch(error => {
        // console.log('Error:', error);
        alert('There was an error while creating the account');
    });
});


