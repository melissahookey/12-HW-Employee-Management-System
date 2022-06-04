USE company_db;

SELECT id, name from department ORDER BY id;

SELECT role.id, role.title, role.salary, department.name 
FROM role 
JOIN department ON role.department_id = department.id

SELECT employees.id,employees.first_name,employees.last_name,
manager.first_name as manager_first_name,manager.last_name as manager_last_name,
role.title,role.salary,department.name as department_name 
FROM employees employees 
LEFT JOIN employees manager on employees.manager_id = manager.id  
JOIN ROLE on employees.role_id = role.id 
JOIN department ON role.department_id = department.id;

INSERT INTO department(name) VALUES (?);
INSERT INTO role(title,salary,department_id) VALUES (?, ?, ?);
INSERT INTO employees(first_name,last_name,role_id,manager_id) VALUES (?, ?, ?, ?);

UPDATE employees set role_id=? WHERE id=?
UPDATE employees set manager_id=? WHERE id=?

SELECT e.first_name, e.last_name, m.first_name as manager_first_name, m.last_name as manager_last_name from 
employees e JOIN employees m 
ON e.manager_id=m.id
SELECT employees.first_name, employees.last_name, department.name as department 
FROM employees JOIN 
role ON employees.role_id = role.id JOIN 
department ON role.department_id = department.id

DELETE FROM department where id=?
DELETE FROM role where id=?
DELETE FROM employees where id=?

SELECT department.name as department,SUM(role.salary) as budget 
FROM employees JOIN 
role ON employees.role_id = role.id JOIN 
department ON role.department_id = department.id GROUP BY department.name
