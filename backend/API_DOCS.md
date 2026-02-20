# Visual Vibes API Documentation

## Base URL
```
https://yourdomain.com/backend/api.php
```

## Authentication
Most endpoints require session-based authentication. Admin endpoints require a valid admin session.

---

## Public Endpoints

### Health Check
Check if the API is running.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": 1700000000
}
```

---

### Get Active Slides
Retrieve all active carousel slides.

**Endpoint:** `GET /slides`

**Response:**
```json
[
  {
    "id": 1,
    "title": "Welcome to Visual Vibes",
    "subtitle": "Your Idea, Our Vision",
    "description": "We create stunning digital experiences",
    "image_url": "uploads/carousel/slide1.jpg",
    "display_order": 1,
    "is_active": 1
  }
]
```

### Get Single Slide
**Endpoint:** `GET /slides/{id}`

---

### Get Team Members
Retrieve all active team members grouped by category.

**Endpoint:** `GET /team`

**Response:**
```json
{
  "Founders & CEO": [
    {
      "id": 1,
      "name": "John Doe",
      "designation": "CEO",
      "image_url": "uploads/team/ceo.jpg",
      "category": "Founders & CEO",
      "display_order": 1,
      "is_active": 1
    }
  ],
  "Developers": [],
  "Graphics Team": []
}
```

### Get Single Team Member
**Endpoint:** `GET /team/{id}`

---

### Get Website Portfolio
Retrieve all active website portfolio items.

**Endpoint:** `GET /websites`

**Response:**
```json
[
  {
    "id": 1,
    "title": "E-Commerce Website",
    "description": "Full-featured online store",
    "image_url": "uploads/websites/site1.jpg",
    "website_url": "https://example.com",
    "category": "E-Commerce",
    "display_order": 1,
    "is_active": 1
  }
]
```

### Get Single Website
**Endpoint:** `GET /websites/{id}`

---

### Get Logo Portfolio
Retrieve all active logo portfolio items.

**Endpoint:** `GET /logos`

### Get Single Logo
**Endpoint:** `GET /logos/{id}`

---

### Get Graphic Designs
Retrieve all active graphic designs grouped by type (2D/3D).

**Endpoint:** `GET /graphics`

**Response:**
```json
{
  "2D": [
    {
      "id": 1,
      "title": "Logo Design",
      "description": "Professional logo",
      "image_url": "uploads/graphics/design1.jpg",
      "thumbnail_url": "uploads/graphics/thumbnails/design1.jpg",
      "category": "Branding",
      "design_type": "2D",
      "display_order": 1,
      "is_active": 1
    }
  ],
  "3D": []
}
```

### Get Single Graphic Design
**Endpoint:** `GET /graphics/{id}`

---

### Get Flyers & Posters
Retrieve all active flyer/poster items.

**Endpoint:** `GET /flyers`

### Get Single Flyer/Poster
**Endpoint:** `GET /flyers/{id}`

---

### Get UI/UX Designs
Retrieve all active UI/UX designs.

**Endpoint:** `GET /uiux`

### Get Single UI/UX Design
**Endpoint:** `GET /uiux/{id}`

---

### Get Portfolio Videos
Retrieve all active portfolio videos.

**Endpoint:** `GET /videos`

### Get Single Video
**Endpoint:** `GET /videos/{id}`

---

### Submit Enquiry (Public)
Submit a new enquiry from the contact form.

**Endpoint:** `POST /enquiries`

**Content-Type:** `multipart/form-data`

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| full_name | string | Yes | Contact full name |
| email | string | Yes | Contact email |
| phone | string | Yes | Contact phone |
| company | string | No | Company name |
| location | string | No | Location |
| service_type | string/array | Yes | Service types (comma-separated or array) |
| other_service | string | No | Other service details |
| project_type | string | Yes | Type of project |
| project_description | string | Yes | Project description |
| design_style | string | No | Preferred design style |
| deadline | string | No | Project deadline |
| budget_range | string | No | Budget range |
| contact_preference | string/array | Yes | Contact preference (email/phone) |
| best_time | string | No | Best time to contact |
| hear_about | string | No | How they heard about us |
| other_source | string | No | Other source details |
| additional_notes | string | No | Additional notes |
| reference_file | file | No | Reference file (max 10MB) |

**Success Response (201):**
```json
{
  "message": "Enquiry submitted successfully",
  "id": 123
}
```

**Error Response (400):**
```json
{
  "error": "Please fill all required fields"
}
```

---

## Admin Endpoints (Authentication Required)

### Admin Login
Authenticate admin user.

**Endpoint:** `POST /auth`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "action": "login",
  "username": "admin",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "admin",
    "full_name": "Admin User"
  }
}
```

