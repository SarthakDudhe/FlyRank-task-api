# FlyRank AI Task API

A production-ready, RESTful Task Management API built with Node.js, Express.js, MongoDB, and Mongoose ODM. This service follows clean architecture principles, robust input validation, centralized error handling, and modern ES2023 standards.

## Project Overview

The FlyRank AI Task API provides complete CRUD (Create, Read, Update, Delete) capabilities for managing tasks. Originally designed as an in-memory service, it has been fully upgraded to integrate with a persistent MongoDB database while strictly preserving the original REST API specification, resource naming, routes, and JSON response structures.

## Features

- **MongoDB & Mongoose Integration**: Persistent storage with schema validation, timestamps, and indexing.
- **Clean Architecture**: Clean separation of concerns across routes, controllers, services, models, and middlewares.
- **Robust Input Validation**: Strict validation of strings, numbers, booleans, enums, and MongoDB ObjectIds using `express-validator`.
- **Centralized Error Handling**: Unified handling of validation errors, Mongoose cast/duplicate/validation errors, 404s, and 500s.
- **Security & Logging**: Configured with `helmet` for HTTP header security, `cors` for cross-origin resource sharing, and `morgan` for HTTP request logging.
- **Interactive Documentation**: Integrated Swagger UI available at `/docs`.
- **Filtering, Sorting & Pagination**: Supports advanced query parameters for listing tasks.

## Folder Structure

```
backend/
├── src/
│   ├── config/          # Database connection and Swagger configuration
│   ├── controllers/     # Request/Response logic
│   ├── middleware/      # Custom middlewares (Validation, Error handler, 404 handler)
│   ├── models/          # Mongoose schemas and models
│   ├── routes/          # Express route definitions
│   ├── services/        # Business logic and database queries
│   ├── utils/           # Helper classes and response formatters
│   ├── app.js           # Express application setup
│   └── server.js        # Server entry point & DB connection initialization
├── .env                 # Environment variables
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd antigravity-task-api
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure environment variables**:
   Create a `.env` file in the root directory and adjust values as needed.
4. **Ensure MongoDB is running**:
   Make sure a local MongoDB server is running on port `27017` or update `MONGODB_URI` in `.env` to point to a MongoDB Atlas cluster.

## Environment Variables

| Variable | Description | Default Value |
|---|---|---|
| `PORT` | Port number the server listens on | `3000` |
| `NODE_ENV` | Application environment (`development` or `production`) | `development` |
| `MONGODB_URI`| Connection string for MongoDB | `mongodb://127.0.0.1:27017/flyrank-tasks` |
| `CORS_ORIGIN`| Allowed origins for CORS | `*` |

## Run Commands

- **Start in Development Mode** (with auto-reload via Nodemon):
  ```bash
  npm run dev
  ```
- **Start in Production Mode**:
  ```bash
  npm start
  ```
- **Lint Code**:
  ```bash
  npm run lint
  ```
- **Format Code**:
  ```bash
  npm run format
  ```

## Database Configuration

The application uses Mongoose ODM to connect to MongoDB. Reusable connection logic is located in `src/config/database.js`.

### Connection Behavior
- **Graceful Reconnection**: Handles initial connection failures and outputs clear diagnostic error messages.
- **Environment Driven**: Fully configured via the `MONGODB_URI` environment variable—no hardcoded credentials.
- **ID Transformation**: The Mongoose schema uses a custom `toJSON` transformation that automatically maps MongoDB's internal `_id` field to `id` and strips the `__v` version key, preserving the exact API response specification required by clients.

## Validation Rules

All endpoints validate incoming data using `express-validator`. Invalid requests are rejected with a `400 Bad Request` status before reaching the controller.

| Field | Rules |
|---|---|
| `id` (Param) | Must be a valid MongoDB ObjectId (`isMongoId`). |
| `title` | Required for creation, non-empty trimmed string. |
| `description` | Required for creation, non-empty trimmed string. |
| `priority` | Required for creation, enum: `['Low', 'Medium', 'High']`. |
| `status` | Optional on create/update, enum: `['Pending', 'In Progress', 'Done']`. Defaults to `'Pending'`. |
| `assignedTo` | Required for creation, non-empty trimmed string. |
| `completed` | Boolean. Automatically managed if `status` changes to `'Done'`. |

## Error Handling

Centralized error handling is managed via `src/middleware/error.middleware.js`. All errors return a consistent JSON structure:

```json
{
  "success": false,
  "message": "Error description message",
  "error": "Detailed error information or stack trace in development"
}
```

