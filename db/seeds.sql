USE company_db;

INSERT INTO department(names)
VALUES ("Finance"),
       ("HR"),
       ("IT"),       
       ("Marketing");
        
INSERT INTO roles(title, salary, department_id)
VALUES ("President", 100000, 4),
       ("Human Resources Officer", 65000, 1),
       ("Accountant", 75000, 1);                

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES (1, "Rebecca", "Adams", 1, 1),
       (2, "Bob", "Pancakes", 2, 2),
       (3, "Carol", "Williamson", 3, 0);
