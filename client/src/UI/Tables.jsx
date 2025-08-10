import React from "react";
import classes from "./Table.module.css";

const Tables = () => {
  const candidates = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      position: "Frontend Developer",
      status: "Shortlisted",
      experience: "3 years",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      position: "Backend Developer",
      status: "Interview Scheduled",
      experience: "5 years",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.j@example.com",
      phone: "555-888-2222",
      position: "UI/UX Designer",
      status: "Pending",
      experience: "2 years",
    },
  ];
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
          {candidates.map((candidate, index) => (
            <tr key={candidate.id}>
              <td>{index + 1}</td>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.position}</td>
              <td>{candidate.status}</td>
              <td>{candidate.experience}</td>
              <td>
                 <button class="action-btn">⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
