
# Wired Transfer System

A full-stack web application for creating accounts and handling money transfers, including cross-currency transactions.

## Frontend
The frontend consists of 2 webpages:

#### Create New Account Page

![Screenshot (923)](https://github.com/user-attachments/assets/35ede743-63c5-42f3-bf4c-addce5d84b73)
- Users can create a new account by entering the required details.
- No Future DOBs and negative initial balance allowed.
- Transaction PIN must be of atleast 6 characters.
- Files - index.html, style1.css, script1.js

#### Money Transfer Page

![Screenshot (924)](https://github.com/user-attachments/assets/a97850bc-29c1-4c36-b52e-7663141da744)
- Validates account numbers and ensures sufficient balance before processing.
- Allows users to transfer money between accounts, supporting both same-currency and cross-currency transactions.
- Files - money-transfer.html, style1.css, script1.js

## API Development with Syncloop
For backend development, I used the Syncloop platform to create APIs for account management and money transfers.

<img width="133" alt="Capture" src="https://github.com/user-attachments/assets/24964e0c-82bb-4dbe-94f2-2dab98a023bb" />

#### Workflow
1. Connected Syncloop to the local MySQL database using mySQLconnection.jdbc.
2. Wrote the required DML and DQL SQL queries.
3. Integrated these SQL services into the following APIs (except currencyConversion):

#### APIs for Account Creation Page
addAccounts: Adds a new account to the accounts table in the database.
#### APIs for Money Transfer Page
- ValidateAccount: Verifies if the entered account number exists in the database.
- currencyConversion:Handles currency conversion if the sender's and receiver's currencies differ. Utilizes the Frankfurter API (a free, open-source currency data API) inside Syncloop.
- updateBalanceAPI: Updates the balances of both sender and receiver when 'transfer' is clicked.

## Database
The MySQL database used for this project contains a single table called "accounts" with the following structure:

<img width="507" alt="dataphoto" src="https://github.com/user-attachments/assets/ba6efb32-60e7-4fc9-8dcb-e536b9caa185" />

## Features
- Create and manage accounts.
- Transfer money between accounts with real-time validations.
- Support for cross-currency transactions.
- Fully integrated frontend and backend with database storage.
