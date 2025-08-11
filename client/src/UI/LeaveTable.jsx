import React, { useState } from "react";
import classes from "./Table.module.css";
const LeaveTable = (props) => {
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
              <td>{candidate.fullName}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.position}</td>
              <td >
                <select
                  value={candidate.status || "New"}
                  onChange={(e) =>
                    props.onStatusChange(candidate._id, e.target.value)
                  }
                >
                  <option value="Selected">Approve</option>
                  <option value="Rejected">Reject</option>
                </select>
              </td>

              <td>
                <button class={classes["action-btn"]}>⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;
