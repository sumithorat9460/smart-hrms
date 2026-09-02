CREATE DATABASE IF NOT EXISTS smart_hrms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE smart_hrms;
-- Spring Boot/JPA creates and evolves the tables in development (ddl-auto=update).
-- This file documents the intended core schema.
CREATE TABLE IF NOT EXISTS departments (
 id BIGINT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(80) NOT NULL UNIQUE,
 location VARCHAR(100), manager VARCHAR(120)
);
CREATE TABLE IF NOT EXISTS employees (
 id BIGINT PRIMARY KEY AUTO_INCREMENT,
 first_name VARCHAR(60) NOT NULL, last_name VARCHAR(60) NOT NULL,
 email VARCHAR(120) NOT NULL UNIQUE, phone VARCHAR(20),
 salary DECIMAL(12,2) NOT NULL, date_of_birth DATE, joining_date DATE NOT NULL,
 address VARCHAR(255), education VARCHAR(120), profession VARCHAR(100),
 status VARCHAR(20) NOT NULL, department_id BIGINT NOT NULL,
 CONSTRAINT fk_employee_department FOREIGN KEY (department_id) REFERENCES departments(id)
);
CREATE TABLE IF NOT EXISTS users (
 id BIGINT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(120) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL, role VARCHAR(20) NOT NULL, enabled BOOLEAN NOT NULL
);
