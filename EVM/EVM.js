// tsc && node EVM.js
import inquirer from "inquirer";
import voters from "./voters.json" assert { type: "json" };
import votes from "./votes.json" assert { type: "json" };
import { updateVoters } from "./updateJSON.js";
import { updateVotes } from "./updateJSON.js";
inquirer.prompt([
    {
        name: "cnic",
        type: "number",
        message: "Enter CNIC Number: "
    }
]).then((obj1) => {
    // let indexOfVoter:number = findVoter(voters,obj1.cnic)
    let voter = findVoter(voters, obj1.cnic);
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
                let party = findVote(votes, obj2.vote);
                updateVotes(votes.indexOf(party));
            });
        }
        else {
            console.log("Vote already Casted!");
        }
    }
    else {
        console.log("Invalid CNIC!");
    }
});
let findVoter = (voters, cnic) => {
    for (let i = 0; i < voters.length; i++) {
        if (voters[i].cnic === cnic) {
            return voters[i];
        }
    }
    return -1;
};
let findVote = (votes, party) => {
    for (let i = 0; i < voters.length; i++) {
        if (votes[i].party === party.toLowerCase()) {
            return votes[i];
        }
    }
    return -1;
};
