# Smart HRMS v1.0

A modern Human Resource Management System built as a Java full-stack portfolio project.

Smart HRMS provides role-based authentication, employee management, department management, dashboard statistics, and a responsive web interface.

---

## 🚀 Tech Stack

### Backend

- Java 21
- Spring Boot 3.5.16
- Spring Web
- Spring Data JPA
- Hibernate
- Spring Security
- JWT Authentication
- Bean Validation
- Lombok
- MySQL 8
- Maven
- OpenAPI / Swagger
- SLF4J Logging

### Frontend

- React 19.2
- Vite 8
- Tailwind CSS 4.3
- React Router 7.18.1
- Axios
- React Hook Form
- Context API

### Tools

- IntelliJ IDEA
- VS Code
- MySQL Workbench
- Postman
- Git & GitHub
- Chrome DevTools

---

## ✨ Features

### 🔐 Authentication & Security

- JWT-based authentication
- ADMIN and EMPLOYEE roles
- Role-based API authorization
- Protected frontend routes
- Secure authenticated API requests
- Password-based login

### 👨‍💼 Employee Management

- Create employees
- View employee details
- Update employee information
- Delete employees
- Employee search
- Status filtering
- Pagination
- Bean Validation

### 🏢 Department Management

- Create departments
- Update departments
- Delete departments
- View department details
- Employee count per department

### 📊 Admin Dashboard

- Employee statistics
- Department statistics
- Active/inactive employee information
- Department distribution

### 👤 Employee Profile

- Employee profile view
- Personal information
- Employment information

### 🛠️ Developer Features

- Global exception handling
- Standardized API responses
- RESTful API architecture
- OpenAPI / Swagger documentation
- MySQL database integration
- Seed/demo data
- Responsive SaaS-style UI

---

## 🏗️ Architecture

```text
React Frontend
      ↓
    Axios
      ↓
Spring Boot REST API
      ↓
   Controller
      ↓
    Service
      ↓
   Repository
      ↓
 JPA / Hibernate
      ↓
    MySQL