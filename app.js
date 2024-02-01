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
    var com_input = Math.floor(Math.random() * 25) + 1;
    processUserInput(com_input);
}

function processUserInput(input) {
    var userFound = false;
    for (var i = 0; i < 25; i++) {
        if (input == user_list[i]) {
            user_list.splice(i, 1, 0);
            system_list.push(input);
            sum1 += 1; // sum1 should increment by 1 for each valid input
            userFound = true;
            break;
        }
    }
    if (!userFound) {
        updateResult("Either Already used, or Not Available!!");
    }

    if ((sum1 == 5) || (sum1 == 11) || (sum1 == 13)) {
        updateResult("Player Won!!");
    } else {
        updateTable('userTable', user_list);
        systemTurn(); // Automatically trigger the system's turn after the user's turn
    }
}

document.addEventListener('DOMContentLoaded', function () {
    createTable('userTable', user_list);
    createTable('systemTable', system_list);
});

// Initialize the system's table with numbers 1-25
updateTable('systemTable', system_list);
