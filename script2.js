const toggleEye = document.getElementById("toggleEye");
const pinInput = document.getElementById("transactionPIN");
toggleEye.addEventListener("click", () => {
    if (pinInput.type === "password") {
        pinInput.type = "text";
        toggleEye.textContent = "{/}";
    } else {
        pinInput.type = "password";
        toggleEye.textContent = "{•}";
    }
});


// Global variable that stores Sender's transaction PIN
let storedTransactionPIN = '';
let senderCurrency='';
let receiverCurrency ='';
let senderBalance='';
let receiverBalance ='';

const token = 'hg4zEVZKKMfrygDnG6swMqoz3gRzZMShIGr0OeCsrC8/sL/i8zG+6EFjr7uNeh0/VYwRvra7SAxyZDL5MMx9WtDJ5j82vI/ucDI9D8/9+83dNpEi3w4yu1vPBVqEQzEfLAB6+CmzbgA+LGvSRus6ds+CRYTCCYUj/nbn3uhQC8BQok6yaAA+4Muv9PwbqwO7sAa/RrxSlzs6R6C/2Qm+Zh6VgTW0rqS2UphGDtV7Jq6SJfMD6S7wHGrsv4fkwyCqp2wZjR5bj8fhzm6rrZ8wmIlOL8iAWwfZ/ybWiq+dlPpByGTzgD1ozps/Yb04PaoTZm6ZJDRfDXtaWwLE6sNoNfkSE0r6uaxUbLegxuupI/XevBeFEcuYgOmdEPSPVRK005y6kBZJ/oicM8qNvcczregTfwlqBWqBCJrsFEhrFEJs+jnG2Z43QfXvCW9+5fcyPArGhj+wWsEDsc1FxZFlYmrLlDo7yeCa8iBs2oSYrIJY4L7ATljyTlsUOMaWMLoXYEr8YYhs/QqkUNeDmzsFvot56cJndsuOmh1DVyD2IC9BTXfi/TZ7AbHU1WSlh8ptcAk5zkwOQhUdIE0HNBrrXP0val2i/gPb9dRA2GkZHzXENmVhpWt+l9T2opYAonMNgdNwOxX2DFENkrI7Iz0X1c+hD8Xc7TuEIbfbsIelosY=';

document.getElementById('validateFrom').addEventListener('click', function () {
    const fromAccount = document.getElementById('fromAccount').value;
    const validateButton = document.getElementById('validateFrom');
    
    if (!fromAccount) {
        alert('Please enter Sender\'s Account number.');
        return;
    }

    // Make an API call to check if the account exists
    fetch(`http://localhost:8080/tenant/default/User/VALIDATE/ACCOUNT?AccountNumber=${fromAccount}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Account not found');
        }
        return response.json();
    })
    .then(data => {
        // Check if the response is empty or no transaction PIN is returned
        if (!data) {
            alert('No Account found with this Account Number');
            return;
        }
        
        // If account exists, store the transaction PIN and currency
        storedTransactionPIN = data.TransactionPIN;
        senderCurrency = data.Currency;
        senderBalance = data.Balance;
        // console.log(`Transaction PIN for the account: ${storedTransactionPIN}`);
        
        // Change button text to 'Validated'
        validateButton.textContent = 'VALIDATED';
        validateButton.disabled = true; // Disable button to prevent further clicks
        validateButton.style.backgroundColor = 'green';
        validateButton.style.cursor = 'default';
    })
    .catch(error => {
        alert('An Error Occured, Account validation failed');
        // console.error(error.message);
    });
});


// Add event listener for changes to "From Account" input field
document.getElementById('fromAccount').addEventListener('input', function () {
    const validateButton = document.getElementById('validateFrom');
    
    // Reset button text and enable it if the user changes the account number
    validateButton.textContent = 'VALIDATE';
    validateButton.disabled = false;
    validateButton.style.backgroundColor = '';
    validateButton.style.cursor = '';
});


document.getElementById('validateTo').addEventListener('click', function () {
    const toAccount = document.getElementById('toAccount').value;
    const validateButton = document.getElementById('validateTo');
    
    if (!toAccount) {
        alert('Please enter Receiver\'s Account number.');
        return;
    }

    // Make an API call to check if the account exists
    fetch(`http://localhost:8080/tenant/default/User/VALIDATE/ACCOUNT?AccountNumber=${toAccount}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Account not found');
        }
        return response.json();
    })
    .then(data => {
        // Check if the response is empty or no transaction PIN is returned
        if (!data) {
            alert('No Account found with this Account Number');
            return;
        }
        
        // If account exists store the currency
        receiverCurrency = data.Currency;
        receiverBalance = data.Balance;

        // Change button text to 'Validated'
        validateButton.textContent = 'VALIDATED';
        validateButton.disabled = true;
        validateButton.style.backgroundColor = 'green';
        validateButton.style.cursor = 'default';
    })
    .catch(error => {
        alert('An Error Occured, Account validation failed');
        // console.log(error.message);
    });
});


