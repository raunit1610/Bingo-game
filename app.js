// app.js

var user_list = [];
var system_list = [];
var userPoints = [1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1];
var systemPoints = [1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1];
var log = [];

var sum1 = 0;
var sum2 = 0;

function createTable(tableId, pointsArray) 
{
    var table = document.getElementById(tableId);
    for (var i = 0; i < 5; i++) 
    {
        var row = table.insertRow();
        for (var j = 0; j < 5; j++) 
        {
            var cell = row.insertCell();
            cell.innerHTML = pointsArray[i * 5 + j];
        }
    }
}

function updateTable(tableId, numbersArray) 
{
    var table = document.getElementById(tableId);
    table.innerHTML = "";
    for (var i = 0; i < 5; i++) 
    {
        var row = table.insertRow();
        for (var j = 0; j < 5; j++) 
        {
            var cell = row.insertCell();
            cell.innerHTML = numbersArray[i * 5 + j];
        }
    }
}

function updateResult(result) 
{
    console.log(result);
    document.getElementById('result').innerText = result;
}

function updateLog() 
{
    var logContainer = document.getElementById('log');
    logContainer.innerHTML = log.join('<br>');
}

function getUserInput() {
    var input = prompt("Enter Your Input (1-25): ");
    if (input !== null) 
    {
        processUserInput(input);
    }
}

function processUserInput(input) 
{
    var userFound = false;
    for (var i = 0; i < 25; i++) 
    {
        if (input == user_list[i]) 
        {
            user_list.splice(i, 1, 0);
            system_list.push(input);
            sum1 += userPoints[i];
            userFound = true;
            break;
        }
    }

    if (!userFound) 
    {
        updateResult("Either Already used, or Not Available!!");
        getUserInput();
        return;
    }

    log.push("Player Entered: " + input);
    updateLog();

    if ((sum1 == 25) || (sum1 == 32) || (sum1 == 37)) 
    {
        updateResult("Player Won!!");
        return;
    }

    updateTable('userTable', user_list);
    systemTurn();
}

function systemTurn() 
{
    setTimeout(function () {
        var com_input = Math.floor(Math.random() * 25) + 1;
        processSystemInput(com_input);
    }, 1000);
}

function processSystemInput(com_input) 
{
    var userFound = false;
    for (var i = 0; i < 25; i++) 
    {
        if (com_input == user_list[i]) 
        {
            user_list.splice(i, 1, 0);
            system_list.push(com_input);
            sum2 += systemPoints[i];
            userFound = true;
            break;
        }
    }

    if (!userFound) 
    {
        updateResult("System Error: Invalid Input!!");
        systemTurn();
        return;
    }

    log.push("System Entered: " + com_input);
    updateLog();

    if ((sum2 == 25) || (sum2 == 32) || (sum2 == 37)) 
    {
        updateResult("System Won!!");
        return;
    }

    updateTable('systemTable', system_list);
}

document.addEventListener('DOMContentLoaded', function () {
    createTable('userTable', userPoints);
    createTable('systemTable', systemPoints);
});
