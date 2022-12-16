create database if not exists companydb;
use companydb;
create table employees(
    id int(11) not null auto_increment primary key,
    name varchar(45) not null,
    salary int(5) not null
);
insert into employees(name,salary) values("Joe",1000),("Henry",2000),("Hector",99999);