// tsc && node ATM.js
import { updateData } from "./updateJSON.js";
import accounts from "./accounts.json" assert { type: "json" };
import inquirer from "inquirer";
let accNumInput = (accounts) => {
    console.log("Welcome to HBL!");
    inquirer.prompt([
        {
            type: "number",
            name: "accNum",
            message: "Enter your Account Number: "
        }
    ]).then((obj1) => {
        let i = accVerify(obj1.accNum);
        let counter = 0;
        let remAtt = 5;
        if (i >= 0) {
            pinCheck(i, counter, remAtt);
        }
        else if (i < 0) {
            console.log("Invalid Account number!");
        }
    });
};
// Funtion to verify if account exist in database
let accVerify = (accNum) => {
    for (let i = 0; i < accounts.length; i++) {
        if (accNum === accounts[i].accNum) {
            return i;
        }
    }
    return -1;
};
// Funtion to Withdraw Money
let withdrawMoney = (i) => {
    inquirer.prompt([
        {
            type: "number",
            name: "amount",
            message: "Enter Amount: "
        }
    ]).then((obj4) => {
        if (obj4.amount <= accounts[i].balance) {
            accounts[i].balance -= obj4.amount;
            updateData(i, accounts[i].balance);
            setTimeout(() => {
                console.log("Withdrawal Success!");
                console.log("Remaining balance = ", accounts[i].balance);
            }, 1000);
        }
        else {
            console.log("Insufficient Balance!");
        }
    });
};
// Function to Transfer Money
let transferMoney = (i) => {
    inquirer.prompt([
        {
            name: "accNum",
            type: "number",
            message: "Enter Account Number: "
        }
    ]).then((obj4) => {
        let j = accVerify(obj4.accNum);
        if (j >= 0) {
            inquirer.prompt([
                {
                    type: "number",
                    name: "amount",
                    message: "Enter Amount: "
                }
            ]).then((obj5) => {
                console.log("Name: ", accounts[j].name);
                console.log("Account no: ", accounts[j].accNum);
                console.log("Amount to transfer: ", obj5.amount);
                inquirer.prompt([
                    {
                        name: "confirm",
                        type: "confirm",
                        message: "Confirm transaction?"
                    }
                ]).then((obj6) => {
                    if (obj5.amount <= accounts[i].balance) {
                        if (obj6.confirm === true) {
                            accounts[i].balance -= obj5.amount;
                            accounts[j].balance += obj5.amount;
                            updateData(i, accounts[i].balance, j, accounts[j].balance);
                            setTimeout(() => {
                                console.log("Transaction Successful!");
                                console.log("Remaining balance: ", accounts[i].balance);
                            }, 1000);
                        }
                        else {
                            console.log("Transaction Cancelled!");
                        }
                    }
                    else {
                        console.log("Insufficient Balance!");
                    }
                });
            });
        }
        else if (j < 0) {
            console.log("Invalid Account Number!");
            setTimeout(() => {
                transferMoney(i);
            }, 1000);
        }
    });
};
// Funtion to match PIN
let pinCheck = (i, counter, remAtt) => {
    inquirer.prompt([
        {
            type: "number",
            name: "pin",
            message: "Enter PIN: "
        }
    ]).then((obj2) => {
        if (obj2.pin === accounts[i].pin) {
            console.log("Login Success!");
            inquirer.prompt([
                {
                    name: "choice",
                    type: "list",
                    choices: ["Withdraw Cash", "Transfer Money", "Check Balance"],
                    message: "Select the Service: "
                }
            ]).then((obj3) => {
                if (obj3.choice === "Withdraw Cash") {
                    return withdrawMoney(i);
                }
                else if (obj3.choice === "Transfer Money") {
                    return transferMoney(i);
                }
                else if (obj3.choice === "Check Balance") {
                    return checkBalance(i);
                }
            });
        }
        else {
            console.log("Wrong PIN!");
            counter++;
            if (counter < 5) {
                setTimeout(() => {
                    console.log("Remaining Attemps: ", --remAtt);
                    return pinCheck(i, counter, remAtt);
                }, 1000);
            }
            else {
                setTimeout(() => {
                    console.log("Too many Wrong Attempts");
                }, 1000);
            }
        }
    });
};
// Function to Check Balance
let checkBalance = (i) => {
    console.log("Your Balance is RS ", accounts[i].balance);
};
accNumInput(accounts);
