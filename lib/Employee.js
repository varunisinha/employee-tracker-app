const inquirer = require("inquirer");
require("console.table");

// The class responsible for retrieving and storing employee details from the database
class Employee {

  constructor(db) {
    this.db = db;
  }

  getAllEmployees(onDone) {
    // Query database
    this.db.query('SELECT * FROM employee', function (err, results) {
      console.log("\nList of all employees");
      console.table(results);
      if (onDone) onDone();
    });
  }

  inserEmployee(empData, onDone) {
    const sql = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`;
    const params = [empData.first_name, empData.last_name, empData.role_id, empData.manager_id];

    this.db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully added the employee");
      }
      if (onDone) onDone();
    });
  }

  addNewEmployee(onDone) {
    inquirer
      .prompt([{
        type: 'input',
        name: 'first_name',
        message: 'What is the First name of the employee?',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the Last name of the employee?',
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'What is the Role ID of the employee?',
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'What is the Manager ID of the employee?',
      }
      ])
      .then(val => {
        if (val) {
          this.inserEmployee(val, onDone);
        }
      });
  }

  updateEmployeeRole(onDone) {
    console.log("Update empployee role");
    if (onDone) onDone();
  }
}


module.exports = Employee;