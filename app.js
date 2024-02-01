// app.js

var user_list = [];
var system_list = [];
var userPoints = [1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 3, 5, 3, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1];
var systemPoints = [1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 3, 5, 3, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1];

for (var i = 0; i < 25; i++) {
    user_list[i] = i + 1;
}

var sum1 = 0;
var sum2 = 0;

function createTable(tableId, pointsArray) {
    var table = document.getElementById(tableId);
    for (var i = 0; i < 5; i++) {
        var row = table.insertRow();
        for (var j = 0; j < 5; j++) {
            var cell = row.insertCell();
            cell.innerHTML = pointsArray[i * 5 + j];
        }
    }
}

function updateTable(tableId, numbersArray) {
    var table = document.getElementById(tableId);
    table.innerHTML = "";
    for (var i = 0; i < 5; i++) {
        var row = table.insertRow();
        for (var j = 0; j < 5; j++) {
            var cell = row.insertCell();
            cell.innerHTML = numbersArray[i * 5 + j];
        }
    }
}

function updateResult(result) {
    console.log(result);
}

function getUserInput(input) {
    processUserInput(input);
}

function processUserInput(input) {
    var userFound = false;
    for (var i = 0; i < 25; i++) {
        if (input == user_list[i]) {
            user_list.splice(i, 1, 0);
            system_list.push(input);
            sum1 += userPoints[i];
            userFound = true;
            break;
        }
    }
    if (!userFound) {
        updateResult("Either Already used, or Not Available!!");
        return; // Add a return statement here to prevent the system's turn logic from executing
    }

    if ((sum1 == 5) || (sum1 == 11) || (sum1 == 13)) {
        updateResult("Player Won!!");
    } else {
        updateTable('userTable', user_list);
        systemTurn(); // Call the function to initiate the system's turn
    }
}

function systemTurn() {
    var com_input = Math.floor(Math.random() * 25) + 1;
    console.log(com_input)
    processSystemInput(com_input);
}

function processSystemInput(com_input) {
    var systemFound = false;
    for (var i = 0; i < 25; i++) {
        if (com_input == user_list[i]) {
            user_list.splice(i, 1, 0);
            system_list.push(com_input);
            sum2 += systemPoints[i];
            updateResult("System Entered: " + com_input);
            systemTurn(); // Call the function recursively for the next system's turn
            systemFound = true;
            break;
        }
    }

    if (!systemFound) {
        updateResult("System Error: Invalid Input!!");
        return; // Add a return statement here to prevent further processing
    }

    if ((sum2 == 5) || (sum2 == 11) || (sum2 == 13)) {
        updateResult("System Won!!");
    } else {
        updateTable('systemTable', system_list);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    createTable('userTable', userPoints);
    createTable('systemTable', systemPoints);
});

