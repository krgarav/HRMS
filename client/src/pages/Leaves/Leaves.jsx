import React, { useCallback, useEffect, useState } from "react";
import LeaveTable from "../../UI/LeaveTable";
import classes from "./Leaves.module.css";
import { FaSearch } from "react-icons/fa";
import Calendar from "../../component/Calender/Calendar";
import api from "../../common/Interceptors";
import { toast } from "react-toastify";
import Modal from "../../component/Modal/Modal";
import { FiUpload } from "react-icons/fi";

const Leaves = () => {
  const [presentEmployees, setPresentEmployees] = useState([]);
  const [leaveEmployees, setLeaveEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [formData, setFormData] = useState({
    position: "",
  });

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
  // useEffect(() => {
  //   fetchCandidates();
  // }, []);

  const fetchCandidates = async (query) => {
    try {
      const res = await api.get("/candidate/get-present-employees", {
        params: { search: query },
      });
      setPresentEmployees(res.data);
      setShowMenu(true);
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
  const addCandidateHandler = () => {
    setShowModal(true);
  };
  const debouncedFetch = useCallback(debounce(fetchCandidates, 400), []);
  const submitHandler = () => {};
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setPresentEmployees([]);
      setShowMenu(false);
    } else {
      debouncedFetch(value);
    }
  };
  const handleMenuClick = async (empId) => {
    try {
      console.log("Fetching details for employee:", empId);

      const res = await api.get(`/candidate/employee/${empId}`);
      console.log("Candidate details:", res.data);

      // Example: close menu & set search text
      setSearchTerm(res.data.fullName);
      setFormData({ position: res.data.position });
      setShowMenu(false);

      // Example: store details in state for display
      // setSelectedCandidate(res.data);
    } catch (error) {
      console.error("Error fetching candidate:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch candidate details"
      );
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

            <option value="Scheduled">Scheduled</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
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
            Add Leave
          </button>
        </div>
      </div>
      <div className={classes.bottomRightSection}>
        <div style={{ width: "70%" }}>
          <LeaveTable employees={leaveEmployees} />
        </div>
        <div style={{ width: "30%", marginTop: "20px" }}>
          <Calendar />
        </div>
      </div>
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
              <input
                type="text"
                value={searchTerm}
                placeholder="Search Employee Name"
                onChange={handleSearch}
              />
              {showMenu && presentEmployees.length > 0 && (
                <ul className={classes.dropdownMenu}>
                  {presentEmployees.map((emp) => (
                    <li key={emp._id} onClick={() => handleMenuClick(emp._id)}>
                      {emp.fullName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={classes.inputGroup}>
              <input
                type="text"
                placeholder="Designation"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.inputGroup}>
              <input
                placeholder="Leave Date"
                type="date"
                name="leaveDate"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className={classes.inputGroup}>
              <div className={classes.uploadWrapper}>
                <input
                  placeholder="Documents"
                  type="file"
                  name="resume"
                  className={classes.fileInput}
                  onChange={handleChange}
                />
                <FiUpload className={classes.uploadIcon} />
              </div>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.inputGroup}>
              <input
                placeholder="Reason"
                type="text"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </div>
            <div className={classes.inputGroup}></div>
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

export default Leaves;
