import * as fs from 'fs';
export let updateVoters = (i: number, updateData: boolean) => {
    const filePath = './voters.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
        let voters = JSON.parse(data);
        voters[i].isVoteCasted = updateData;
        fs.writeFile(filePath, JSON.stringify(voters, null, 2), 'utf8', (writeErr) => {
        });
    });
}
export let updateVotes = (i: number) => {
    const filePath = './votes.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
        let votes = JSON.parse(data);
        votes[i].votes += 1;
        fs.writeFile(filePath, JSON.stringify(votes, null, 2), 'utf8', (writeErr) => {
        });
    });
}