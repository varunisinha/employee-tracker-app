const inquirer = require("inquirer");
const cTable = require("console.table");

// The class responsible for retrieving and storing department details from the database
class Department {

  constructor(db) {
    this.db = db;
  }

  getAllDepartments(onDone) {
    // Query database
    this.db.query('SELECT * FROM department', function (err, results) {
      console.log("\nList of all departments");
      console.table(results);
      if (onDone) onDone();
    });
  }

  insertDepartment(deptName, onDone) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [deptName];

    this.db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully added the department");
      }
      if (onDone) onDone();
    });
  }

  addNewDepartment(onDone) {
    inquirer
      .prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?',
      }])
      .then(val => {
        if (val.name) {
          console.log(val.name);
          this.insertDepartment(val.name, onDone);
        }
      });
  }
}


module.exports = Department;