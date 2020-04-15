var mysql = require("mysql");
var inquirer = require("inquirer");
require('dotenv').config();
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: process.env.PASSWORD,
    database: "employ_trackdb"
  });

  connection.connect(function(err) {
    if (err) throw err;
    initiate();
  });
  
  function initiate(){
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "1 Create a new Department",
        "2 Create a new Role",
        "3 Add a new Employee",
        "4 View all the Departments",
        "5 View all the Roles",
        "6 View all the Employees",
        "7 View all the Employees by Manager",
        "8 Update an Employee's Manager",
        "9 View total budget of a Department",
        "0 Exit"
      ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "1 Create a new Department":
          createDepartment();
          break;
  
        case "2 Create a new Role":
          createRole();
          break;

        case "3 Add a new Employee":
            AddEmployee();
          break;

        case "4 View all the Departments":
          viewAllDepartments();
          break;

        case "5 View all the Roles":
        viewAllRoles();
        break;

        case "6 View all the Employees":
        viewAllEmployee();
        break;

        case "7 View all the Employees by Manager":
        viewEmployeeByManager();
        break;

        case "8 Update an Employee's Manager":
        updateEmployManager();
        break;

        case "9 View total budget of a Department":
        departmentBudget();
        break;

        case "0 Exit":
        exit();
        break;
        
        
        }
      });
  }


  function createDepartment(){
    inquirer
    .prompt({
      name: "newDepartment",
      type: "input",
      message: "Type the name of the new Department to add:"
    })
    .then(function(answer) {
      var query = "INSERT INTO department (name) VALUES (?)";
      connection.query(query,answer.newDepartment, function(err) {
        if (err) throw err;
        console.log("Department: " + answer.newDepartment + " successfully created!");
        initiate();
      });
    });
  }


  function createRole(){
    inquirer
    .prompt([{
      name: "newTitle",
      type: "input",
      message: "Type the name of the title for the new Role:"
    },
    {
        name: "newSalary",
        type: "input",
        message: "What will the salary be for this role?:",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
      },
      {
        name: "whichDep",
        type: "input",
        message: "In which department will this role be used?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
      }])
    .then(function(answer) {
        console.log(answer.newTitle);
        
      var query = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
      connection.query(query,[answer.newTitle, answer.newSalary, answer.whichDep], function(err) {
        if (err) throw err;
        console.log("New Role: " + answer.newTitle + " successfully created!");
        console.log("It will have a salary of: " +answer.newSalary);
        console.log("Employee with this title will work in the : " +answer.whichDep + " department!");
        
        initiate();
      });
    });
  }

  
  function AddEmployee() {
    inquirer
    .prompt([{
      name: "first",
      type: "input",
      message: "Type the First Name of the New Employee:"
    },
    {
        name: "last",
        type: "input",
        message: "Type the Last Name of the New Employee:",
        
      },
      {
        name: "role",
        type: "input",
        message: "In Which Role will this employee work?",
        
      },
      {
        name: "manager",
        type: "input",
        message: "Enter the name of the Employees Manager if any:",
        // filter: input => {
        //     if(input === "")
        //     return null;
        // }
      }])
    .then(function(answer) {
      var role;
      var manager;
      var query = "SELECT * FROM employ_trackdb.role";
      connection.query(query, function(err,res) {
        if (err) throw err;
        var isThere = false;

        for (let i = 0; i < res.length; i++) {
          
          if(res[i].title === answer.role)
          {
            role = res[i].id;
            isThere = true;
          }
          
        }

        if(isThere === true) {
          var inputFirstandLAst = answer.manager.split(" ");
          var query = `SELECT role_id FROM Employee WHERE first_name = "${inputFirstandLAst[0]}" AND last_name = "${inputFirstandLAst[1]}"`;
            connection.query(query, function(err,res) {
              if (err) throw err;

              manager = res[0].role_id;
              

              var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
              connection.query(query,[answer.first, answer.last, role, manager ], function(err) {
                if (err) throw err;
                console.log(answer.first  +" "+ answer.last + " is now officially an Employee");
                console.log(answer.first  + " will work as a: " + answer.role);        
                initiate();
              });
            });

       }
        
        
        if (isThere === false)
        {
          console.log("The role you entered does not exist! Try Again!");
          AddEmployee()
        }
                
        
      });



      
    });

  }
  function viewAllDepartments() {

        var query = "SELECT * FROM department";
        connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        initiate();
    });

}

function viewAllRoles() {

    var query = "SELECT * FROM role";
        connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        initiate();
    });
}

function viewAllEmployee() {

    var query = "SELECT * FROM employee";
        connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        initiate();
    });
}
function viewEmployeeByManager() {

  inquirer
    .prompt({
      name: "managerName",
      type: "input",
      message: "Enter the full name of the manager:"
    })
    .then(function(answer) {
    
      
    
 
  var input = answer.managerName;
  var managersID;
  var managersName;
  var query = `SELECT id FROM role WHERE title = "Manager"`;
        connection.query(query, function(err, res) {
        if (err) throw err;
        
        managersID = res;
        
        for (let i = 0; i < managersID.length; i++) {
          
          var query = `SELECT CONCAT(first_name, " ", last_name) AS names FROM employee WHERE role_id = ${managersID[i].id} `;
        connection.query(query, function(err, res) {
        if (err) throw err;
        
        managersName = res;

        var found = false;
        for (let i = 0; i < managersName.length; i++){
          
              if (managersName[i].names == input) {
              found = true;
              var inputFirstandLAst = input.split(" ");
              var query = `SELECT role_id FROM Employee WHERE first_name = "${inputFirstandLAst[0]}" AND last_name = "${inputFirstandLAst[1]}"`;
                    connection.query(query, function(err, res) {
                    if (err) throw err;
                    
                    var teamId = res[0].role_id;
                                                              
                    var query = `SELECT * FROM employee WHERE manager_id = ${teamId}`;
                    connection.query(query, function(err, res) {
                        if (err) throw err;

                        console.log();
                        console.log();
                        
                        console.table(input +"'s Team", res);
                        initiate();
                    });

                });
                
              }

            
          
          
        }

        if (found === false)
        {
          console.log("There are no managers by the name: "+ input);
          
        }

         });
        

        }
    });

    
  });
    


  initiate();
}
