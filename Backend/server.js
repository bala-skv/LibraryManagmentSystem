const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const { sendNotification } = require("./services/notificationService")
const reportRoutes = require("./routes/reportRoutes")
const exportRoutes = require("./routes/exportRoutes")
const authRoutes = require("./routes/authRoutes")
// Load environment variables
dotenv.config()

// Connect to the database
connectDB()

const app = express()

// Middleware
const allowedOrigins = ["https://main--lustrous-kitten-c7214d.netlify.app", "http://localhost:3000"]

const  corsOptions = {
  origin: "http://localhost:3000", // or "*" for all origins (use only for development)
  credentials: true
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Routes
app.use("/api/books", require("./routes/bookRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/loans", require("./routes/loanRoutes"))
app.use("/api/inventory", require("./routes/inventoryRoutes"))
app.use("/api/reports", reportRoutes)
app.use("/api/exports", exportRoutes)
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
sendNotification
