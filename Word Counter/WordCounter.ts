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































// class WordCounter {
//     private text: string;
    
//     constructor(text: string) { 
//         this.text = text;   
//     }
  
//     countWords(): number{
//       return this.text.split(" ").length;
//     }
// }

// const wordCountObj = new WordCounter(para);
// console.log(`Number of words in the paragraph : ${wordCountObj.countWords()}`);