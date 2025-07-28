# Todo App Backend

Node.js Express API with MySQL integration for the Full-Stack Todo Application.

## Features

- ✅ RESTful API for todo management
- ✅ MySQL database integration with connection pooling
- ✅ Automatic database table creation
- ✅ CORS enabled for frontend communication
- ✅ Comprehensive error handling and validation
- ✅ Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Configure your `.env` file:**
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=todo_app_db
   DB_PORT=3306
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Create MySQL database:**
   ```sql
   CREATE DATABASE todo_app_db;
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3001` (or the port specified in your `.env` file).

## API Endpoints

### Health Check
- **GET** `/api/health` - Check server status

### Todos
- **GET** `/api/todos` - Get all todos
- **GET** `/api/todos/:id` - Get todo by ID
- **POST** `/api/todos` - Create new todo
- **PUT** `/api/todos/:id` - Update todo
- **DELETE** `/api/todos/:id` - Delete todo

### Request/Response Examples

#### Get All Todos
```bash
GET /api/todos
```
Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Learn React",
      "completed": false,
      "created_at": "2024-01-01T12:00:00.000Z",
      "updated_at": "2024-01-01T12:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### Create Todo
```bash
POST /api/todos
Content-Type: application/json

{
  "title": "New Todo Item",
  "completed": false
}
```

#### Update Todo
```bash
PUT /api/todos/1
Content-Type: application/json

{
  "title": "Updated Todo",
  "completed": true
}
```

## Database Schema

The application uses a single `todos` table:

```sql
CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

Common HTTP status codes:
- **200** - Success
- **201** - Created
- **400** - Bad Request (validation errors)
- **404** - Not Found
- **500** - Internal Server Error

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection and configuration
├── routes/
│   └── todos.js             # Todo API routes
├── database/
│   └── schema.sql           # Database schema
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
├── server.js                # Main application file
└── README.md                # This file
```

## Development

- The application automatically creates database tables on startup
- Use `npm run dev` for development with auto-restart
- Check console logs for database connection status and API requests
- CORS is configured to allow requests from the frontend URL

## Testing

Test the API using curl, Postman, or any HTTP client:

```bash
# Health check
curl http://localhost:3001/api/health

# Get all todos
curl http://localhost:3001/api/todos

# Create a todo
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","completed":false}'
```
