INSERT INTO employ_trackdb.employee (first_name, last_name, role_id) VALUES ('valerio', 'varani', 20);
INSERT INTO employ_trackdb.employee (first_name, last_name, role_id) VALUES ('julia','siegl',19);
INSERT INTO employ_trackdb.employee (first_name, last_name, role_id,manager_id) VALUES ('jessica','marter',3,20);
INSERT INTO employ_trackdb.employee (first_name, last_name, role_id,manager_id) VALUES ('joseph','sturtz',4,19);
INSERT INTO employ_trackdb.employee (first_name, last_name, role_id,manager_id) VALUES ('john', 'smith',2,19);
INSERT INTO employ_trackdb.employee (first_name, last_name, role_id,manager_id) VALUES ('robert', 'zimmerman', 1,20);



INSERT INTO employ_trackdb.department (name) VALUES ('Engineering');
INSERT INTO employ_trackdb.department (name) VALUES ('Financing');
INSERT INTO employ_trackdb.department (name) VALUES ('Human Resources');
INSERT INTO employ_trackdb.department (name) VALUES ('Legal');
INSERT INTO employ_trackdb.department (name) VALUES ('Security');
INSERT INTO employ_trackdb.department (name) VALUES ('Cafeteria');
INSERT INTO employ_trackdb.department (name) VALUES ('Maintanance');


INSERT INTO employ_trackdb.role (title,salary,department_id) VALUES ("Engineer One",80000.00,1);
INSERT INTO employ_trackdb.role (title,salary,department_id) VALUES ("Engineer Two",120000.00,1);
INSERT INTO employ_trackdb.role (title,salary,department_id) VALUES ("Engineer Three",170000.00,1);
INSERT INTO employ_trackdb.role (title,salary,department_id) VALUES ("Senior Engineer",250000.00,1);
INSERT INTO employ_trackdb.role (title,salary,department_id) VALUES ("Engineering Manager",300000.00,1);
INSERT INTO employ_trackdb.role (title,salary,department_id) VALUES ("Financial Advisor",90000.00,2);
INSERT INTO employ_trackdb.role (title,salary,department_id) VALUES ("Broker",250000.00,2);
INSERT INTO employ_trackdb.role (title,salary,department_id) VALUES ("Secretary",80000.00,2);
INSERT INTO employ_trackdb.role (title,salary,department_id) VALUES ("Secretary",50000.00,3);