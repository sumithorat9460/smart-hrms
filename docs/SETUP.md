# Setup checklist

## 1. Database
Option A: `docker compose up -d mysql`

Option B: install MySQL 8.x locally and run `database/schema.sql`.

Default development credentials are `root` / `root` and can be overridden with `DB_USERNAME` and `DB_PASSWORD`.

## 2. Backend
Requires Java 21 and Maven 3.9+.

```bash
cd backend
mvn spring-boot:run
```

## 3. Frontend
Requires Node.js 22+ for the current Vite/React toolchain.

```bash
cd frontend
npm install
npm run dev
```

## 4. First login
Use the seeded admin account:

`admin@smarthrms.com` / `Admin@123`

## 5. Security before deployment
- Replace the development JWT secret.
- Replace demo passwords.
- Use a managed database secret store.
- Restrict CORS to the production frontend origin.
- Set `spring.jpa.hibernate.ddl-auto=validate` after migrations are introduced.
