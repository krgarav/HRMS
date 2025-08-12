const Leave = require("../models/Leave");

exports.applyLeave = async (req, res) => {
  try {
    const { candidateId, leaveDate, reason } = req.body;
    const docPath = req.file ? req.file.path : null; // if file is uploaded

    if (!candidateId || !leaveDate || !docPath) {
      return res.status(400).json({
        message: "Candidate ID, leave date, and document are required",
      });
    }

    const leave = new Leave({
      candidate: candidateId,
      leaveDate,
      reason,
      doc: docPath,
    });

    await leave.save();

    res.status(201).json({
      message: "Leave applied successfully",
      leave,
    });
  } catch (err) {
    console.error("Error applying leave:", err);
    res.status(500).json({ message: "Server error while applying leave" });
  }
};

exports.getAllLeavesWithCandidate = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("candidate")
      .sort({ createdAt: -1 });

    res.status(200).json(leaves);
  } catch (err) {
    console.error("Error fetching leaves with candidate info:", err);
    res.status(500).json({ message: "Server error while fetching leaves" });
  }
};
