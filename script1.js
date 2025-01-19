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

const currencyInput = document.getElementById("currencyInput");
const currencyList = document.getElementById("currencyList");
const hiddenCurrencyField = document.getElementById("currency");

// Show dropdown when the input is focused
currencyInput.addEventListener("focus", () => {
    currencyList.style.display = "block";
});

// Filter currencies as user types
currencyInput.addEventListener("input", () => {
    const filter = currencyInput.value.toLowerCase();
    const options = currencyList.querySelectorAll("li");
    options.forEach(option => {
        if (option.textContent.toLowerCase().includes(filter)) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    });
});

// Select currency from dropdown
currencyList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        const selectedValue = e.target.dataset.value;
        const selectedText = e.target.textContent;
        currencyInput.value = selectedText;
        hiddenCurrencyField.value = selectedValue;
        currencyList.style.display = "none"; // Hide dropdown
    }
});

// Hide dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!currencyInput.contains(e.target) && !currencyList.contains(e.target)) {
        currencyList.style.display = "none";
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

    const balance = parseFloat(formData.get('currency'));
    if (balance < 0) {
        alert("Initial balance cannot be negative.");
        return; // Prevent form submission if balance is invalid
    }

    const data = {
        AccountHolderName: formData.get('name'),
        Currency: formData.get('currency'),
        DOB: formData.get('dob'),
        Balance: formData.get('balance'),
        TransactionPIN: formData.get('pin')
    };

    // API request
    fetch('http://localhost:8080/tenant/default/packages.DataBase.api.addAccounts.main', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer RDJnjlX3wdjJbDZrJ04Jc6KG9KzqOskEIpWGFbpFt+IOMifPmWLjOpTWyGaaaUKiV3BxbNlJX/gxUorMejlg7kgboALB2lkPGwDOSYrJw5wNM9YpNMe7uPoP42hxnqB32LR7k5cdReUILlwbqGxBKhdYcoRWSKIHHFHt7BBpwiWRPiDh7fz6JSPIP2Vc/HcmzeDFJRrBUZbfnNbpLTcaaXRyVETvxR9s58M7f9oTogNlAQkILvnIHNMDgphwrr90wwecPrEn5h/lpX63wf4BCQz4w7zaT+DHTVod4xD/x0SKZzENxjIxgW4MgsTuedbPRqLV1dK7KO/H1mp0TT9MZRgD+Fv41SKFTYN1ZVVrchZlqwGKvZZ7e7g0vQcF3XPR2dzv1rr3vSFZ4ay+aqeeup2uEy/RQLkkYJSvyETiL26EQadZeD2m1OEHXpTB6HT7pOwIp3haf6pMfi5qA1oLHRtH+RlnpclWy4lneDo7FmAd9kwdjEvK5Hj1aCNZuPs6tGFjOKcebfzcJCca//r0y9vJ8/vwreLw/4TwRvdMFW5VScpbzgL3bLqlGQIYYYvZNP0/LfzHZ4PjLm+5YwzCTIzJK3mOZxJvqma3UM/MBVpiC4W4zIWbWVxWYue+vBraJ3w54VRPW5SCBBM9FPcqu63XLtnjCgx5JtizOXF4h98='
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


