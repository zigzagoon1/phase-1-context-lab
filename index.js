/* Your Code Here */

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


const testEmployee = {
    firstName: "Kelly",
    familyName: "Mark",
    title: "Game Developer",
    payPerHour: 20,
    timeInEvents: [],
    timeOutEvents: []
}

const createEmployeeRecord = function([firstNameValue, familyNameValue, titleValue, ratePerHour]) {
    const employeeObj = {
        firstName: firstNameValue,
        familyName: familyNameValue,
        title: titleValue,
        payPerHour: ratePerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObj;
}
//createEmployeeRecord(["Kelly", "Mark", "Game Developer", 20]);

function createEmployeeRecords(nestedEmployeesArray = []) {
    let employeeRecords = [];
    for (const el of nestedEmployeesArray) {
        const obj = createEmployeeRecord(el);
        employeeRecords.push(obj);
    }
    return employeeRecords;
}

//createEmployeeRecords([testEmployee, testEmployee])

const createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return this;
}
//createTimeInEvent("2023-01-14 0900");

function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return this;
}
//createTimeOutEvent("2023-01-14 1700")

const hoursWorkedOnDate = function(dateStamp) {
    const timeIn = this.timeInEvents.find(x => x.date === dateStamp).hour;
    const timeOut = this.timeOutEvents.find(x => x.date === dateStamp).hour;
    const hoursWorked = timeOut - timeIn;
    return hoursWorked / 100;
}
//hoursWorkedOnDate("2023-01-14");

const wagesEarnedOnDate = function(dateStamp) {
    const hours = hoursWorkedOnDate.call(this, dateStamp);
    return hours * this.payPerHour;
}

const findEmployeeByFirstName = function(employeeArr, firstName) {
    for (const employee of employeeArr) {
        if (employee.firstName === firstName) {
            return employee;
        }
    }
    return undefined;
}

function calculatePayroll(employeeRecordsArr) {
    let totalPay = 0;
    employeeRecordsArr.reduce((accumulator, currentObj) => {
        totalPay += allWagesFor.call(currentObj);
    }, totalPay)
    return totalPay;  
}