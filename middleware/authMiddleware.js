const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Extract token
  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded will have the { id: userId }
    next(); // Proceed to the next middleware or route
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

module.exports = verifyToken;
