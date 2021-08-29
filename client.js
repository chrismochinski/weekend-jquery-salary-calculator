console.log('JS ready');

$(document).ready(readyNow);

function readyNow() {
    console.log('JQ ready');
    $('#submitButton').on('click', appendEmployee);
    // $('.deleteButton').on('click', deleteRow);
    $('#appendTable').on('click', '.deleteButton', deleteRow);
}

function appendEmployee() {
    console.log('in appendEmployee function (did you click submit?');
    inputEmployee($('#firstNameInput').val(), $('#lastNameInput').val(), $('#titleInput').val(), $('#employeeIDInput').val(), $('#salaryInput').val());

}

employeeArray = []; // create employee array

function inputEmployee(firstName, lastName, title, employeeID, salary) { //function to append employee info to table
    console.log('in appendEmployee function');

    let employee = { // create employee object
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
    if (firstName == '') {
        alert('Please enter a first name');
        return;
    }
    else if (lastName == '') {
        alert('Please enter a last name');
        return;
    }
    else if (title == '') {
        alert('Please enter a title');
        return;
    }
    else if (salary == '') {
        alert('Please enter annual salary');
        return;
    }
    else if (employeeID == '') { //if no employeeID entered (could be common), return N/A
        employeeID = 'N/A';
    }

    //log input field results as they'll show on the DOM
    console.log('Show on dom as:', lastName + ',', firstName, '-', title, '-', employeeID, '-', salary);


    //append employee info to DOM
    $('#employeeTableBody').prepend(`
        <tr>
        <td>${lastName}, ${firstName}</td>
        <td>${title}</td>
        <td>${employeeID}</td>
        <td id="salary" class>$${salary}</td>
        <td><button class="deleteButton">Delete</button></td></tr>`)

    //clear input fields
    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#titleInput').val('');
    $('#employeeIDInput').val('');
    $('#salaryInput').val('');

    // $('.deleteButton').on('click', deleteRow);

    runningTotal(parseInt(salary));
}

let runningCost = 0; //starting point for the total cost at bottom

function runningTotal(runningTotal) { //function pulls in the input SALARY and calcs running total
    console.log('in runningTotal function'); //quick log
    runningCost += (Math.round(runningTotal / 12));
    $('#totalCostOutput').text(`$${runningCost}`);
    if (runningCost >= 20000) { //turning the number red if over 20k
        $('#totalCostOutput').css('backgroundColor', 'tomato');
    } //end red number if statement
}

function deleteRow() {
    console.log('in delete row function');
    console.log($(this));

    //stretch ideas below..
    let removedEmployeeInfo = $(this).parent().parent().text(); //working to remove from total salary
    console.log(removedEmployeeInfo);

    for(i=0; i<employeeArray.length; i++){ //for loop to check for employeeID
        if(removedEmployeeInfo.includes(employeeArray[i].employeeID)){ //if the removed employee includes its own employee ID...
            // console.log('true!', employeeArray[i].employeeID, 'Salary: $', parseInt(employeeArray[i].salary)); //logging out the annual salary
            let removedEmployeeSalary = parseInt(employeeArray[i].salary); // assign variable for annual salary
            // console.log('the annual salary of the removed employee:', removedEmployeeSalary);
            let monthlyRemoved = parseInt(removedEmployeeSalary  / 12);
            // console.log('removed monthly amount:', monthlyRemoved); // THIS IS THE MAGIC NUMBER
            // $('#totalCostOutput').text(`$${runningCost -= monthlyRemoved}`);
            let finalRemoved = runningCost -= monthlyRemoved;
            if(finalRemoved < 1.1){
                finalRemoved = 0;
            }
            $('#totalCostOutput').text(`$${finalRemoved}`);
        }
        else{}
    }

    let employeeData = $(this).parent().parent();
    $(employeeData).remove();
    

    if (runningCost < 20000) { //turning the number red if over 20k
        $('#totalCostOutput').css('backgroundColor', 'white');
    } //end red number if statement
}
