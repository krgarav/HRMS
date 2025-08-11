import React, { useEffect, useState } from "react";
import Tables from "../../UI/Tables";
import classes from "./Dashboard.module.css";
import { FaSearch } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import Modal from "../../component/Modal/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../../common/Interceptors";
const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: null,
  });
  const [isSuccess, setIsSuccess] = React.useState(false);
  useEffect(() => {
    fetchCandidates();
  }, [isSuccess, showModal]);

  const fetchCandidates = async () => {
    try {
      const res = await api.get("/candidate/get-candidates");
      setCandidates(res.data);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Error fetching candidates. Please try again."
      );
    }
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const addCandidateHandler = () => {
    setShowModal(true);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check for empty fields
    for (let key in formData) {
      if (!formData[key]) {
        toast.error("Please fill all required fields!", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
    }

    try {
      // Prepare form data for upload
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("position", formData.position);
      data.append("experience", formData.experience);
      data.append("resume", formData.resume); // File object

      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Send request to backend with token in Authorization header
      const res = await axios.post(
        "http://localhost:5000/candidate/add-new-candidate",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Send token here
          },
        }
      );

      toast.success("Candidate details submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      fetchCandidates();
      setIsSuccess(true);
      setShowModal(false);
      console.log("Candidate Details:", res.data);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error submitting candidate details",
        { position: "top-right", autoClose: 3000 }
      );
    }
  };

  // Handle status change
  const handleStatusChange = async (candidateId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/candidate/change-status",
        { candidateId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state for immediate UI feedback
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate._id === candidateId
            ? { ...candidate, status: newStatus }
            : candidate
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.leftSection}>
          <select className={classes.select}>
            <option value="" disabled hidden>
              Status
            </option>
            <option value="New">New</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select className={classes.select}>
            <option>Position</option>
          </select>
        </div>
        <div className={classes.rightSection}>
          <div className={classes.searchBox}>
            <FaSearch className={classes.searchIcon} />
            <input
              type="text"
              placeholder="Search"
              className={classes.searchInput}
            />
          </div>

          <button className={classes.addButton} onClick={addCandidateHandler}>
            Add Candidate
          </button>
        </div>
      </div>
      <Tables candidates={candidates} onStatusChange={handleStatusChange} />

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        title="Add New Candidate"
      >
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes.row}>
            <div className={classes.inputGroup}>
              <label>
                Full Name<span>*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className={classes.inputGroup}>
              <label>
                Email Address<span>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.inputGroup}>
              <label>
                Phone Number<span>*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className={classes.inputGroup}>
              <label>
                Position<span>*</span>
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.inputGroup}>
              <label>
                Experience<span>*</span>
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
            <div className={classes.inputGroup}>
              <label>
                Resume<span>*</span>
              </label>
              <div className={classes.uploadWrapper}>
                <input
                  type="file"
                  name="resume"
                  className={classes.fileInput}
                  onChange={handleChange}
                />
                <FiUpload className={classes.uploadIcon} />
              </div>
            </div>
          </div>

          <div className={classes.declaration}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label>
              I hereby declare that the above information is true to the best of
              my knowledge and belief
            </label>
          </div>

          <button
            type="submit"
            className={`${classes.saveBtn} ${
              isChecked ? classes.activeBtn : ""
            }`}
            disabled={!isChecked}
          >
            Save
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Dashboard;
