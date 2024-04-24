const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Implementation of verifyToken function
    const token = req.headers.authorization; 

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = verifyToken;
