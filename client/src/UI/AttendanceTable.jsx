import React from "react";
import classes from "./Table.module.css";
import { useState } from "react";

const AttendanceTable = (props) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  return (
    <div className={classes["table-container"]}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Employee Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.employees.map((candidate, index) => (
            <tr key={candidate.id || candidate._id}>
              <td>{index + 1}</td>
              <td>{candidate.fullName}</td>
              <td>{candidate.position}</td>
              <td>{candidate.department}</td>

              <td>
                <select
                  value={candidate.attendanceStatus || "Absent"}
                  onChange={(e) =>
                    props.onStatusChange(candidate._id, e.target.value)
                  }
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>

              <td style={{ position: "relative" }}>
                <button
                  className={classes["action-btn"]}
                  //   onClick={() => toggleDropdown(candidate._id)}
                >
                  ⋮
                </button>

                {openDropdownId === candidate._id && (
                  <div
                    className={classes["dropdown-menu"]}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "100%",
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      zIndex: 1000,
                      minWidth: "100px",
                    }}
                  >
                    <button
                      //   onClick={() => handleEdit(candidate._id)}
                      className={classes["dropdown-item"]}
                      style={{
                        padding: "8px 12px",
                        width: "100%",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      //   onClick={() => handleDelete(candidate._id)}
                      className={classes["dropdown-item"]}
                      style={{
                        padding: "8px 12px",
                        width: "100%",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        color: "red",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
