import React, { useState } from "react";
import classes from "./Table.module.css";

const EmployeeTable = (props) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const handleEdit = (id) => {
    setOpenDropdownId(null);
    if (props.onEdit) props.onEdit(id);
  };

  const handleDelete = (id) => {
    setOpenDropdownId(null);
    if (props.onDelete) props.onDelete(id);
  };
  console.log(props.employees);
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
            <th>Employee Address</th>
            <th>Phone No.</th>
            <th>Position</th>
          
            <th>Date of Joining</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.employees.map((candidate, index) => (
            <tr key={candidate.id || candidate._id}>
              <td>{index + 1}</td>
              <td>{candidate.fullName}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.position}</td>
              <td>
                {candidate.dateOfJoining
                  ? new Date(candidate.dateOfJoining).toLocaleDateString(
                      "en-GB"
                    )
                  : ""}
              </td>
             
              <td style={{ position: "relative" }}>
                <button
                  className={classes["action-btn"]}
                  onClick={() => toggleDropdown(candidate._id)}
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
                      onClick={() => handleEdit(candidate._id)}
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
                      onClick={() => handleDelete(candidate._id)}
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

export default EmployeeTable;
