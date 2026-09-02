# Smart HRMS API Notes

## Authentication
`POST /api/auth/login`

```json
{"email":"admin@smarthrms.com","password":"Admin@123"}
```

Returns a JWT and role. Send subsequent requests with:
`Authorization: Bearer <token>`

## Employees
Supports `q`, `departmentId`, `status`, `page`, `size`, `sort`, `dir` query parameters.

Example create payload:
```json
{
  "firstName":"Asha",
  "lastName":"Patel",
  "email":"asha.patel@company.com",
  "phone":"+91 90000 00000",
  "salary":65000,
  "dateOfBirth":"1998-05-10",
  "joiningDate":"2026-08-20",
  "address":"Pune, Maharashtra, India",
  "education":"B.Tech",
  "profession":"Software Engineer",
  "status":"ACTIVE",
  "departmentId":1
}
```
