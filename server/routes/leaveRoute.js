const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const {
  applyLeave,
  getAllLeavesWithCandidate,
} = require("../controllers/leaveController");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads/leaves");

    // Check if folder exists, if not create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/apply-leave", auth, upload.single("doc"), applyLeave);
router.get("/all-leaves-with-candidate", auth, getAllLeavesWithCandidate);

module.exports = router;
