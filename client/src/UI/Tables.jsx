import React from "react";
import classes from "./Table.module.css";

const Tables = (props) => {
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
            <th>Candidate Name</th>
            <th>Email Address</th>
            <th>Phone No.</th>
            <th>Position</th>
            <th>Status</th>
            <th>Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.candidates.map((candidate, index) => (
            <tr key={candidate.id}>
              <td>{index + 1}</td>
              <td>{candidate.fullName}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.position}</td>
              <td>
                <select
                  value={candidate.status || "New"}
                  onChange={(e) =>
                    props.onStatusChange(candidate._id, e.target.value)
                  }
                >
                  <option value="New">New</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td>{candidate.experience}</td>
              <td>
                <button class="action-btn"> ⋮ </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
