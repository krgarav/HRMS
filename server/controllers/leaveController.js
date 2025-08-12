const Leave = require("../models/leave");
const path = require("path");

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

exports.getApprovedLeaves = async (req, res) => {
  try {
    const approvedLeaves = await Leave.find({ status: "Approve" })
      .populate("candidate", "fullName email position")
      .populate("approvedBy", "name email")
      .sort({ approvedAt: -1 });

    res.status(200).json(approvedLeaves);
  } catch (error) {
    console.error("Error fetching approved leaves:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching approved leaves" });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const leave = await Leave.findById(id);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = status;

    if (status.toLowerCase() === "approved") {
      leave.approvedBy = req.user.id;
      leave.approvedAt = new Date();
    } else {
      leave.approvedBy = undefined;
      leave.approvedAt = undefined;
    }

    await leave.save();

    res
      .status(200)
      .json({ message: "Leave status updated successfully", leave });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.downloadLeaveDoc = async (req, res) => {
  const UPLOAD_DIR = path.resolve(__dirname, "../uploads/leaves");
  const leaveId = req.query.leaveId;

  if (!leaveId) {
    return res.status(400).json({ message: "Leave ID is required" });
  }

  try {
    const leave = await Leave.findById(leaveId);

    if (!leave || !leave.doc) {
      return res.status(404).json({ message: "Leave or document not found" });
    }

    const fileName = path.basename(leave.doc);
    const filePath = path.join(UPLOAD_DIR, fileName);

   
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("File download error:", err);
        return res.status(404).json({ message: "File not found or cannot be downloaded" });
      }
    });
  } catch (error) {
    console.error("Error fetching leave:", error);
    res.status(500).json({ message: "Server error" });
  }
};