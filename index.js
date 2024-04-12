#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Todo list array
let todoList = [];
// Function to display todo list
function displayTodoList() {
    console.log(chalk.bold.green("\nYour Todo List:"));
    if (todoList.length === 0) {
        console.log(chalk.yellow("No tasks found."));
    }
    else {
        todoList.forEach((task, index) => {
            console.log(chalk.blue(`${index + 1}. ${task}`));
        });
    }
}
// Function to add a task to the todo list
function addTask() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "task",
            message: "Enter the task:",
        }
    ])
        .then((answers) => {
        todoList.push(answers.task);
        console.log(chalk.green("Task added successfully!"));
        displayTodoList();
        menu();
    });
}
// Function to delete a task from the todo list
function deleteTask() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "taskIndex",
            message: "Enter the index of the task to delete:",
            validate: function (value) {
                return !isNaN(parseInt(value)) && parseInt(value) > 0 && parseInt(value) <= todoList.length;
            }
        }
    ])
        .then((answers) => {
        const index = parseInt(answers.taskIndex) - 1;
        todoList.splice(index, 1);
        console.log(chalk.green("Task deleted successfully!"));
        displayTodoList();
        menu();
    });
}
// Function to update a task in the todo list
function updateTask() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "taskIndex",
            message: "Enter the index of the task to update:",
            validate: function (value) {
                return !isNaN(parseInt(value)) && parseInt(value) > 0 && parseInt(value) <= todoList.length;
            }
        },
        {
            type: "input",
            name: "newTask",
            message: "Enter the updated task:",
        }
    ])
        .then((answers) => {
        const index = parseInt(answers.taskIndex) - 1;
        todoList[index] = answers.newTask;
        console.log(chalk.green("Task updated successfully!"));
        displayTodoList();
        menu();
    });
}
// Main menu function
function menu() {
    inquirer
        .prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["Add a task", "Delete a task", "Update a task", "View tasks", "Exit"]
        }
    ])
        .then((answers) => {
        switch (answers.action) {
            case "Add a task":
                addTask();
                break;
            case "Delete a task":
                deleteTask();
                break;
            case "Update a task":
                updateTask();
                break;
            case "View tasks":
                displayTodoList();
                menu();
                break;
            case "Exit":
                console.log(chalk.yellow("Exiting Todo List..."));
                break;
        }
    });
}
// Start the program
console.log(chalk.bold.cyan("Welcome to Todo List App!\n"));
menu();
