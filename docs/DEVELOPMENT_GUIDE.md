# LabourLink - Development & Architecture Guide

## Architecture Overview

LabourLink follows a **three-tier architecture**:

### 1. Presentation Layer (Frontend)
- React.js single-page application
- Responsive UI with Tailwind CSS
- Redux for state management
- Real-time updates with API polling

### 2. Business Logic Layer (Backend)
- Express.js REST API
- Request validation & authorization
- Database operations
- Business logic implementation

### 3. Data Layer (Database)
- MongoDB for persistent storage
- BSON format for flexible schema
- Indexed queries for performance

## Database Schema Relationships

```
Worker <--> Job <--> Contractor
    |
    v
Rating
    |
    v
Skill (Endorsements)
```

### Key Collections

**workers**
- Primary Key: `_id`
- Indexes: email, phone, location (geospatial)
- Foreign Keys: job history references, endorsements from contractors

**contractors**
- Primary Key: `_id`
- Indexes: email, phone, location (geospatial)
- Foreign Keys: favorite workers list

**jobs**
- Primary Key: `_id`
- Foreign Keys: contractor ID, assigned worker IDs
- Indexes: status, location (geospatial)

**ratings**
- Primary Key: `_id`
- Foreign Keys: jobId, workerId, contractorId
- Composite index on (jobId, workerId, contractorId)

**skills**
- Primary Key: `_id`
- Index: skillName (unique)

## Authentication Flow

```
User Input (Email/Password)
        |
        v
Hash Check (Bcrypt)
        |
        v
JWT Generation
        |
        v
Token Stored (localStorage)
        |
        v
API Requests (Include Bearer Token)
        |
        v
Middleware Auth Check
        |
        v
Payload Decoded & User Identified
```

## API Request/Response Flow

```
Client Request
     |
     v
CORS Middleware
     |
     v
Body Parser Middleware
     |
     v
Auth Middleware (if protected)
     |
     v
Route Handler
     |
     v
Controller (Business Logic)
     |
     v
Model (Database Query)
     |
     v
Response Formatting
     |
     v
Error Handling
     |
     v
Client Response
```

## Folder Structure Rationale

### Backend (`src/`)
- **models/**: Database schemas - centralized data structure
- **controllers/**: Business logic separated from routes
- **routes/**: Endpoint definitions and routing
- **middleware/**: Cross-cutting concerns (auth, validation)
- **utils/**: Reusable helper functions
- **config/**: Configuration files for external services

### Frontend (`src/`)
- **pages/**: Full-page components (routes)
- **components/**: Reusable, smaller UI pieces
- **services/**: API integration layer
- **redux/**: Global state management
- **styles/**: CSS and styling

## Development Workflow

### Setting Up Local Development

1. **Clone Repository**
   ```bash
   git clone https://github.com/labourlink/labourlink.git
   cd labourlink
   ```

2. **Start MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo
   
   # Or use local MongoDB
   mongod
   ```

3. **Start Backend**
   ```bash
   cd labourlink-server
   cp .env.example .env
   npm install
   npm run dev
   ```

4. **Start Frontend** (in new terminal)
   ```bash
   cd labourlink-client
   npm install
   npm start
   ```

5. **Access Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - API: http://localhost:5000/api

## Code Standards

### Naming Conventions
- **Variables/Functions**: camelCase
- **Classes/Components**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Files**: kebab-case for utils, PascalCase for components

### Backend Code Style
```javascript
// Controller example
export const getWorkerProfile = async (req, res) => {
  try {
    const worker = await Worker.findById(req.user);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json({ worker });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};
```

### Frontend Code Style
```javascript
// Component example
function JobCard({ job, onApply }) {
  const [isApplying, setIsApplying] = useState(false);
  
  const handleApply = async () => {
    setIsApplying(true);
    try {
      await onApply(job._id);
    } catch (error) {
      console.error('Error applying:', error);
    } finally {
      setIsApplying(false);
    }
  };
  
  return (
    <div className="card">
      <h3>{job.title}</h3>
      <button onClick={handleApply} disabled={isApplying}>
        {isApplying ? 'Applying...' : 'Apply'}
      </button>
    </div>
  );
}
```

## Common Development Tasks

### Adding a New Feature

1. **Create API Endpoint**
   - Add route in `src/routes/`
   - Add controller in `src/controllers/`
   - Add model if new data type

2. **Create Frontend Page/Component**
   - Add page in `src/pages/`
   - Add components in `src/components/` if reusable
   - Create API service function

3. **Add Redux State** (if needed)
   - Create/update slice in `src/redux/slices/`
   - Use in component via useSelector/useDispatch

4. **Test**
   - Test API with Postman
   - Test Frontend functionality
   - Test error scenarios

### Debugging

**Backend**
```javascript
// Add console logs
console.log('Debug:', variable);

// Use try-catch blocks
try {
  // Code
} catch (error) {
  console.error('Error details:', error);
}
```

**Frontend**
```javascript
// Use React DevTools browser extension
// Use Redux DevTools for state debugging
// Check Network tab for API calls
```

## Performance Considerations

### Database
- Index frequently queried fields
- Use pagination for large result sets
- Use projection to exclude unnecessary fields

### API
- Implement caching for static data
- Use pagination (limit 20-50 items)
- Compress responses

### Frontend
- Code splitting with React.lazy()
- Minimize bundle size
- Use memoization for expensive components

## Security Best Practices

1. **Authentication**
   - Always hash passwords (bcrypt)
   - Use JWT for stateless auth
   - Set secure HTTP-only cookies

2. **Input Validation**
   - Validate all user inputs
   - Use express-validator
   - Sanitize database queries

3. **API Security**
   - Implement rate limiting
   - Use CORS properly
   - Validate request headers

4. **Data Protection**
   - Never store sensitive data in frontend
   - Use HTTPS in production
   - Encrypt sensitive fields

## Testing Strategy

### Unit Tests
```bash
# Backend
npm test

# Frontend
npm test
```

### Integration Tests
- Test API endpoints with database
- Test React components with Redux store

### End-to-End Tests
- Test complete user workflows
- Use Cypress or Playwright

## Deployment Checklist

- [ ] Environment variables set
- [ ] Database migrated
- [ ] API tests passing
- [ ] Frontend builds successfully
- [ ] 404 error pages configured
- [ ] CORS properly configured
- [ ] Error logging set up
- [ ] Performance optimized

## Troubleshooting Guide

### Backend Issues
1. **MongoDB connection fails**
   - Check MONGODB_URI in .env
   - Ensure MongoDB service running
   - Check network firewall

2. **JWT token invalid**
   - Verify JWT_SECRET matches
   - Check token expiration

3. **API 500 errors**
   - Check server logs
   - Validate input data
   - Check database queries

### Frontend Issues
1. **Blank page/white screen**
   - Check browser console
   - Verify API_URL in .env
   - Check Redux store

2. **API calls failing**
   - Check CORS headers
   - Verify backend running
   - Check Authorization header

## Useful Commands

```bash
# Backend
npm run dev              # Development with auto-reload
npm start               # Production
npm test                # Run tests

# Frontend
npm start               # Development server
npm run build           # Production build
npm test                # Run tests
```

## Resources

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [React Best Practices](https://reactjs.org/docs/thinking-in-react.html)
- [Redux Documentation](https://redux.js.org)
- [MongoDB Manual](https://docs.mongodb.com/manual/)

---

**Last Updated**: March 2026
**Version**: 1.0.0
