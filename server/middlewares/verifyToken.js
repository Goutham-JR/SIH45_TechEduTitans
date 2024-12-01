const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token; // Extract token from cookies
  if (!token) {
    return res.status(401).json({ error: "Unauthorized. No token provided." });
  }

  const secretKey = process.env.JWT_SECRET || "defaultsecret"; // Use the secret key
  try {
    const decoded = jwt.verify(token, secretKey); // Verify the token
    console.log("Decoded Token:", decoded); // Log decoded token
    req.user = decoded; // Attach decoded user info to the request
    next(); // Proceed to the next middleware
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
