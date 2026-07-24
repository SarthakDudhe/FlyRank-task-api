# Antigravity Task API

Task Management API for Antigravity. An in-memory RESTful service built with Node.js, Express, and ES Modules.

## Features
- In-memory CRUD operations for Tasks
- Express-Validator for input validation
- Global Error Handling
- Helmet & CORS for security
- Morgan for logging
- Swagger UI Documentation

## Folder Structure
```
antigravity-task-api/
├── src/
│   ├── config/          # Configuration files (Swagger, etc.)
│   ├── controllers/     # Request/Response logic
│   ├── middleware/      # Express middlewares (Error handler, validation)
│   ├── models/          # Data layer (In-memory array)
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions (Response formatter)
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── package.json
├── .env
├── .gitignore
└── README.md
```

## Installation
1. Clone the repo
2. Run `npm install`
3. Create `.env` based on `.env.example`
4. Run `npm run dev` to start in development mode

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API Welcome message |
| GET | `/health` | API Health check |
| GET | `/tasks` | Get all tasks (supports filtering & search) |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update an existing task |
| PATCH| `/tasks/:id/status` | Update only the task status |
| DELETE | `/tasks/:id` | Delete a task |
| GET | `/stats` | Get task statistics |
| POST | `/reset` | Reset tasks to default seeds |

## Documentation
Swagger documentation is available at `/docs`.
