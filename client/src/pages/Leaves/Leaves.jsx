import React, { useState } from "react";
import LeaveTable from "../../UI/LeaveTable";
import classes from "./Leaves.module.css";
import { FaSearch } from "react-icons/fa";
import Calendar from "../../component/Calender/Calendar";

const Leaves = () => {
  const [employees, setEmployees] = useState([]);
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
      <div className={classes.bottomRightSection}>
        <div style={{ width: "70%" }}>
          <LeaveTable employees={employees} />
        </div>
        <div style={{ width: "30%", marginTop: "20px" }}>
          <Calendar />
        </div>
      </div>
    </>
  );
};

export default Leaves;
