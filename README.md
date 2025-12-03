# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and
some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)
  uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in
  [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev
& build performances. To add it, see
[this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript
with type-aware lint rules enabled. Check out the
[TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
for information on how to integrate TypeScript and
[`typescript-eslint`](https://typescript-eslint.io) in your project.

## API Documentation

### User Management

- **Login**: `POST /api/auth/login`
- **Refresh Token**: `POST /api/auth/refresh`
- **Get Current User**: `GET /api/auth/me`
- **Get All Users**: `GET /api/users` (Query: page, limit, search)
- **Get User by ID**: `GET /api/users/:userId`
- **Create User**: `POST /api/users`
- **Update User**: `PUT /api/users/:userId`
- **Update Password**: `PATCH /api/users/:userId/password`
- **Delete User**: `DELETE /api/users/:userId` (Query: hard=true/false)
- **Batch Status Update**: `PATCH /api/users/batch/status`
- **User Stats**: `GET /api/users/stats/summary`
