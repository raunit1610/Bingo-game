var user_list = [];
var system_list = [];
var points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

for (var i = 0; i < 25; i++) {
    user_list[i] = i + 1;
}

var sum1 = 0;
var sum2 = 0;

function createTable(tableId, numbersArray) {
    var table = document.getElementById(tableId);
    for (var i = 0; i < 5; i++) {
        var row = table.insertRow();
        for (var j = 0; j < 5; j++) {
            var cell = row.insertCell();
            cell.innerHTML = numbersArray[i * 5 + j];
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
    document.getElementById('result').innerText = result;
}

function getUserInput() {
    var input = prompt("Enter Your Input (1-25): ");
    processUserInput(input);
}

function systemTurn() {
    var com_input = Math.floor(Math.random() * 25) + 1;
    processSystemInput(com_input);
}

function processUserInput(input) {
    var userFound = false;
    for (var i = 0; i < 25; i++) {
        if (input == user_list[i]) {
            user_list.splice(i, 1, 0);
            system_list.push(input);
            sum1 += points[i]; 
            userFound = true;
            break;
        }
    }
    if (!userFound) {
        updateResult("Either Already used, or Not Available!!");
    }

    if ((sum1 == 25) || (sum1 == 32) || (sum1 == 37)) {
        updateResult("Player Won!!");
    } else {
        updateTable('userTable', user_list);
        systemTurn();
    }
}

function processSystemInput(input) {
    var systemFound = false;
    for (var i = 0; i < 25; i++) {
        if (input == system_list[i]) {
            system_list.splice(i, 1, 0);
            sum2 += points[i]; 
            systemFound = true;
            break;
        }
    }
    if (!systemFound) {
        updateResult("System Error: Invalid Input!!");
    }

    if ((sum2 == 25) || (sum2 == 32) || (sum2 == 37)) {
        updateResult("System Won!!");
    } else {
        updateTable('systemTable', system_list);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    createTable('userTable', user_list);
    createTable('systemTable', system_list);
});
