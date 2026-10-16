# Task 9 API

## Run

From the project root, run node task9/server.js. The server reads database settings and JWT_SECRET from the root .env file, then connects to the database before listening on PORT (default 5000).

## Routes

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | /health | No | Check that the API is running |
| POST | /api/auth/register | No | Register a user |
| POST | /api/auth/login | No | Log in and receive a bearer token |
| GET | /api/tasks | Yes | List the signed-in user's tasks |
| POST | /api/tasks | Yes | Create a task for the signed-in user |
| PATCH | /api/tasks/:id | Yes | Update one of the signed-in user's tasks |
| DELETE | /api/tasks/:id | Yes | Delete one of the signed-in user's tasks |

Send the login token on protected routes as Authorization: Bearer <token>.

Registration body:

    {
      "username": "Shahd",
      "email": "shahd@example.com",
      "password": "password123"
    }

Task creation body:

    {
      "title": "Study",
      "deadline": "2026-11-10",
      "priority": "high",
      "category": "school",
      "status": "todo"
    }

Task updates accept one or more of the task fields. Ownership is checked by both task id and the signed-in user's id when updating or deleting.
