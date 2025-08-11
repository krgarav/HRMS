import React, { useEffect, useState } from "react";
import Tables from "../../UI/Tables";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import EmployeeTable from "../../UI/EmployeeTable";
import classes from "./Employees.module.css";
import api from "../../common/Interceptors";

const Employees = () => {
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
      <EmployeeTable employees={employees} />
    </>
  );
};

export default Employees;
