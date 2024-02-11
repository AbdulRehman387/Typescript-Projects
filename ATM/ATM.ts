// tsc && node ATM.js
import inquirer from "inquirer";

let accNumInput = (accounts:{}[])=>{
    console.log("Welcome to HBL!");
    inquirer.prompt([
        {
            type: "number",
        name: "accNum",
        message: "Enter your Account Number: "
    }
]).then((obj1) => {
    let i: number = accVerify(obj1.accNum);
    let counter:number = 0;
    let remAtt:number = 5;
    if (i >= 0) {
        pinCheck(i,counter,remAtt);
    }
    else if (i < 0) {
        console.log("Invalid Account number!");
    }
})
}

// Funtion to verify if account exist in database
let accVerify = (accNum: number): number => {
    for (let i = 0; i < accounts.length; i++) {
        if (accNum === accounts[i].accNum) {
            return i;
            
        }
    }
    return -1;
}

// Funtion to Withdraw Money
let withdrawMoney = (i:number)=>{
    inquirer.prompt([
        {
            type: "number",
            name: "amount",
            message: "Enter Amount: "
        }
    ]).then((obj4) => {
        if (obj4.amount <= accounts[i].balance) {
            accounts[i].balance -= obj4.amount;
            console.log("Withdrawal Success!");
            console.log("Remaining balance = ", accounts[i].balance);
            setTimeout(() => {
                accNumInput(accounts)
            }, 1000);
            
        } else {
            console.log("Insufficient Balance!");
            setTimeout(() => {
                accNumInput(accounts)
            }, 1000);
        }
    })
}

// Function to Transfer Money
let transferMoney = (i:number)=>{
    inquirer.prompt([
        {
            name: "accNum",
            type: "number",
            message: "Enter Account Number: "
        }
    ]).then((obj4) => {
        let j: number = accVerify(obj4.accNum);
        if (j >= 0) {
            inquirer.prompt([
                {
                    type: "number",
                    name: "amount",
                    message: "Enter Amount: "
                }
            ]).then((obj5) => {
                console.log("Name: ",accounts[j].name);
                console.log("Account no: ",accounts[j].accNum);
                console.log("Amount to transfer: ",obj5.amount);
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
                            console.log("Transaction Successful!")
                            console.log("Remaining balance: ",accounts[i].balance)
                            setTimeout(() => {
                                accNumInput(accounts)
                            }, 1000);
                        }
                        else {
                            console.log("Transaction Cancelled!")
                            setTimeout(() => {
                                accNumInput(accounts)
                            }, 1000);
                        }
                    }
                    else{
                        console.log("Insufficient Balance!")
                        setTimeout(() => {
                            accNumInput(accounts)
                        }, 1000);
                    }
                })
            })

        }
        else if (j < 0) {
            console.log("Invalid Account Number!");
            setTimeout(() => {
                accNumInput(accounts)
            }, 1000);
        }
    })
}

// Funtion to match PIN
let pinCheck = (i:number,counter:number,remAtt:number):number | void=>{
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
        })
    }
    else {
        console.log("Wrong PIN!");
        counter++;
        if (counter < 5) {   
            setTimeout(() => {
                console.log("Remaining Attemps: ",--remAtt);
                return pinCheck(i,counter,remAtt);
            }, 1000);
        }
        else{
            setTimeout(() => {
                console.log("Too many Wrong Attempts");
            }, 1000);
            setTimeout(() => {
                accNumInput(accounts)
            }, 1000);
        }
    }
})
}

// Function to Check Balance
let checkBalance = (i:number)=>{
    console.log("Your Balance is RS ",accounts[i].balance);
    setTimeout(() => {
        accNumInput(accounts);
    }, 1000);
    
}

let accounts: {
    name: string
    accNum: number,
    pin: number,
    balance: number
}[] = [
    {
        name: "Umer",
        accNum: 1,
        pin: 11,
        balance: 3500
    },
    {
        name: "Saim",
        accNum: 2,
        pin: 12,
        balance: 3500
    },
    {
        name: "Ahmad",
        accNum: 3,
        pin: 13,
        balance: 3500
    }
];
accNumInput(accounts);