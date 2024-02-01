# 🧀 Linqx API

The API from the linqx application

## 🧶 Running Locally

1. Setup enviroment variables
```env
DATABASE_URL="libsql://..."
DATABASE_AUTH_TOKEN="auth-token"
```

2. Push migrations to database
```sh
pnpm db:push
```

3. Run
```sh
pnpm dev
```