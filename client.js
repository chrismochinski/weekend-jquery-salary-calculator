console.log('JS ready');

$(document).ready(readyNow);

function readyNow() {
    console.log('JQ ready');
    $('.deleteButton').on('click', deleteRow);
    $('.appendTable').on('click', 'deleteButton', deleteRow);
    $('#submitButton').on('click', appendEmployee);
}

function appendEmployee() {
    console.log('in appendEmployee function (did you click submit?');
    inputEmployee($('#firstNameInput').val(), $('#lastNameInput').val(), $('#titleInput').val(), $('#employeeIDInput').val(), $('#salaryInput').val());

}

employeeArray = [];

function inputEmployee (firstName, lastName, title, employeeID, salary) { //function to append employee info to table
    console.log('in appendEmployee function');

    let employee = {
        firstName: firstName,
        lastName: lastName,
        title: title,
        employeeID: employeeID,
        salary: salary
    }
    employeeArray.push(employee);
    console.log('Employee OBJECT:', employee);
    console.log('employeeARRAY:', employeeArray)

    //adding conditional for if fields have valid inputs
if(firstName == '') {
    alert('Please enter a first name');
    return;
}
else if(lastName == '') {
    alert('Please enter a last name');
    return;
}
else if(title == '') {
    alert('Please enter a title');
    return;
}
else if(salary == '') {
    alert('Please enter annual salary');
    return;
}
else if(employeeID == ''){ //if no employeeID entered (could be common), return N/A
    employeeID = 'N/A';
}

        //log input field results as they'll show on the DOM
    console.log('Show on dom as:', lastName + ',' ,firstName,'-', title,'-', employeeID,'-', salary);


        //append employee info to DOM
    $('#employeeTableBody').append(`
        <tr><td>${lastName}, ${firstName}</td><td>${title}</td><td>${employeeID}</td><td id="salary" class>$${salary}</td><td><button class="deleteButton">Delete</button></td></tr>`)

        //clear input fields
    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#titleInput').val('');
    $('#employeeIDInput').val('');
    $('#salaryInput').val('');

    $('.deleteButton').on('click', deleteRow);

runningTotal(parseInt(salary));
}

let runningCost = 0; //starting point for the total cost at bottom

function runningTotal(runningTotal) { //function pulls in the input SALARY and calcs running total
    console.log('in runningTotal function'); //quick log
    runningCost += ((runningTotal / 12).toFixed(2) * 1);
    $('#totalCostOutput').text(`$${runningCost}`);
}


function deleteRow() {
    console.log('in delete row function');
    console.log($(this));
    let employeeData = $(this).parent().parent();
    $(employeeData).remove();
    $('#totalCostOutput').text(`$${runningCost -= 10}`); // WHERE WE LEFT OFFFFFFFFF
}

