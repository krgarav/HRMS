const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    leaveDate: { type: Date, required: true },
    reason: { type: String },
    status: { type: String, default: "Pending" },
    doc: { type: String, required: true },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leave", leaveSchema);
