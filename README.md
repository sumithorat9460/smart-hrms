# Smart HRMS v1.0

Smart Human Resource Management System — a modern junior-level Java full-stack portfolio project.

## Stack
- Java 21, Spring Boot 3.5.16, Spring Web, Spring Data JPA, Hibernate, Spring Security, JWT, Bean Validation, OpenAPI/Swagger, MySQL 8
- React 19.2, Vite 8, Tailwind CSS 4.3, React Router 8, Axios, React Hook Form

Spring Boot 3.5.16 is the final OSS release in the 3.5.x generation, so this project intentionally pins that release to stay within the requested Spring Boot 3.x line. citeturn0search0

## Features in V1
- JWT authentication with ADMIN and EMPLOYEE roles
- Employee CRUD with validation, search, status filtering and pagination
- Department CRUD with employee counts
- Admin dashboard statistics and department distribution
- Employee profile view
- Global API error handling
- Swagger/OpenAPI
- Responsive SaaS-style UI inspired by the supplied Smart HRMS reference image
- Seed data for demo accounts and employees

## Demo accounts
- Admin: `admin@smarthrms.com` / `Admin@123`
- Employee: `employee@smarthrms.com` / `Employee@123`

Change these credentials and the JWT secret before any public deployment.

## Run backend
1. Start MySQL and create the database with `database/schema.sql` (or let Hibernate create it).
2. Configure `backend/src/main/resources/application.properties` or environment variables:
   - `DB_URL`
   - `DB_USERNAME`
   - `DB_PASSWORD`
   - `JWT_SECRET`
3. Run:

```bash
cd backend
mvn spring-boot:run
```

API: http://localhost:8080  
Swagger: http://localhost:8080/swagger-ui.html

## Run frontend
Requires a current Node.js LTS.

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173.

## Architecture
React → Axios → Spring Boot Controller → Service → Repository → JPA/Hibernate → MySQL

Security: React login → `/api/auth/login` → JWT → protected API calls → Spring Security role authorization.

## API overview
- `POST /api/auth/login`
- `GET /api/dashboard/stats`
- `GET /api/employees`
- `GET /api/employees/{id}`
- `POST /api/employees`
- `PUT /api/employees/{id}`
- `DELETE /api/employees/{id}`
- `GET /api/departments`
- `GET /api/departments/{id}`
- `POST /api/departments`
- `PUT /api/departments/{id}`
- `DELETE /api/departments/{id}`

## Next V1.1 candidates
Attendance, leave management, payroll summaries, richer audit logging, refresh tokens, automated tests, Docker Compose and deployment manifests.
