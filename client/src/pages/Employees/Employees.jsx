import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import EmployeeTable from "../../UI/EmployeeTable";
import classes from "./Employees.module.css";
import api from "../../common/Interceptors";
import Modal from "../../component/Modal/Modal";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    department: "",
    dateOfJoining: "",
  });
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await api.get("/candidate/get-Employees");
      setEmployees(res.data);
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

  const editHandler = (candidate) => {
    setFormData({
      id : candidate._id,
      fullName: candidate?.fullName,
      email: candidate?.email,
      phone: candidate?.phone,
      position: candidate?.position,
      experience: candidate?.experience,
      department: candidate?.department,
      dateOfJoining: new Date(candidate.dateOfJoining)
        .toISOString()
        .split("T")[0],
    });
    setShowModal(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        dateOfJoining: formData.dateOfJoining
          ? new Date(formData.dateOfJoining).toISOString()
          : null,
      };

      await api.put("/candidate/update-Employees", payload);
      fetchCandidates();
      setShowModal(false);
      toast.success("Employee updated successfully!");
    } catch (err) {
      console.error("Error updating employee:", err);
      toast.error(err.response?.data?.message || "Failed to update employee");
    } finally {
      setIsLoading(false);
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
        </div>
      </div>
      <EmployeeTable employees={employees} onEdit={editHandler} />

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        title="Edit Employee Details"
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
                Department<span>*</span>
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.inputGroup}>
              <label>
                Position<span>*</span>
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Position
                </option>
                <option value="Intern">Intern</option>
                <option value="FullTime">Full Time</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="TeamLeader">Team Leader</option>
              </select>
            </div>
            <div className={classes.inputGroup}>
              <label>
                Date of Joining<span>*</span>
              </label>
              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className={`${classes.saveBtn} ${classes.activeBtn}`}
          >
            Save
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Employees;
