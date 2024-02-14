// tsc && node EVM.js
import inquirer from "inquirer";
import voters from "./voters.json" assert {type: "json"};
import votes from "./votes.json" assert {type: "json"};
import {updateVoters} from "./updateJSON.js";
import { updateVotes } from "./updateJSON.js";

type voters = {
    cnic: number,
    name: string,
    isVoteCasted: boolean
}
type party = {
    party: string,
    votes: number
}

inquirer.prompt([
    {
        name: "cnic",
        type: "number",
        message: "Enter CNIC Number: "
    }
]).then((obj1) => {
    let voter:any = findVoter(voters,obj1.cnic);
    if (voter !== -1) {
        if (!(voter.isVoteCasted)) {
            inquirer.prompt([
                {
                    name: "vote",
                    type: "list",
                    message: "Select your Party",
                    choices: ["PTI", "PMLN", "PPPP"]
                }
            ]).then((obj2) => {
                console.log("Vote Casted!");
                updateVoters(voters.indexOf(voter), true);
                let party:any = findParty(votes,obj2.vote)
                updateVotes(votes.indexOf(party))
            })
        }
        else{
            console.log("Vote already Casted!");
        }
    }
    else {
        console.log("Invalid CNIC!");
    }

})

// Function to find if CNIC exists in database
let findVoter = (voters:voters[],cnic:number):voters | number=>{
    for (let i = 0; i < voters.length; i++) {
        if (voters[i].cnic === cnic) {
            return voters[i];
        }
    }
    return -1;
}

// Function to find Party
let findParty = (votes:party[],party:string):party | number=>{
    for (let i = 0; i < voters.length; i++) {
        if (votes[i].party === party.toLowerCase()) {
            return votes[i];
        }
    }
    return -1;
}
