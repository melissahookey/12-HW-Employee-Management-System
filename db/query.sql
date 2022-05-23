USE company_db;

-- View list of departments
SELECT id, name from department ORDER BY id;

-- View list of rolesss
SELECT roless.id, roless.title, roless.salary, department.name 
FROM roless 
JOIN department ON roless.department_id = department.id

-- View list of employees
SELECT employee.id,employee.first_name,employee.last_name,
manager.first_name as manager_first_name,manager.last_name as manager_last_name,
roles.title,roles.salary,department.name as department_name 
FROM employee employee 
LEFT JOIN employee manager on employee.manager_id = manager.id  
JOIN roles on employee.roles_id = roles.id 
JOIN department ON roles.department_id = department.id;

-- View employees by manager, department
SELECT e.first_name, e.last_name, m.first_name as manager_first_name, m.last_name as manager_last_name from 
employee e JOIN employee m 
ON e.manager_id=m.id
SELECT employee.first_name, employee.last_name, department.name as department 
FROM employee JOIN 
roles ON employee.roles_id = roles.id JOIN 
department ON roles.department_id = department.id

-- Insert department, roles, employee
INSERT INTO department(name) VALUES (?);
INSERT INTO roles(title,salary,department_id) VALUES (?, ?, ?);
INSERT INTO employee(first_name,last_name,roles_id,manager_id) VALUES (?, ?, ?, ?);

-- Update roles, manager
UPDATE employee set roles_id=? WHERE id=?
UPDATE employee set manager_id=? WHERE id=?

-- Delete department, roles, employee
DELETE FROM department where id=?
DELETE FROM roles where id=?
DELETE FROM employee where id=?
