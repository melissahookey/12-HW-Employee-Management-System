USE company_db;

SELECT id, name from department ORDER BY id;

SELECT role.id, role.title, role.salary, department.name 
FROM role 
JOIN department ON role.department_id = department.id

SELECT employee.id,employee.first_name,employee.last_name,
manager.first_name as manager_first_name,manager.last_name as manager_last_name,
role.title,role.salary,department.name as department_name 
FROM employee employee 
LEFT JOIN employee manager on employee.manager_id = manager.id  
JOIN ROLE on employee.role_id = role.id 
JOIN department ON role.department_id = department.id;

INSERT INTO department(name) VALUES (?);
INSERT INTO role(title,salary,department_id) VALUES (?, ?, ?);
INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES (?, ?, ?, ?);

UPDATE employee set role_id=? WHERE id=?
UPDATE employee set manager_id=? WHERE id=?

SELECT e.first_name, e.last_name, m.first_name as manager_first_name, m.last_name as manager_last_name from 
employee e JOIN employee m 
ON e.manager_id=m.id
SELECT employee.first_name, employee.last_name, department.name as department 
FROM employee JOIN 
role ON employee.role_id = role.id JOIN 
department ON role.department_id = department.id

DELETE FROM department where id=?
DELETE FROM role where id=?
DELETE FROM employee where id=?

SELECT department.name as department,SUM(role.salary) as budget 
FROM employee JOIN 
role ON employee.role_id = role.id JOIN 
department ON role.department_id = department.id GROUP BY department.name
