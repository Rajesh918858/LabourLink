# LabourLink - Quick Start Guide

## Prerequisites
- Node.js v16+ installed
- MongoDB account (Atlas recommended) or local MongoDB
- npm or yarn package manager
- Git (optional)

## 5-Minute Quick Start

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd labourlink-server

# Install dependencies
npm install

# Create .env file (copy from .env.example and update)
# Important: Set your MongoDB URI
cp .env.example .env

# Edit .env with your MongoDB connection string
# Then start the server
npm run dev
```

Expected output:
```
[nodemon] restarting due to changes...
LabourLink Server running on port 5000
MongoDB connected successfully
```

### 2. Frontend Setup (Terminal 2)

```bash
# Navigate to frontend
cd labourlink-client

# Install dependencies
npm install

# The .env is already configured, just start
npm start
```

Expected output:
```
Compiled successfully!
On Your Network: http://192.168.x.x:3000
```

Browser should open automatically to http://localhost:3000

## First Test - Register & Login

### Worker Registration
1. Click "Get Started" or go to `/register`
2. Select "Worker"
3. Fill in details:
   - Name: John Doe
   - Email: worker@example.com
   - Phone: 9876543210
   - Password: Test@123
4. Click Register → You'll be redirected to login

### Worker Login
1. Select "Worker"
2. Enter credentials
3. Click Login → Dashboard displays

### Contractor Registration & Login
Same process but select "Contractor" and add company name

## Creating Your First Job (As Contractor)

1. Login as contractor
2. Go to Contractor Dashboard
3. Click "Post New Job"
4. Fill in job details:
   - Title: "Mason needed for wall repair"
   - Description: "Need experienced mason..."
   - Skills: masonry
   - Location: Mumbai
   - Daily Rate: ₹500
   - Workers Needed: 2
5. Submit job

## Testing API Endpoints

### Using Postman
1. Import JSON into Postman
2. Set variable: `token` from login response
3. Test endpoints with Bearer token

### Example: Register Worker
```
POST http://localhost:5000/api/auth/register-worker
Content-Type: application/json

{
  "name": "Test Worker",
  "email": "test@example.com",
  "phone": "9876543210",
  "password": "password123",
  "location": {
    "city": "Mumbai",
    "state": "Maharashtra"
  },
  "primarySkill": "masonry"
}
```

### Example: Get All Jobs
```
GET http://localhost:5000/api/jobs?status=open
```

### Example: Create Job (With Token)
```
POST http://localhost:5000/api/jobs
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Carpenter needed",
  "description": "Experienced carpenter for 2-week project",
  "skillsRequired": [{"skillName": "carpentry", "level": "intermediate"}],
  "location": {"city": "Mumbai", "address": "Sector 5"},
  "jobType": "project",
  "duration": {"startDate": "2026-04-01", "estimatedDays": 10},
  "workersNeeded": 2,
  "budget": {"dailyRate": 600, "totalBudget": 12000},
  "isUrgent": false
}
```

## Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Make sure MongoDB is running
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Or check local MongoDB
mongod

# Or configure MongoDB Atlas in .env
```

**Port 5000 Already in Use**
```bash
# Kill process using port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in .env to 5001
```

**JWT Errors**
- Check JWT_SECRET in .env is set
- Verify token format in Authorization header: `Bearer <token>`

### Frontend Issues

**Blank Page**
- Open browser console (F12)
- Check for errors
- Verify REACT_APP_API_URL in .env

**API Calls Failing (CORS)**
- Make sure backend is running on port 5000
- Check backend CORS configuration

**Login Not Working**
- Clear browser cache/localStorage
- Check network tab in DevTools
- Verify credentials

## File Locations

### Backend Files
```
labourlink-server/
├── src/
│   ├── models/          # Database schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, validation
│   └── utils/          # Helper functions
├── package.json        # Dependencies
├── .env.example        # Environment template
└── .env               # Your configuration (CREATE THIS)
```

### Frontend Files
```
labourlink-client/
├── src/
│   ├── pages/         # Full pages
│   ├── components/    # Reusable UI
│   ├── services/      # API calls
│   ├── redux/         # State management
│   └── App.jsx        # Main component
├── public/            # Static files
├── package.json       # Dependencies
└── .env              # Already configured
```

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Paste in .env as MONGODB_URI

### Option 2: Local MongoDB
1. Download from https://www.mongodb.com/try/download/community
2. Install and run
3. Connection string: `mongodb://localhost:27017/labourlink`

## Environment Variables Template

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/labourlink
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_chars
JWT_EXPIRE=7d
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Testing Checklist

- [ ] Backend server starts successfully
- [ ] Frontend loads without errors
- [ ] Can register as worker
- [ ] Can register as contractor
- [ ] Can login as both user types
- [ ] Worker can view job listings
- [ ] Contractor can post a job
- [ ] Navigation works correctly
- [ ] Logout clears session

## Next Steps After Setup

1. **Explore Codebase**
   - Read API_DOCUMENTATION.md for all endpoints
   - Check DEVELOPMENT_GUIDE.md for architecture
   - Review FRONTEND_SETUP.md for React structure

2. **Add Features**
   - Implement worker profile page
   - Add job detail view
   - Create application management
   - Add rating system UI

3. **Styling**
   - Customize Tailwind colors
   - Create reusable component library
   - Add responsive design

4. **Testing**
   - Write unit tests
   - Add integration tests
   - Test error scenarios

5. **Deployment**
   - Set up GitHub repository
   - Deploy backend to Heroku/AWS
   - Deploy frontend to Vercel/Netlify

## Common Ports

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017
- API Base: http://localhost:5000/api

## Useful npm Commands

```bash
# Backend
npm run dev          # Development with watch
npm start           # Production
npm test            # Run tests

# Frontend
npm start           # Start dev server
npm run build       # Build for production
npm test            # Run tests
npm run eject       # Expose config (not reversible!)
```

## Support & Documentation

- **API Docs**: See docs/API_DOCUMENTATION.md
- **Frontend Setup**: See docs/FRONTEND_SETUP.md
- **Development**: See docs/DEVELOPMENT_GUIDE.md
- **Main README**: See README.md

## Success Indicators

✅ Backend running on :5000 without errors
✅ Frontend loading at localhost:3000
✅ Can see MongoDB connected message
✅ Can register and login
✅ Dashboards load with correct user type
✅ Navigation works between pages

---

You're all set! 🚀

Start with registering a worker and contractor, post a job, and explore the system.

For detailed API information, see API_DOCUMENTATION.md