### Check Authentication
Check if user is authenticated.

**Endpoint:** `POST /auth`

**Request Body:**
```json
{
  "action": "check"
}
```

**Response:**
```json
{
  "authenticated": true,
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

### Admin Logout
**Endpoint:** `POST /auth`

**Request Body:**
```json
{
  "action": "logout"
}
```

---

### Get Admin Stats
Get dashboard statistics.

**Endpoint:** `GET /admin?type=stats`

**Response:**
```json
{
  "enquiries_total": 150,
  "enquiries_pending": 25,
  "slides": 5,
  "team_members": 12,
  "websites": 20,
  "logos": 35,
  "graphics": 50,
  "flyers": 30
}
```

---

### Get Enquiries
Retrieve all enquiries with optional filters.

**Endpoint:** `GET /enquiries`

**Query Parameters:**
- `status` - Filter by status (pending, reviewed, contacted, archived)
- `service` - Filter by service type
- `search` - Search in name, email, phone

**Example:** `GET /enquiries?status=pending&search=john`

**Response:**
```json
[
  {
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Acme Inc",
    "location": "New York",
    "service_type": "Web Design, Logo Design",
    "project_type": "Website",
    "project_description": "Need a new website",
    "status": "pending",
    "created_at": "2024-01-15 10:30:00"
  }
]
```

---

### Update Enquiry Status
**Endpoint:** `PUT /enquiries/{id}`

**Request Body:**
```json
{
  "status": "contacted"
}
```

---

### Delete Enquiry
**Endpoint:** `DELETE /enquiries/{id}`

---

## CRUD Operations (Admin)

All portfolio endpoints support full CRUD operations:

### Create
**Endpoint:** `POST /{endpoint}`

**Request Body:** (JSON)
```json
{
  "title": "New Item",
  "description": "Description",
  "image_url": "path/to/image.jpg",
  "category": "Category",
  "display_order": 1,
  "is_active": 1
}
```

### Update
**Endpoint:** `PUT /{endpoint}/{id}`

### Delete
**Endpoint:** `DELETE /{endpoint}/{id}`

---

## Available Endpoints Summary

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /health | Health check | No |
| GET | /slides | Get all slides | No |
| GET | /slides/{id} | Get single slide | No |
| GET | /team | Get team members | No |
| GET | /websites | Get website portfolio | No |
| GET | /logos | Get logo portfolio | No |
| GET | /graphics | Get graphic designs | No |
| GET | /flyers | Get flyers/posters | No |
| GET | /uiux | Get UI/UX designs | No |
| GET | /videos | Get portfolio videos | No |
| POST | /enquiries | Submit enquiry | No |
| POST | /auth | Login/logout/check | No |
| GET | /admin?type=stats | Get admin stats | Yes |
| GET | /enquiries | Get enquiries | Yes |
| PUT | /enquiries/{id} | Update enquiry | Yes |
| DELETE | /enquiries/{id} | Delete enquiry | Yes |
| POST | /{endpoint} | Create item | Yes |
| PUT | /{endpoint}/{id} | Update item | Yes |
| DELETE | /{endpoint}/{id} | Delete item | Yes |

---

## Error Responses

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 405 | Method Not Allowed |
| 500 | Internal Server Error |

**Error Response Format:**
```json
{
  "error": "Error message description"
}
```

---

## Rate Limiting
No rate limiting is currently implemented. Implement as needed for production.

---

## File Uploads
For file uploads, use `multipart/form-data` content type. Maximum file size: 10MB.

Allowed file types for enquiry references:
- Images: jpg, jpeg, png
- Documents: pdf, doc, docx
- Design files: psd, ai, zip
