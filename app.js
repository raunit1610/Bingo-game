var user_list = [];
var system_list = [];
var userPoints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
var systemPoints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

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
    var com_input = generateValidInput();
    processSystemInput(com_input);
}

function processUserInput(input) {
    var userFound = false;
    for (var i = 0; i < 25; i++) {
        if (input == user_list[i]) {
            user_list.splice(i, 1, 0);
            system_list.push(input);
            sum1 += 1;
            userFound = true;
            break;
        }
    }
    if (!userFound) {
        updateResult("Either Already used, or Not Available!!");
    }

    updateTable('userTable', user_list);
    checkWinner(); // Check for the winner after user's turn
}

function generateValidInput() {
    var com_input;
    do {
        com_input = Math.floor(Math.random() * 25) + 1;
    } while (system_list.includes(com_input));
    return com_input;
}

function processSystemInput(input) {
    var systemFound = false;
    for (var i = 0; i < 25; i++) {
        if (input == system_list[i]) {
            system_list.splice(i, 1, 0);
            sum2 += 1;
            systemFound = true;
            break;
        }
    }
    
    if (!systemFound) {
        updateResult("System Error: Invalid Input!!");
    }

    updateTable('systemTable', system_list);
    checkWinner(); // Check for the winner after system's turn
}

function checkWinner() {
    if ((sum1 == 5) || (sum1 == 11) || (sum1 == 13)) {
        updateResult("Player Won!!");
    } else if ((sum2 == 5) || (sum2 == 11) || (sum2 == 13)) {
        updateResult("System Won!!");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    createTable('userTable', userPoints);
    createTable('systemTable', systemPoints);
});
