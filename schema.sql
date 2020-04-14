DROP DATABASE IF EXISTS employ_trackdb;
CREATE database employ_trackdb;


USE employ_trackdb;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY
  , name VARCHAR(30) NOT NULL
  
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY
  , title VARCHAR(30) NOT NULL
  , salary DECIMAL(10,2) NOT NULL
  , department_id INT NOT NULL
);
CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY
  , first_name VARCHAR(30) NOT NULL
  , last_name VARCHAR(30) NOT NULL
  , role_id INT NOT NULL
  , manager_id INT 
);

SELECT * FROM top5000;