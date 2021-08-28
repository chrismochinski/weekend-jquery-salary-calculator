console.log('JS ready');

$(document).ready(readyNow);

function readyNow() {
    console.log('JQ ready');
    $('#submitButton').on('click', appendEmployee);
}

function appendEmployee () { //function to append employee info to table
    console.log('in appendEmployee function');

        //create variables to pull in input field
    let firstName = $('#firstNameInput').val();
    let lastName = $('#lastNameInput').val();
    let title = $('#titleInput').val();
    let employeeID = $('#employeeIDInput').val();
    let salary = $('#salaryInput').val();

        //log input field results as they'll show on the DOM
    console.log(lastName + ',' ,firstName,'-', title,'-', employeeID,'-', salary);

        //append employee info to DOM
    $('#employeeTableBody').append(`
        <tr><td>${lastName}, ${firstName}</td><td>${title}</td><td>${employeeID}</td><td>$${salary}</td><td><button class="deleteButton">Delete</button></td></tr>`)

        //clear input fields
    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#titleInput').val('');
    $('#employeeIDInput').val('');
    $('#salaryInput').val('');
runningTotal(parseInt(salary));
}
let runningCost = 0; //starting point for the total cost at bottom

function runningTotal(runningTotal) { //function pulls in the input SALARY and calcs running total
    console.log('in runningTotal function'); //quick log
    runningCost += runningTotal;
    $('#totalCostOutput').text(`$${runningCost}`);
    
}