### Handled Error Types:
- **Validation Errors**: Returns descriptive messages for each failing field.
- **Mongoose CastErrors**: Traps malformed ObjectIds passed in route parameters.
- **Mongoose ValidationErrors**: Traps schema-level validation failures.
- **Duplicate Key Errors (11000)**: Prevents duplicate unique entries.
- **404 Not Found**: Returns a structured error for unmapped routes or missing resources.
- **500 Internal Server Errors**: Traps unexpected crashes without exposing sensitive stack traces in production.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Welcome message & API metadata |
| `GET` | `/health` | API Health & Uptime check |
| `GET` | `/tasks` | Retrieve all tasks (supports search, filtering, sorting, pagination) |
| `GET` | `/tasks/:id` | Retrieve a single task by its MongoDB ObjectId |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update an existing task |
| `PATCH`| `/tasks/:id/status` | Update only the status of a task |
| `DELETE` | `/tasks/:id` | Delete a task |
| `GET` | `/stats` | Get aggregated task statistics |
| `POST` | `/reset` | Reset database and reseed initial tasks |

---

## Sample Postman Requests

### 1. Create a Task
- **Method**: `POST`
- **URL**: `http://localhost:3000/tasks`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "title": "Optimize MongoDB Indexes",
    "description": "Analyze query performance and add compound indexes for tasks collection",
    "priority": "High",
    "assignedTo": "Database Team"
  }
  ```
- **Expected Response** (`201 Created`):
  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "data": {
      "id": "66a21390e132c81234567890",
      "title": "Optimize MongoDB Indexes",
      "description": "Analyze query performance and add compound indexes for tasks collection",
      "priority": "High",
      "status": "Pending",
      "assignedTo": "Database Team",
      "completed": false,
      "createdAt": "2026-07-25T06:05:00.000Z",
      "updatedAt": "2026-07-25T06:05:00.000Z"
    }
  }
  ```

### 2. Get All Tasks (with Filtering and Pagination)
- **Method**: `GET`
- **URL**: `http://localhost:3000/tasks?priority=High&page=1&limit=5`
- **Expected Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Tasks retrieved successfully",
    "data": {
      "total": 2,
      "page": 1,
      "limit": 5,
      "totalPages": 1,
      "data": [
        {
          "id": "66a21390e132c81234567890",
          "title": "Optimize MongoDB Indexes",
          "description": "Analyze query performance and add compound indexes for tasks collection",
          "priority": "High",
          "status": "Pending",
          "assignedTo": "Database Team",
          "completed": false,
          "createdAt": "2026-07-25T06:05:00.000Z",
          "updatedAt": "2026-07-25T06:05:00.000Z"
        },
        {
          "id": "66a21391e132c81234567891",
          "title": "Implement Community Feed",
          "description": "Build infinite scrolling feed for FlyRank AI platform",
          "priority": "High",
          "status": "In Progress",
          "assignedTo": "Sarthak Dudhe",
          "completed": false,
          "createdAt": "2026-07-25T06:00:00.000Z",
          "updatedAt": "2026-07-25T06:00:00.000Z"
        }
      ]
    }
  }
  ```

### 3. Get Task By ID
- **Method**: `GET`
- **URL**: `http://localhost:3000/tasks/66a21390e132c81234567890`
- **Expected Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Task retrieved successfully",
    "data": {
      "id": "66a21390e132c81234567890",
      "title": "Optimize MongoDB Indexes",
      "description": "Analyze query performance and add compound indexes for tasks collection",
      "priority": "High",
      "status": "Pending",
      "assignedTo": "Database Team",
      "completed": false,
      "createdAt": "2026-07-25T06:05:00.000Z",
      "updatedAt": "2026-07-25T06:05:00.000Z"
    }
  }
  ```

### 4. Update a Task
- **Method**: `PUT`
- **URL**: `http://localhost:3000/tasks/66a21390e132c81234567890`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "status": "Done",
    "priority": "Medium"
  }
  ```
- **Expected Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Task updated successfully",
    "data": {
      "id": "66a21390e132c81234567890",
      "title": "Optimize MongoDB Indexes",
      "description": "Analyze query performance and add compound indexes for tasks collection",
      "priority": "Medium",
      "status": "Done",
      "assignedTo": "Database Team",
      "completed": true,
      "createdAt": "2026-07-25T06:05:00.000Z",
      "updatedAt": "2026-07-25T06:10:00.000Z"
    }
  }
  ```
  *(Note: Notice how setting `status` to `"Done"` automatically updated `completed` to `true` due to automated business logic).*

### 5. Delete a Task
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/tasks/66a21390e132c81234567890`
- **Expected Response** (`204 No Content`):
  *(Empty Response Body with HTTP 204 status code)*

---

## Future Improvements

- **Authentication & Authorization**: Integrate JWT-based role-based access control (RBAC) to restrict CRUD operations to authorized users.
- **Rate Limiting & Throttling**: Implement `express-rate-limit` to protect against DDoS attacks and brute-force polling.
- **Automated Testing & CI/CD**: Add unit and integration tests using Jest and Supertest, automated via GitHub Actions.
- **Caching Layer**: Integrate Redis to cache frequently accessed queries (like `/tasks` with common filters or `/stats`) to reduce MongoDB load.
- **Dockerization**: Provide a `Dockerfile` and `docker-compose.yml` to spin up the API and a MongoDB instance simultaneously in isolated containers.
