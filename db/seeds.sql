USE company_db;

INSERT INTO department(name)
VALUES ("Finance"),
       ("HR"),
       ("IT"),       
       ("Marketing");
        
INSERT INTO roles(title, salary, department_id)
VALUES ("President", 100000, 1),
       ("Human Resources Officer", 65000, 1),
       ("Accountant", 75000, 1),                

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Rebecca", "Adams", 1, 1),
       ("Bob", "Pancakes", 2, 2),
       ("Carol", "Williamson", 3, NULL),
