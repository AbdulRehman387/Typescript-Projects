// tsc && node CurrencyConverter.js
import rates from './rates.json' assert { type: "json" };
import inquirer from "inquirer";
let currency = ["PKR", "USDT", "EURO", "INR"];
inquirer.prompt([
    {
        name: "curToCon",
        type: "list",
        choices: currency,
        message: "Select Currency to Convert",
    }
]).then((obj1) => {
    currency = currency.filter((cur) => {
        if (cur !== obj1.curToCon) {
            return cur;
        }
    });
    inquirer.prompt([
        {
            name: "reqCur",
            type: "list",
            choices: currency,
            message: "Select required Currency"
        },
        {
            name: "amount",
            type: "number",
            message: "Enter amount to convert: "
        },
    ]).then((obj2) => {
        if (obj1.curToCon === "PKR") {
            console.log(`${obj2.amount} ${obj1.curToCon} = ${PKR(obj2.reqCur, obj2.amount, rates.ratesWrtPkr)} ${obj2.reqCur}`);
        }
        else if (obj1.curToCon === "USDT") {
            console.log(`${obj2.amount} ${obj1.curToCon} = ${USDT(obj2.reqCur, obj2.amount, rates.ratesWrtUsdt)} ${obj2.reqCur}`);
        }
        else if (obj1.curToCon === "EURO") {
            console.log(`${obj2.amount} ${obj1.curToCon} = ${EURO(obj2.reqCur, obj2.amount, rates.ratesWrtEuro)} ${obj2.reqCur}`);
        }
        else if (obj1.curToCon === "INR") {
            console.log(`${obj2.amount} ${obj1.curToCon} = ${INR(obj2.reqCur, obj2.amount, rates.ratesWrtInr)} ${obj2.reqCur}`);
        }
    });
});
let PKR = (currency, amount, rates) => {
    if (currency === "USDT") {
        return amount * rates.usdt;
    }
    else if (currency === "EURO") {
        return amount * rates.euro;
    }
    else if (currency === "INR") {
        return amount * rates.inr;
    }
};
let USDT = (currency, amount, rates) => {
    if (currency === "PKR") {
        return amount * rates.pkr;
    }
    else if (currency === "EURO") {
        return amount * rates.euro;
    }
    else if (currency === "INR") {
        return amount * rates.inr;
    }
};
let EURO = (currency, amount, rates) => {
    if (currency === "PKR") {
        return amount * rates.pkr;
    }
    else if (currency === "USDT") {
        return amount * rates.usdt;
    }
    else if (currency === "INR") {
        return amount * rates.inr;
    }
};
let INR = (currency, amount, rates) => {
    if (currency === "PKR") {
        return amount * rates.pkr;
    }
    else if (currency === "USDT") {
        return amount * rates.usdt;
    }
    else if (currency === "EURO") {
        return amount * rates.euro;
    }
};
