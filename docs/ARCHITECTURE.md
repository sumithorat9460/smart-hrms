# Architecture

## Backend layers
- `controller`: HTTP/API boundary
- `service`: business logic and transaction boundary
- `repository`: Spring Data persistence
- `entity`: normalized JPA domain model
- `dto`: API contracts, preventing direct entity exposure
- `security`: JWT generation/filtering and role authorization
- `exception`: consistent API error responses
- `config`: security and seed configuration

## Frontend layers
- `pages`: route-level screens
- `components`: reusable layout, icons, headers and route protection
- `context`: authentication state
- `services`: Axios API client

## Design principles
- Backend validation is authoritative.
- DTOs are used at the API boundary.
- Passwords are BCrypt-hashed.
- JWT is stateless.
- Admin write APIs are protected with role authorization.
- MySQL relationships use foreign keys and JPA mappings.
