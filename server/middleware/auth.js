const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after 'Bearer '

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user info to req object
    req.user = decoded;

    next(); // Move to next middleware/controller
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};