// tsc && node WordCounter.js

import inquirer from "inquirer";

inquirer.prompt([
    {
        name: "para",
        type: "string",
        message: "Enter a Paragraph: "
    }
]).then((obj1)=>{
    let words:number = obj1.para.split(" ").length;
    console.log(`The number of words in the paragraph is ${words}.`);
    let characters:number = obj1.para.replace(/\s/g,'').length;
    console.log(`The number of characters in the paragraph is ${characters}.`);
})