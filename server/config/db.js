const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // ⚠️ Deletes everything in the database
    if (process.env.DB_FORCE_RESET === "true") {
      await mongoose.connection.dropDatabase();
      console.log("💥 Database dropped!");
    }
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
