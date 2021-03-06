const inquirer = require('inquirer'); 
const mysql = require('mysql2');
const cTable = require('console.table'); 

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'oatmeal1',
      database: 'company_db',
      port: 3306
    }
  );

const menuOptions = [
    {
        type: 'list',
        name: 'userChoice',
        message: 'Choose from the following menu options…',        
        choices: ['View all departments', 
        'View all roles', 
        'View all employees', 
        'Add a department', 
        'Add a role', 
        'Add an employee', 
        'Update an employee role',
        'Exit']
    }
]  
  
viewAllDepartments = () => {      
    const fetchQuery = `SELECT id, name from department ORDER BY id`;
    db.query(fetchQuery, (err, result) => {
        if (err) throw err;   
        else
        {
            console.table(result);
            startApplication();           
        }            
    })   
}

viewAllEmployees = () => {
     const fetchQuery = `SELECT employees.id,employees.first_name,employees.last_name,
     manager.first_name as manager_first_name,manager.last_name as manager_last_name,
     role.title,role.salary,department.name as department 
     FROM employees employees
     LEFT JOIN employees manager on employees.manager_id = manager.id  
     JOIN ROLE on employees.role_id = role.id 
     JOIN department ON role.department_id = department.id;`;
     db.query(fetchQuery, (err, result) => {
         if (err) throw err;   
         else
         {
             console.table(result);
             startApplication();           
         }            
     })   
 }

 
viewAllRoles = () => {
     const fetchQuery = `SELECT role.id, role.title, role.salary, department.name as department 
     FROM role 
     JOIN department ON role.department_id = department.id`;
     db.query(fetchQuery, (err, result) => {
         if (err) throw err;   
         else
         {
             console.table(result);
             startApplication();           
         }            
     })   
 }

 addDepartment = () => {
    inquirer.prompt([
    {
        type: 'input', 
        name: 'department',
        message: "What is the name of department you want to add?",
        validate: department => {
            if(!department) {
                return "Please enter department name";            
            }                
            return true;
        }
    }
    ]).then((answers) => {
      const department = answers.department;
    const fetchQuery = `SELECT id from department where name='${department}'`;
    db.query(fetchQuery, (err, result) => {        
    if (err) throw err;   
    else
    {
        if(result.length > 0)
        {
            console.log(`department ${department} already exists`);  
            addDepartment();              
        }
        else
        {    
        const insertQuery = `INSERT INTO department(name) VALUES (?)`;
        db.query(insertQuery, department, (err, result) => {
            if (err) throw err;   
            else {
                console.log(`${department} has been added`);   
                viewAllDepartments();  
            }
        
            })    
        }    
    }     
      }) 
    })  
 }
 
 addRole = () => {
    inquirer.prompt([
    {
        type: 'input', 
        name: 'title',
        message: "What role you want to add?",
        validate: title => {
            if(!title) {
                return "Please enter role title";            
            }                
            return true;        
        }
    },
    {
        type: 'input', 
        name: 'salary',
        message: "What is the salary of this role?",
        validate: salary => {
            if(!salary || isNaN(salary)){                
                return "Please enter valid input";
            }            
            return true;           
        }
    }
    ]).then((answers) => {
      const title = answers.title;
      const salary = answers.salary;    
const fetchDepartments = `SELECT id, name from department order by name`;
db.query(fetchDepartments, (err, result) => {        
if (err) throw err;   
else
{
const listOfDepartments = result.map(({ name, id }) => ({ name: name, value: id }));
inquirer.prompt([
    {
        type: 'list', 
        name: 'departmentId',
        message: "Choose department for the role:",
        choices: listOfDepartments
    }
    ]).then((department) => {
        const departmentId = department.departmentId;
            const fetchQuery = `SELECT id from role where 
            department_id=${departmentId} and title='${title}'`;
            db.query(fetchQuery, (err, result) => {        
                if (err) throw err;   
                else
                {
                if(result.length > 0)
                {
                    console.log(`role ${title} already exists`);  
                    addRole();              
                }
                else
                {    
                    const insertQuery = `INSERT INTO role(title,salary,department_id) 
                    VALUES (?, ?, ?);`;
                    db.query(insertQuery, [title, salary, departmentId], (err, result) => {
                        if (err) throw err;   
                        else {
                            console.log(`${title} has been added`);   
                            viewAllRoles();  
                    }
                    
                    })    
                }    
                }     
            }) 
    })
}     
      }) 
    })  
 }

  addEmployee = () => {
   inquirer.prompt([
   {        
        type: 'input',
        name: 'firstName',
        message: 'What is employee\'s first name?',        
        validate: firstName => {
            if(!firstName) {
                return "Please enter first name";            
            }                
            return true;
        }
   },
   {        
        type: 'input',
        name: 'lastName',
        message: 'What is employee\'s last name?',        
        validate: lastName => {
            if(!lastName) {
                return "Please enter last name";            
            }                
            return true;
        }
   }      
    ]).then((answers) => {
     const firstName = answers.firstName;
     const lastName = answers.lastName;      
     const fetchRoles = `SELECT id, title from role order by title`;
     db.query(fetchRoles, (err, result) => {        
       if (err) throw err;   
       else
       {
    const listOfRoles = result.map(({ title, id }) => ({ name: title, value: id }));
    inquirer.prompt([
        {
            type: 'list', 
            name: 'roleId',
            message: 'What is employee\'s job title?',        
            choices: listOfRoles
        }
        ]).then((role) => {
        const roleId = role.roleId;      
        const fetchManager = `SELECT id, first_name, last_name from employees order by 
        first_name, last_name`;
        db.query(fetchManager, (err, result) => {        
            if (err) throw err;   
            else
            {
            const listOfManagers = result.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
                listOfManagers.push({name: 'N/A', value: null});
                inquirer.prompt([
                    {
                    type: 'list', 
                    name: 'managerId',
                    message: 'Who is the employee\'s manager?',        
                    choices: listOfManagers
                    }
                    ]).then((manager) => {
                const managerId = manager.managerId;
            
                const insertQuery = `INSERT INTO employees(first_name,last_name,role_id,manager_id) 
                VALUES (?, ?, ?, ?);`;
                db.query(insertQuery, [firstName, lastName, roleId, managerId], (err, result) => {
                    if (err) throw err;   
                    else {
                        console.log(`${firstName} ${lastName} has been added`);   
                        viewAllEmployees();  
                    }
                
                })    
                
        })
        }     
      }) 
    })  
    }    
 })  
}) 
}

