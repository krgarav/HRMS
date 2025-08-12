import React, { useState } from "react";
import classes from "./Table.module.css";
import { FiFileText } from "react-icons/fi";
const LeaveTable = (props) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
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
            <th>Name</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Docs</th>
          </tr>
        </thead>
        <tbody>
          {props.employees.map((candidate, index) => (
            <tr key={candidate.id}>
              <td>{index + 1}</td>
              <td>{candidate.candidate.fullName}</td>
              <td>
                {new Date(candidate.leaveDate).toISOString().split("T")[0]}
              </td>
              <td>{candidate.reason}</td>

              <td>
                <select
                  value={candidate.status || "New"}
                  onChange={(e) =>
                    props.onStatusChange(candidate._id, e.target.value)
                  }
                >
                  <option value="Pending" disabled hidden>
                    Pending
                  </option>
                  <option value="Selected">Approve</option>
                  <option value="Rejected">Reject</option>
                </select>
              </td>

              <td>
                <button className={classes["action-btn"]}>
                  <FiFileText size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;
