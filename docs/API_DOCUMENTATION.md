# LabourLink Backend - API Documentation

## Get Started

### Installation

1. Navigate to backend folder:
```bash
cd labourlink-server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`

5. Start the server:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Header
All protected endpoints require JWT token:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### AUTH ENDPOINTS

#### Register Worker
```
POST /auth/register-worker
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "securepass123",
  "location": {
    "city": "Mumbai",
    "state": "Maharashtra"
  },
  "primarySkill": "masonry"
}

Response: 201 Created
{
  "message": "Worker registered successfully",
  "token": "eye...",
  "worker": { ... }
}
```

#### Login Worker
```
POST /auth/login-worker
{
  "email": "john@example.com",
  "password": "securepass123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eye...",
  "worker": { ... }
}
```

#### Register Contractor
```
POST /auth/register-contractor
{
  "name": "BuildCo",
  "email": "buildco@example.com",
  "phone": "9876543211",
  "password": "securepass123",
  "companyName": "BuildCo Constructions",
  "location": {
    "city": "Mumbai",
    "state": "Maharashtra"
  }
}
```

#### Login Contractor
```
POST /auth/login-contractor
{
  "email": "buildco@example.com",
  "password": "securepass123"
}
```

---

### WORKER ENDPOINTS

#### Get Worker Profile
```
GET /workers/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Worker profile fetched",
  "worker": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "completedJobs": 15,
    "averageRating": 4.5,
    "endorsements": [ ... ]
  }
}
```

#### Update Worker Profile
```
PUT /workers/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "primarySkill": "carpentry",
  "skillsCategory": ["carpentry", "painting"],
  "location": { "city": "Bangalore" }
}

Response: 200 OK
```

#### Get Worker by ID (Public)
```
GET /workers/:workerId

Response: 200 OK
{
  "message": "Worker profile fetched",
  "worker": {
    "_id": "...",
    "name": "John Doe",
    "completedJobs": 15,
    "averageRating": 4.5,
    "isVerified": true
  }
}
```

#### Search Workers
```
GET /workers/search?location=28.6139,77.2090&skills=masonry,carpentry&radius=10

Response: 200 OK
{
  "message": "Workers found",
  "count": 5,
  "workers": [ ... ]
}
```

#### Add Skill Endorsement
```
POST /workers/endorse
Authorization: Bearer <token>
{
  "workerId": "...",
  "skill": "masonry"
}
```

---

### JOB ENDPOINTS

#### Get All Jobs
```
GET /jobs?status=open&sortBy=createdAt

Response: 200 OK
{
  "message": "Jobs fetched",
  "count": 10,
  "jobs": [ ... ]
}
```

#### Get Job by ID
```
GET /jobs/:jobId

Response: 200 OK
{
  "message": "Job fetched",
  "job": {
    "_id": "...",
    "title": "Mason needed for wall construction",
    "location": { "city": "Mumbai" },
    "budget": { "dailyRate": 500 },
    "applicants": [ ... ]
  }
}
```

#### Create Job (Contractor Only)
```
POST /jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Mason needed",
  "description": "Experienced mason for 2-week project",
  "skillsRequired": [
    { "skillName": "masonry", "level": "intermediate" }
  ],
  "location": {
    "city": "Mumbai",
    "address": "Sector 5, Bandra"
  },
  "jobType": "project",
  "duration": {
    "startDate": "2026-04-01",
    "endDate": "2026-04-15",
    "estimatedDays": 10
  },
  "workersNeeded": 3,
  "budget": {
    "dailyRate": 500,
    "totalBudget": 15000
  },
  "isUrgent": true
}

Response: 201 Created
{
  "message": "Job created successfully",
  "job": { ... }
}
```

#### Apply for Job (Worker Only)
```
POST /jobs/apply
Authorization: Bearer <token>
{
  "jobId": "..."
}

Response: 200 OK
```

#### Accept Job Application (Contractor Only)
```
PUT /jobs/accept-application
Authorization: Bearer <token>
{
  "jobId": "...",
  "workerId": "..."
}
```

#### Complete Job (Contractor Only)
```
PUT /jobs/complete/:jobId
Authorization: Bearer <token>

Response: 200 OK
```

#### Search Jobs
```
GET /jobs/search?location=28.6139,77.2090&skills=masonry&radius=5

Response: 200 OK
```

---

### RATING ENDPOINTS

#### Add Rating for Job
```
POST /ratings
Authorization: Bearer <token>
{
  "jobId": "...",
  "workerId": "...",
  "contractorRating": 5,
  "workerFeedback": "Great work quality",
  "workerRating": 4,
  "contractorFeedback": "Professional and on-time"
}
```

#### Get Worker Ratings
```
GET /ratings/worker/:workerId

Response: 200 OK
{
  "message": "Worker ratings fetched",
  "count": 10,
  "ratings": [ ... ]
}
```

#### Get Contractor Ratings
```
GET /ratings/contractor/:contractorId
```

---

### CONTRACTOR ENDPOINTS

#### Get Contractor Profile
```
GET /contractors/profile
Authorization: Bearer <token>

Response: 200 OK
```

#### Update Contractor Profile
```
PUT /contractors/profile
Authorization: Bearer <token>
{
  "name": "BuildCo",
  "companyName": "BuildCo Constructions Ltd"
}
```

#### Get Contractor Dashboard
```
GET /contractors/dashboard
Authorization: Bearer <token>

Response: 200 OK
{
  "dashboard": {
    "contractor": { ... },
    "stats": {
      "totalJobsPosted": 20,
      "activeJobs": 3,
      "completedJobs": 17,
      "totalSpent": 250000
    }
  }
}
```

#### Add Favorite Worker
```
POST /contractors/favorite-worker
Authorization: Bearer <token>
{
  "workerId": "..."
}
```

#### Get Favorite Workers
```
GET /contractors/favorite-workers
Authorization: Bearer <token>
```

---

### SKILL ENDPOINTS

#### Get All Skills
```
GET /skills?category=masonry

Response: 200 OK
{
  "message": "Skills fetched",
  "skills": [ ... ]
}
```

#### Get Skill by ID
```
GET /skills/:skillId
```

#### Get Skills by Category
```
GET /skills/category/masonry
```

---

## Error Handling

All error responses follow this format:

```json
{
  "message": "Error description",
  "error": "Error details (in development mode)"
}
```

### Common HTTP Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Testing with Postman

1. Import the API endpoints into Postman
2. Set environment variables:
   - `base_url` = `http://localhost:5000/api`
   - `token` = (JWT token from login)
3. Include token in Authorization header: `Bearer {{token}}`

---

## Pagination & Filtering

Jobs and Workers endpoints support:
- Filtering by status, category, etc.
- Sorting by date, rating, completedJobs
- Limit results (default 20)

---

## Contact

For API issues, contact: support@labourlink.com
