const path = require("path");
const Candidate = require("../models/candidate.js");

exports.createCandidate = async (req, res) => {
  try {
    const { fullName, email, phone, position, experience } = req.body;

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
      resumePath: req.file.path,
    });

    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 }); // latest first
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
    }); // latest first
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

    // Find candidate
    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Update status
    candidate.status = status;

    // If status is Selected and dateOfJoining is not already set, set it to today
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
