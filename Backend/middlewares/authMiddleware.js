// Backend: authMiddleware.js
const jwt = require("jsonwebtoken")
// Replace hardcoded secret with environment variable
const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "")
  console.log("middle: ", token)
  if (!token) {
    return res.status(401).send("Access denied")
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log("decoded: ", decoded)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).send("Invalid token")
  }
}

module.exports = authMiddleware
