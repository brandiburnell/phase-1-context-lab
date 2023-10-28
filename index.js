/* Your Code Here */
function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(dateStamp) {
    // console.log(this);
    this.timeInEvents.push({
        type: "TimeIn",
        hour: Number(dateStamp.substring(11,15)),
        date: dateStamp.substring(0,10)
    });

    return this;
}

function createTimeOutEvent(dateStamp) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(dateStamp.substring(11,15)),
        date: dateStamp.substring(0,10)
    });

    return this;
}

function hoursWorkedOnDate(givenDate) {
    let startingTime = this.timeInEvents.find(e => e.date === givenDate);
    let endingTime = this.timeOutEvents.find(e => e.date === givenDate);
    return (endingTime.hour - startingTime.hour)/100;
}

function wagesEarnedOnDate(givenDate) {
    return this.payPerHour * hoursWorkedOnDate.call(this, givenDate);
}

function findEmployeeByFirstName(employeeRecords, firstNameWanted) {
    return employeeRecords.find(employee => employee.firstName === firstNameWanted);
}

function calculatePayroll(employeeRecords) {
    const moneyOwedToEmployees = [];
    employeeRecords.forEach(employee => {
        moneyOwedToEmployees.push(allWagesFor.call(employee));
    });
    return moneyOwedToEmployees.reduce((accum, currentVal ) => accum + currentVal, 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


