// tsc && node Game.js
import inquirer from "inquirer";
// Function for getting random number
let getRandomInt = (min, max) => {
    let randomNum;
    randomNum = Math.round(Math.random() * max);
    if (randomNum >= min && randomNum <= max) {
        return randomNum;
    }
    return getRandomInt(1, 10);
};
// Function for number guessing game
let game = () => {
    inquirer.prompt([
        {
            name: "guess",
            type: "number",
            message: "Guess a number between 1 and 10: "
        }
    ]).then((obj1) => {
        if (obj1.guess >= 1 && obj1.guess <= 10) {
            inquirer.prompt([
                {
                    name: "confirm",
                    type: "confirm",
                    message: "Should we lock it?"
                }
            ]).then((obj2) => {
                if (obj2.confirm === true) {
                    if (obj1.guess === getRandomInt(1, 10)) {
                        console.log("You got it!");
                        score += 10;
                        setTimeout(() => {
                            playAgain(score);
                        }, 1000);
                    }
                    else {
                        console.log("Wrong!");
                        setTimeout(() => {
                            playAgain(score);
                        }, 1000);
                    }
                }
                else {
                    game();
                }
            });
        }
        else if (isNaN(obj1.guess)) {
            console.log("Number is not valid!");
            setTimeout(() => {
                game();
            }, 1000);
        }
        else {
            console.log("Number is not between 1 and 10!");
            setTimeout(() => {
                game();
            }, 1000);
        }
    });
};
// Function for playing again
let playAgain = (score) => {
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Would you like to play again?"
        }
    ])
        .then((obj3) => {
        if (obj3.confirm === true) {
            game();
        }
        else {
            console.log("Your score is", score);
            console.log("Thanks for playing!");
        }
    });
};
// Main Program
let score = 0;
inquirer.prompt([
    {
        name: "play",
        type: "confirm",
        message: "Are you ready to play a number guessing game?"
    }
])
    .then((obj4) => {
    if (obj4.play === true) {
        game();
    }
    else {
        console.log("Goodbye!");
    }
});
