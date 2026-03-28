# LabourLink Frontend - Setup Guide

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Git

### Installation

1. Navigate to client folder:
```bash
cd labourlink-client
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create `.env` file with:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm start
```

Server runs on `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.jsx       # Navigation bar
├── pages/               # Page components
│   ├── Home.jsx         # Landing page
│   ├── Login.jsx        # Login page
│   ├── Register.jsx     # Registration page
│   ├── JobListings.jsx  # Jobs list
│   ├── WorkerDashboard.jsx
│   └── ContractorDashboard.jsx
├── services/            # API integration
│   ├── api.js           # Axios instance
│   └── index.js         # API service functions
├── redux/               # State management
│   ├── store.js         # Redux store
│   └── slices/
│       └── authSlice.js
├── styles/              # CSS/Tailwind
├── App.jsx              # Main app component
└── index.js             # Entry point
```

## Key Features Implemented

### 1. Authentication
- Worker and Contractor registration
- Email/password login
- JWT token storage
- Protected routes

### 2. Job Management
- Browse available jobs
- Filter by status
- Search jobs by location
- Apply for jobs
- View job details

### 3. Worker Dashboard
- View profile stats
- Check completed jobs
- Review ratings
- View endorsements

### 4. Contractor Dashboard
- Job posting statistics
- Active jobs overview
- Total spending
- Favorite workers

## Available Pages

### Public Pages
- **Home** (`/`) - Landing page with features
- **Login** (`/login`) - Worker/Contractor login
- **Register** (`/register`) - Registration form
- **Jobs** (`/jobs`) - Browse all jobs

### Protected Pages (Worker)
- **Worker Dashboard** (`/worker-dashboard`) - Worker stats
- **Worker Profile** (`/worker-profile`) - Profile management

### Protected Pages (Contractor)
- **Contractor Dashboard** (`/contractor-dashboard`) - Dashboard stats
- **Contractor Profile** (`/contractor-profile`) - Profile management

## State Management (Redux)

### Auth Slice
```javascript
{
  isAuthenticated: boolean,
  userType: 'worker' | 'contractor',
  user: Object,
  token: string,
  loading: boolean,
  error: string | null
}
```

### Usage Example
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../redux/slices/authSlice';

function MyComponent() {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const handleLogin = (credentials) => {
    // API call then dispatch
    dispatch(loginSuccess({ token, user, userType }));
  };
  
  return (
    // JSX
  );
}
```

## API Integration

### Axios Instance (api.js)
- Configured with base URL from `.env`
- Auto-includes JWT token in Authorization header
- Handles request/response interceptors

### Service Functions (services/index.js)
```javascript
// Example usage
import { authApi, jobApi, workerApi } from '../services/index';

// Login
await authApi.loginWorker({ email, password });

// Get jobs
await jobApi.getAllJobs('open');

// Search workers
await workerApi.searchWorkers('28.6139,77.2090', 'masonry');
```

## Styling

### Tailwind CSS
- Utility-first CSS framework
- Configured in `tailwind.config.js`
- Custom theme variables available

### Example
```jsx
<div className="flex gap-4 p-6 bg-blue-600 text-white rounded-lg">
  <h2 className="text-2xl font-bold">Hello</h2>
</div>
```

## Component Examples

### Protected Route
```jsx
<ProtectedRoute userType="worker">
  <WorkerDashboard />
</ProtectedRoute>
```

### Form Handling
```jsx
const [formData, setFormData] = useState({...});
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
```

### API Calls
```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await jobApi.getAllJobs();
      setJobs(response.data.jobs);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, []);
```

## Building for Production

```bash
npm run build
```

Creates optimized production build in `build/` folder.

## Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop build folder to Netlify
```

### GitHub Pages
Update `package.json`:
```json
"homepage": "https://yourusername.github.io/labourlink"
```

Then:
```bash
npm run build
npm run deploy
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| REACT_APP_API_URL | Yes | http://localhost:5000/api | Backend API URL |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Issue: Blank Page
- Check browser console for errors
- Verify `.env` file is configured
- Ensure backend server is running

### Issue: API Calls Failing
- Check `REACT_APP_API_URL` in `.env`
- Verify backend is running on port 5000
- Check CORS configuration

### Issue: Auth Token Not Persisting
- Verify Redux store is initialized
- Check localStorage is not disabled
- Ensure token is being saved correctly

## Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- Bundle analysis with `source-map-explorer`

## Testing

```bash
npm test                 # Run tests
npm test -- --coverage  # Coverage report
```

## Contributing Guidelines

1. Create feature branch
2. Follow component naming conventions
3. Keep components small and focused
4. Update tests and documentation

## Resources

- [React Documentation](https://react.dev)
- [Redux Documentation](https://redux.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

## Support

For issues: [GitHub Issues](https://github.com/labourlink/labourlink-client/issues)

---

**Last Updated**: March 2026
**Version**: 1.0.0
