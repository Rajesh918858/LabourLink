import jwt from 'jsonwebtoken';

// Protect routes - verify token
export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    req.userType = decoded.type; // 'worker' or 'contractor'
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Check role (worker or contractor)
export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.userType)) {
      return res.status(403).json({ message: 'Not authorized for this role' });
    }
    next();
  };
};

export default protect;
