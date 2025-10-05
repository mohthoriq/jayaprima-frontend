# Jaya Prima Frontend API

A Node.js Express API server with comprehensive examples and service architecture.

## Features

- Express.js server with proper middleware setup
- **Handlebars templating engine** with responsive web interface
- **Controller-View architecture** for web pages
- Service-based architecture for business logic
- Input validation using Joi
- Error handling middleware
- CORS support
- Health check endpoints
- Comprehensive API examples
- **Interactive web dashboard** with real-time monitoring
- **API testing interface** through web UI
- Bootstrap 5 responsive design
- Font Awesome icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
node src/index.js
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## Web Interface

### View Pages (Handlebars Templates)

- `GET /` - **Home page** with welcome interface and system overview
- `GET /dashboard` - **System dashboard** with real-time metrics and monitoring
- `GET /test` - **Interactive API testing** interface with forms and real-time responses
- `GET /status` - **System status page** with health checks and performance metrics

### API Endpoints

#### Root Endpoints

- `GET /health` - Server health check (JSON)
- `GET /api-info` - API information and available endpoints (JSON)

### Test API Endpoints

All test endpoints are prefixed with `/api/test`:

#### 1. Set Status
- `GET /api/test/set_status` - Set status (no parameters)
- `POST /api/test/set_status` - Set status with custom parameters

**POST Request Body Example:**
```json
{
  "status": "active",
  "message": "Custom status message",
  "data": {
    "key": "value"
  }
}
```

#### 2. Get Status
- `GET /api/test/get_status` - Get current service status

#### 3. Test Data
- `POST /api/test/test_data` - Test endpoint with data validation

**POST Request Body Example:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "message": "Test message",
  "data": {
    "custom": "data"
  }
}
```

#### 4. Health Check
- `GET /api/test/health` - Service health check

## Example Usage

### Using curl

1. **Basic health check:**
```bash
curl http://localhost:3000/health
```

2. **Set status (GET):**
```bash
curl http://localhost:3000/api/test/set_status
```

3. **Set status with data (POST):**
```bash
curl -X POST http://localhost:3000/api/test/set_status \
  -H "Content-Type: application/json" \
  -d '{"status": "maintenance", "message": "Server under maintenance"}'
```

4. **Test data endpoint:**
```bash
curl -X POST http://localhost:3000/api/test/test_data \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com", "age": 25}'
```

### Using the Web Interface

1. **Open your browser and navigate to:**
```
http://localhost:3000
```

2. **Available pages:**
   - **Home** (`/`) - Welcome page with system overview
   - **Dashboard** (`/dashboard`) - Real-time system monitoring
   - **Test API** (`/test`) - Interactive API testing with forms
   - **Status** (`/status`) - System health and performance metrics

3. **Interactive features:**
   - Test API endpoints through web forms
   - Real-time response display
   - System monitoring dashboards
   - Health check interfaces
   - Auto-refreshing status pages

### Using JavaScript fetch (Programmatic)

```javascript
// GET request
fetch('http://localhost:3000/api/test/get_status')
  .then(response => response.json())
  .then(data => console.log(data));

// POST request
fetch('http://localhost:3000/api/test/test_data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Jane Doe',
    email: 'jane@example.com',
    age: 28
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Project Structure

```
src/
├── index.js              # Main server file with Handlebars config
├── controllers/          # View controllers
│   └── HomeController.js # Home, dashboard, test, status controllers
├── api/                  # API routes
│   ├── index.js         # API router
│   └── test/            # Test endpoints
│       ├── index.js     # Test router
│       ├── setStatus.js # Set status endpoint
│       ├── getStatus.js # Get status endpoint
│       ├── testData.js  # Test data endpoint
│       └── health.js    # Health check endpoint
└── services/            # Business logic services
    └── TestServices.js  # Test service class

views/                   # Handlebars templates
├── layouts/
│   └── main.hbs        # Main layout template
├── home.hbs            # Home page template
├── dashboard.hbs       # Dashboard template
├── test.hbs            # API testing interface
├── status.hbs          # Status monitoring page
└── error.hbs           # Error page template

public/                  # Static files
└── css/
    └── style.css       # Custom CSS styles
```

## Service Architecture

The application uses a service-based architecture where:

- **Routes** handle HTTP requests and responses
- **Services** contain business logic
- **Joi** validates input data
- **Error handling** is centralized

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "timestamp": "2025-01-03T10:30:00.000Z",
  "service": "TestServices",
  "data": {
    // Response data here
  }
}
```

## Error Handling

The API includes comprehensive error handling:

- **Validation errors** (400) - Invalid input data
- **Server errors** (500) - Internal server errors
- **Not found** (404) - Invalid routes

## Development

To extend the API:

1. Add new routes in the appropriate directory under `src/api/`
2. Create corresponding service methods in `src/services/`
3. Add input validation using Joi schemas
4. Follow the existing error handling patterns

## Dependencies

- **express**: Web framework
- **express-handlebars**: Templating engine for views
- **handlebars**: Template engine
- **joi**: Input validation

## Web Interface Features

- **Responsive Design**: Bootstrap 5 with mobile-first approach
- **Interactive Dashboard**: Real-time system monitoring
- **API Testing Interface**: Test endpoints through web forms
- **Status Monitoring**: Live health checks and performance metrics
- **Error Handling**: User-friendly error pages
- **Auto-refresh**: Real-time data updates
- **Modern UI**: Font Awesome icons and smooth animations
