// tsc && node Calculator.js
import inquirer from "inquirer";
inquirer.prompt([
    {
        name: "num1",
        type: "number",
        message: "Enter 1st Number: "
    },
    {
        name: "operator",
        message: "Choose Operator: ",
        type: "list",
        choices: ["+", "-", "*", "/"],
    },
    {
        name: "num2",
        type: "number",
        message: "Enter 2nd Number: "
    }
]).then((answers) => {
    switch (answers.operator) {
        case "+":{ // For Addition
            console.log(`Answer is ${answers.num1 + answers.num2}`);
        }
            break;
        case "-":{ // For Subtraction
            console.log(`Answer is ${answers.num1 - answers.num2}`);
        }
            break;
        case "*":{ // For Multiplication
            console.log(`Answer is ${answers.num1 * answers.num2}`);
        }
            break;
        case "/":{ // For Division
            console.log(`Answer is ${answers.num1 / answers.num2}`);
        }
            break;
    }
})