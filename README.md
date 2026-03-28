# LabourLink - Verified Skill & Work-History Platform

A full-stack web application connecting daily wage construction workers with contractors through verified skills and work history.

## Problem Statement

Construction workers in India often lack credibility and work history documentation. This platform solves that by:
- Building worker profiles through verified work experience (not self-reported claims)
- Enabling mutual ratings between workers and contractors
- Creating skill endorsements from verified job completions
- Providing a trusted marketplace for job connections

## Alignment with SDGs
- **SDG 8**: Decent Work & Economic Growth
- **SDG 10**: Reduced Inequalities

## Project Structure

```
labourlink/
├── labourlink-server/          # Node.js/Express Backend
│   ├── src/
│   │   ├── models/             # MongoDB schemas
│   │   ├── controllers/        # Business logic
│   │   ├── routes/             # API endpoints
│   │   ├── middleware/         # Authentication, validation
│   │   ├── utils/              # Helper functions
│   │   ├── config/             # Configuration files
│   │   └── index.js            # Server entry point
│   ├── package.json
│   └── .env.example
│
├── labourlink-client/          # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API integration
│   │   ├── redux/              # State management
│   │   ├── styles/             # CSS/Tailwind
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   └── package.json
│
└── docs/                       # Documentation
```

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, Redux Toolkit, Tailwind CSS, React Router
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Cloudinary
- **Validation**: Express Validator, Bcrypt for passwords

## Key Features

### 1. Worker Features
- **Profile Creation**: Workers build profiles through completed jobs
- **Job Application**: Browse and apply for available jobs
- **Skills Management**: Track and get endorsements for skills
- **Ratings & Reviews**: Receive feedback from contractors
- **Work History**: Verified record of completed jobs and earnings

### 2. Contractor Features
- **Job Posting**: Create and manage job listings with skill requirements
- **Worker Search**: Find workers by location and skills
- **Application Management**: Review and accept worker applications
- **Worker Ratings**: Rate workers after job completion
- **Favorites**: Save favorite workers for future jobs
- **Dashboard**: View statistics and job management

### 3. Core Features
- **Mutual Ratings**: Both workers and contractors rate each other
- **Skill Endorsements**: Verified by contractors after job completion
- **Location-based Search**: Find jobs/workers nearby using geospatial queries
- **Work Verification**: Photo evidence of completed work

### 4. Optional Features
- **Voice-Based Navigation**: For workers with limited literacy
- **Emergency Job Broadcast**: Urgent jobs sent to relevant workers
- **Photo Evidence**: Attachment of work completion photos

## API Endpoints

### Authentication
- `POST /api/auth/register-worker` - Worker registration
- `POST /api/auth/register-contractor` - Contractor registration
- `POST /api/auth/login-worker` - Worker login
- `POST /api/auth/login-contractor` - Contractor login

### Workers
- `GET /api/workers/profile` - Get worker profile
- `PUT /api/workers/profile` - Update profile
- `GET /api/workers/:id` - View worker profile
- `GET /api/workers/search` - Search workers by location/skills
- `POST /api/workers/endorse` - Add skill endorsement

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job (Contractor only)
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs/apply` - Apply for job (Worker only)
- `PUT /api/jobs/accept-application` - Accept worker (Contractor only)
- `PUT /api/jobs/complete/:id` - Complete job (Contractor only)
- `GET /api/jobs/search` - Search jobs by location/skills

### Ratings
- `POST /api/ratings` - Add rating for completed job
- `GET /api/ratings/worker/:workerId` - Get worker ratings
- `GET /api/ratings/contractor/:contractorId` - Get contractor ratings

### Contractors
- `GET /api/contractors/profile` - Get contractor profile
- `PUT /api/contractors/profile` - Update profile
- `GET /api/contractors/dashboard` - Get dashboard stats
- `POST /api/contractors/favorite-worker` - Add favorite
- `GET /api/contractors/favorite-workers` - Get favorites

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill details
- `GET /api/skills/category/:category` - Get skills by category

## Database Models

### Worker
- Personal information (name, email, phone, location)
- Profile data (skills, photo, verification status)
- Work history (completed jobs, earnings)
- Ratings and endorsements
- Notification preferences

### Contractor
- Company information
- Contact details
- Job statistics
- Rating and feedback
- Favorite workers list

### Job
- Title and description
- Skills required
- Location and duration
- Budget and worker count
- Status and applicants
- Assigned workers and ratings

### Rating
- Job reference
- Worker and Contractor IDs
- Mutual ratings and feedback
- Timestamps

### Skill
- Skill name and category
- Description
- Certification requirements

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to `labourlink-server` directory
2. Copy `.env.example` to `.env` and configure MongoDB URI
3. Install dependencies: `npm install`
4. Start server: `npm run dev` (development) or `npm start` (production)

### Frontend Setup
1. Navigate to `labourlink-client` directory
2. Install dependencies: `npm install`
3. Start dev server: `npm start`
4. Open http://localhost:3000

### MongoDB Configuration
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/labourlink
```

### Environment Variables

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NODE_ENV=development
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Project Workflow

### Worker Workflow
1. Register as worker
2. Complete profile with skills
3. Browse available jobs
4. Apply for jobs
5. Accept job offers
6. Complete work
7. Receive ratings and endorsements
8. Build reputation through work history

### Contractor Workflow
1. Register as contractor
2. Complete company profile
3. Post jobs with skill requirements
4. Review worker applications
5. Accept qualified workers
6. Mark jobs as complete
7. Rate workers and endorse skills
8. Build trusted worker network

## Authentication Flow

1. User registers with email and password
2. Password hashed with bcrypt
3. JWT token generated on login
4. Token stored in localStorage
5. Token included in all API requests
6. Token verified by auth middleware

## Future Enhancements

- [ ] SMS/WhatsApp notifications
- [ ] Video profile submissions
- [ ] AI-based skill verification
- [ ] Payment gateway integration
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Skill certification programs
- [ ] Insurance integration
- [ ] Language localization
- [ ] Dispute resolution system

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## Testing

```
# Backend tests
cd labourlink-server
npm test

# Frontend tests
cd labourlink-client
npm test
```

## Deployment

### Backend (Heroku/AWS)
```
git push heroku main
```

### Frontend (Vercel/Netlify)
```
npm run build
# Deploy build folder to Vercel/Netlify
```

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues and questions, please open an issue on GitHub.

## Authors

LabourLink Development Team

---

**Last Updated**: March 2026
**Version**: 1.0.0