updateEmployeeRole = () => {
     
    const fetchEmployee = `SELECT id, first_name, last_name from employees order by first_name, last_name`;
    db.query(fetchEmployee, (err, result) => {        
        if (err) throw err;   
        else
        {
            const listOfEmployee = result.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
            inquirer.prompt([
                {
                    type: 'list', 
                    name: 'employeeId',
                    message: 'Select employee would you like to update?',        
                    choices: listOfEmployee
                }
                ]).then((employee) => {
                    const employeeId = employees.employeeId; 
                    const fetchRoles = `SELECT id, title from role order by title`; 
                    db.query(fetchRoles, (err, result) => {        
                        if (err) throw err;   
                        else
                        {
                     const listOfRoles = result.map(({ title, id }) => ({ name: title, value: id }));
                     inquirer.prompt([
                         {
                             type: 'list', 
                             name: 'roleId',
                             message: 'What is employee\'s new job title?',        
                             choices: listOfRoles
                         }
                         ]).then((role) => {
                         const roleId = roles.roleId;
                         const updateQuery = `UPDATE employees SET role_id=? where id=?`;
                         db.query(updateQuery, [roleId, employeeId], (err, result) => {
                             if (err) throw err;   
                             else {
                                 console.log(`Employee role has been updated`);   
                                 viewAllEmployees();  
                             }
                         })
                        })
                        } 
                })  
            })  
        }
    })         
}


const startApplication = () => {    
    inquirer.prompt(menuOptions)
    .then((answers) => {
        switch (answers.userChoice) {
            case "View all departments":
                viewAllDepartments();
                break;  
            case "View all roles":
                viewAllRoles();
                break;            
            case "View all employees":
                viewAllEmployees();
                break;          
            case "Add a department":
                addDepartment();
                break;  
            case "Add a role":
                addRole();
                break;                                                   
            case "Add a role":
                addRole();
                break;                                                   
            case "Add an employee":
                addEmployee();
                break;           
            case "Update an employee role":
                updateEmployeeRole();
                break;       
            case "Update employee manager":
                updateEmployeeManager();
                break;                 
            case "View employees by manager":
                viewEmployeeByManager();
                break;  
            case "View employees by department":
                viewEmployeeByDepartment();
                break;           
            case "Delete department":
                deleteDepartment();
                break;      
            case "Delete a role":
                deleteRole();
                break;      
            case "Delete an employee":
                deleteEmployee();
                break;     
            case "View department budget":
                viewDepartmentBudget();
                break;                                                              
            case "Exit":
                process.exit();
                break;
            default:
                process.exit();
        }
    })
    .catch((err) => console.error(err));  
}

function init() {
  console.log("*        EMPLOYEE MANAGER         *")
  startApplication();
}

init();