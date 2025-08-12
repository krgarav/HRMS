const path = require("path");
const Candidate = require("../models/candidate.js");

exports.createCandidate = async (req, res) => {
  try {
    const { fullName, email, phone, position, experience, department } =
      req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }
    const existingCandidate = await Candidate.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (existingCandidate) {
      return res.status(409).json({ message: "Candidate already exists" });
    }

    const candidate = new Candidate({
      fullName,
      email,
      phone,
      position,
      experience,
      department,
      resumePath: req.file.path,
    });

    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteCandidate = async (req, res) => {
  const { id } = req.params;

  try {
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    await Candidate.findByIdAndDelete(id);

    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while deleting candidate" });
  }
};

exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.status(200).json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching candidates" });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const candidates = await Candidate.find({ status: "Selected" }).sort({
      createdAt: -1,
    });
    res.status(200).json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching candidates" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { candidateId, status } = req.body;

    if (!candidateId || !status) {
      return res
        .status(400)
        .json({ message: "Candidate ID and status are required" });
    }

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    candidate.status = status;

    if (status === "Selected" && !candidate.dateOfJoining) {
      candidate.dateOfJoining = new Date();
    }

    await candidate.save();

    res.status(200).json({ message: "Status updated successfully", candidate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating status" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    const updatedEmployee = await Candidate.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ message: "Server error while updating employee" });
  }
};

exports.changeAttendanceStatus = async (req, res) => {
  try {
    const { id, attendanceStatus } = req.body;

    if (!id || !attendanceStatus) {
      return res
        .status(400)
        .json({ message: "ID and attendance status are required" });
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      id,
      { attendanceStatus },
      { new: true, runValidators: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({
      message: "Attendance status updated successfully",
      candidate: updatedCandidate,
    });
  } catch (err) {
    console.error("Error updating attendance status:", err);
    res
      .status(500)
      .json({ message: "Server error while updating attendance status" });
  }
};

exports.getPresentCandidates = async (req, res) => {
  try {
    const { search } = req.query;

    const filter = { attendanceStatus: "Present" };

    if (search && search.trim() !== "") {
      filter.fullName = { $regex: search, $options: "i" };
    }

    const candidates = await Candidate.find(filter).sort({ createdAt: -1 });

    res.status(200).json(candidates);
  } catch (err) {
    console.error("Error fetching present candidates:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching present candidates" });
  }
};
exports.getCandidateById = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json(candidate);
  } catch (err) {
    console.error("Error fetching candidate by ID:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching candidate details" });
  }
};
