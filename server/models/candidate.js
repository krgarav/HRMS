// models/Candidate.js
const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, default: null },
    status: { type: String, required: true, default: "New" },
    dateOfJoining: { type: Date, default: null },
    experience: { type: String, required: true },
    resumePath: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);
