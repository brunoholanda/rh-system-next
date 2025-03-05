# HR Management System API (NestJS)

A **NestJS-based API** designed for managing human resources (HR) operations. This system provides full **CRUD** functionalities for managing employees, departments, roles, and more.

## Features

- 🔄 **Full CRUD Operations**: Manage employees, departments, and HR-related data.
- 🗄 **Database Integration**: Uses PostgreSQL with **TypeORM**.
- 🔑 **Authentication & Authorization**: Secure access with **JWT** and **Passport.js**.
- 📄 **Migrations Support**: Easily manage database schema changes.
- 📊 **Role-Based Access Control (RBAC)**: Assign roles and permissions.
- 🚀 **Modular Architecture**: Organized with NestJS modules for scalability.

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/your-username/hr-management-api.git
cd hr-management-api
npm install
```

### Required Dependencies

```sh
npm install ts-node typescript @types/node --save-dev
npm i -g @nestjs/cli
npm install @nestjs/typeorm typeorm pg dotenv
npm install @nestjs/jwt passport passport-jwt passport-local bcrypt
npm install @types/passport-jwt @types/passport-local @types/bcrypt --save-dev
npm install @nestjs/passport passport passport-local passport-jwt
```

## Database Setup

Ensure you have a PostgreSQL database running and configure the **.env** file accordingly:

```
DATABASE_URL=postgres://user:password@localhost:5432/your_db_name
JWT_SECRET=your_jwt_secret
PORT=3000
```

## Running Migrations

### Generate a new migration:
```sh
npx ts-node ./node_modules/typeorm/cli.js migration:generate ./src/migrations/CreateHRTables -d ./src/config/data-source.ts
```

### Run migrations:
```sh
npx ts-node ./node_modules/typeorm/cli.js migration:run -d ./src/config/data-source.ts
```

## Generating Modules, Services, and Controllers

```sh
nest g module employees
nest g service employees
nest g controller employees
```

## Running the API

Start the NestJS server:

```sh
npm run start:dev
```

The API will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
