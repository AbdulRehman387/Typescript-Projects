// tsc && node ToDo_List.js
import inquirer from "inquirer";

let todoList = () => {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add a ToDo",
                "Remove ToDos",
                "View All ToDos",
            ],
        }
    ]).then((obj1) => {
        if (obj1.choice === "Add a ToDo") {
            addTasks(tasks);
        }
        else if (obj1.choice === "Remove ToDos") {
            removeTasks(tasks);
        }
        else if (obj1.choice === "View All ToDos") {
            viewTasks(tasks);
        }
    })
}


let addTasks = (tasks: string[]) => {
    inquirer.prompt([
        {
            name: "task",
            type: "string",
            message: "Write a ToDo: "
        }
    ]).then((obj2) => {
        tasks.push(obj2.task);
        console.log("ToDo Added Successfully!");
        setTimeout(() => {
            todoList();
        }, 1000);
    })
}

let viewTasks = (tasks: string[]) => {
    if (tasks.length !== 0) {
        tasks.forEach((task, i) => {
            console.log(`${i + 1}.${task}`);
        })
        inquirer.prompt([
            {
                name: "Enter",
                type: "input",
                message: " "
            }
        ]).then(() => {
            setTimeout(() => {
                todoList();
            }, 1000);
        })
    }
    else{
        console.log("ToDo List Empty");
        setTimeout(() => {
            todoList();
        }, 1000);
    }
}

let removeTasks = (tasks: string[]) => {
    if (tasks.length !== 0) {
        inquirer.prompt([
            {
                name: "choice",
                type: "checkbox",
                message: "Select ToDos to remove!",
                choices: tasks
            }
        ]).then((obj3) => {
            if (obj3.choice.length !== 0) {
                for (let i = 0; i < obj3.choice.length; i++) {
                    tasks.splice(tasks.indexOf(obj3.choice[i]), 1)
                }
                console.log("ToDos Removed Successfully!");
                setTimeout(() => {
                    todoList();
                }, 1000);
            }
            else {
                console.log("Nothing Selected");
                setTimeout(() => {
                    todoList();
                }, 1000);
            }
        })
    }
    else {
        console.log("ToDo List Empty!");
        setTimeout(() => {
            todoList();
        }, 1000);

    }
}

let tasks: string[] = [];
todoList()