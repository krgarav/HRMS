const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoute");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from HRMS API");
});
app.use("/users", userRoutes);
app.use("/candidate", candidateRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