// Add event listener for changes to "From Account" input field
document.getElementById('toAccount').addEventListener('input', function () {
    const validateButton = document.getElementById('validateTo');
    
    // Reset button text and enable it if the user changes the account number
    validateButton.textContent = 'VALIDATE';
    validateButton.disabled = false;
    validateButton.style.backgroundColor = '';
    validateButton.style.cursor = '';
});


// Amount validation (prevent zero or negative values)
const amountInput = document.getElementById('amount');
amountInput.addEventListener('input', function() {
    const amount = parseFloat(amountInput.value);

    if (amount <= 0 ) {
        amountInput.setCustomValidity('Amount must be greater than zero.');
    } else {
        amountInput.setCustomValidity(''); // Clear custom error if the value is valid
    }
});



// Handle form submission
document.getElementById('transferForm').addEventListener('submit', function (event) {
    event.preventDefault();

    if (!storedTransactionPIN || !receiverCurrency) {
        alert('Please validate both Accounts first.');
        return;
    }

    const enteredTransactionPIN = document.getElementById('transactionPIN').value;
    if (enteredTransactionPIN !== storedTransactionPIN) {
        alert('Transaction PIN is incorrect!');
        return;
    }

    const fromAccount = document.getElementById('fromAccount').value;
    const toAccount = document.getElementById('toAccount').value;
    const amount = parseFloat(document.getElementById('amount').value);
    

    // Check if sender's balance is less than the amount they want to send
    if (senderBalance < amount) {
        alert(`Insufficient Balance.\nYour current balance is ${senderBalance} ${senderCurrency}.`);
        return;
    }

    if (senderCurrency !== receiverCurrency) {
        const conversionAPI = `http://localhost:8080/tenant/default/User/CURRENCY/CONVERT?base=${senderCurrency}&symbols=${receiverCurrency}`;

        fetch(conversionAPI, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch currency conversion.');
                }
                return response.json();
            })
            .then((conversionData) => {
                const conversionRate = conversionData.response.jsonDoc.rates[receiverCurrency];
                const convertedAmount = amount * conversionRate;

                senderBalance = senderBalance-amount;
                receiverBalance = receiverBalance+convertedAmount;
                
                updateSenderBalance(fromAccount, senderBalance);
                updateReceiverBalance(toAccount, receiverBalance);
                
            })
            .catch((error) => {
                alert('Currency conversion failed.');
            });
    } else {
        senderBalance = senderBalance-amount;
        receiverBalance = receiverBalance+amount;

        updateSenderBalance(fromAccount, senderBalance);
        updateReceiverBalance(toAccount, receiverBalance);
    }
});


function updateSenderBalance(fromAccount, newAmount) {
    const transferAPI = 'http://localhost:8080/tenant/default/User/TRANSFER';

    const senderUpdateData = {
        AccountNumber: fromAccount,
        Balance: newAmount // update sender's balance
    };

    fetch(transferAPI, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(senderUpdateData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to update sender balance.');
            }
        })
        .catch((error) => {
            // console.error(error.messege);
            alert('Sender balance update failed.');
        });
}

function updateReceiverBalance(toAccount, newAmount) {
    const transferAPI = 'http://localhost:8080/tenant/default/User/TRANSFER';

    const receiverUpdateData = {
        AccountNumber: toAccount,
        Balance: newAmount // update receiver's balance
    };

    fetch(transferAPI, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(receiverUpdateData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to update receiver balance.');
            }
            alert(`Money transferred successfully!\nYour current balance is ${senderBalance} ${senderCurrency}.`);
        })
        .catch((error) => {
            // console.error(error.messege);
            alert('Receiver balance update failed.');
        });
}

