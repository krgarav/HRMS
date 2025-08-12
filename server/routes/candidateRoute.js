const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  createCandidate,
  getAllCandidates,
  getEmployees,
  changeStatus,
  updateEmployee,
  changeAttendanceStatus,
  getPresentCandidates,
  getCandidateById,
  deleteCandidate
} = require("../controllers/candidateController");
const auth = require("../middleware/auth");

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const safeEmail = req.body.email
      ? req.body.email.replace(/[^a-zA-Z0-9]/g, "_")
      : "unknown";
    const ext = path.extname(file.originalname) || ".pdf";
    cb(null, `${safeEmail}${ext}`);
  },
});

const upload = multer({ storage });

// Routes
router.post(
  "/add-new-candidate",
  auth,
  upload.single("resume"),
  createCandidate
);
router.delete("/delete-candidate/:id",auth, deleteCandidate);
router.put("/change-status", auth,changeStatus );
router.get("/get-candidates", auth, getAllCandidates);
router.get("/get-Employees", auth, getEmployees);
router.put("/update-Employees", auth, updateEmployee);
router.put("/change-attendance-status", auth,changeAttendanceStatus);

router.get("/get-present-employees", auth, getPresentCandidates);
router.get("/employee/:id", auth, getCandidateById);


module.exports = router;
