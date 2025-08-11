import React from "react";
import { FaSearch } from "react-icons/fa";
import classes from "./Attendance.module.css";
const Attendance = () => {

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
    </>
  );
};

export default Attendance;
