# Butcher

## Seeding an admin

Sign-up has no UI. Accounts can only be created by POSTing to the sign-up
endpoint with an email that is in the `ADMIN_EMAILS` Convex env var.

```bash
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"email":"you@example.com","password":"a-strong-password-12+","name":"You"}'
```

Then sign in at <http://localhost:3000/admin/login>.

To revoke an admin, remove their email from `ADMIN_EMAILS`
(`bunx convex env set ADMIN_EMAILS "..."`); `requireAdmin` re-checks the env
on every request.
