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

const token = 'RDJnjlX3wdjJbDZrJ04Jc6KG9KzqOskEIpWGFbpFt+IOMifPmWLjOpTWyGaaaUKiV3BxbNlJX/gxUorMejlg7kgboALB2lkPGwDOSYrJw5wNM9YpNMe7uPoP42hxnqB32LR7k5cdReUILlwbqGxBKhdYcoRWSKIHHFHt7BBpwiWRPiDh7fz6JSPIP2Vc/HcmzeDFJRrBUZbfnNbpLTcaaXRyVETvxR9s58M7f9oTogNlAQkILvnIHNMDgphwrr90wwecPrEn5h/lpX63wf4BCQz4w7zaT+DHTVod4xD/x0SKZzENxjIxgW4MgsTuedbPRqLV1dK7KO/H1mp0TT9MZRgD+Fv41SKFTYN1ZVVrchZlqwGKvZZ7e7g0vQcF3XPR2dzv1rr3vSFZ4ay+aqeeup2uEy/RQLkkYJSvyETiL26EQadZeD2m1OEHXpTB6HT7pOwIp3haf6pMfi5qA1oLHRtH+RlnpclWy4lneDo7FmAd9kwdjEvK5Hj1aCNZuPs6tGFjOKcebfzcJCca//r0y9vJ8/vwreLw/4TwRvdMFW5VScpbzgL3bLqlGQIYYYvZNP0/LfzHZ4PjLm+5YwzCTIzJK3mOZxJvqma3UM/MBVpiC4W4zIWbWVxWYue+vBraJ3w54VRPW5SCBBM9FPcqu63XLtnjCgx5JtizOXF4h98=';

document.getElementById('validateFrom').addEventListener('click', function () {
    const fromAccount = document.getElementById('fromAccount').value;
    const validateButton = document.getElementById('validateFrom');
    
    if (!fromAccount) {
        alert('Please enter Sender\'s Account number.');
        return;
    }

    // Make an API call to check if the account exists
    fetch(`http://localhost:8080/tenant/default/packages.DataBase.api.ValidateAccount.main?AccountNumber=${fromAccount}`, {
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
    fetch(`http://localhost:8080/tenant/default/packages.DataBase.api.ValidateAccount.main?AccountNumber=${toAccount}`, {
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


let senderFinalBalance=1;

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

    if (amount <= 0) {
        alert(amount === 0 ? 'Amount cannot be 0' : 'Amount cannot be negative');
        return;
    }
    

    // Check if sender's balance is less than the amount they want to send
    if (senderBalance < amount) {
        alert(`Insufficient Balance.\nYour current balance is ${senderBalance} ${senderCurrency}.`);
        return;
    }

    if (senderCurrency !== receiverCurrency) {
        const conversionAPI = `http://localhost:8080/tenant/default/packages.DataBase.api.currencyConversion.main?base=${senderCurrency}&symbols=${receiverCurrency}`;

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

                senderFinalBalance = senderBalance-amount;

                updateSenderBalance(fromAccount, senderFinalBalance);
                updateReceiverBalance(toAccount, receiverBalance+convertedAmount);
            })
            .catch((error) => {
                alert('Currency conversion failed.');
            });
    } else {
        updateSenderBalance(fromAccount, senderBalance-amount);
        updateReceiverBalance(toAccount, receiverBalance+amount);
    }
});


function updateSenderBalance(fromAccount, amount) {
    const transferAPI = 'http://localhost:8080/tenant/default/packages.DataBase.api.updateBalanceAPI.main';

    const senderUpdateData = {
        AccountNumber: fromAccount,
        Balance: amount // update sender's balance
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

function updateReceiverBalance(toAccount, amount) {
    const transferAPI = 'http://localhost:8080/tenant/default/packages.DataBase.api.updateBalanceAPI.main';

    const receiverUpdateData = {
        AccountNumber: toAccount,
        Balance: amount // update receiver's balance
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
            alert(`Money transferred successfully!\nYour current balance is ${senderFinalBalance} ${senderCurrency}.`);
        })
        .catch((error) => {
            // console.error(error.messege);
            alert('Receiver balance update failed.');
        });
}

