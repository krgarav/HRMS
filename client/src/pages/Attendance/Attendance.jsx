import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import classes from "./Attendance.module.css";
import AttendanceTable from "../../UI/AttendanceTable";
import api from "../../common/Interceptors";
import { toast } from "react-toastify";
const Attendance = () => {
  const [employees, setEmployees] = useState([]);
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
  const handleStatusChange = async (candidateId, newStatus) => {
    try {
      await api.put("/candidate/change-attendance-status", {
        id: candidateId,
        attendanceStatus: newStatus,
      });

      toast.success("Attendance status updated successfully!");

      setEmployees((prev) =>
        prev.map((c) =>
          c._id === candidateId ? { ...c, attendanceStatus: newStatus } : c
        )
      );
    } catch (error) {
      console.error("Error updating attendance status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update attendance status"
      );
    }
  };
  const addCandidateHandler = () => {};
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
      <AttendanceTable
        employees={employees}
        onStatusChange={handleStatusChange}
      />
    </>
  );
};

export default Attendance;
