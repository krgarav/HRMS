import React, { useEffect, useState } from "react";
import Tables from "../../UI/Tables";
import Navbar from "../../component/Navbar/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import EmployeeTable from "../../UI/EmployeeTable";
const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to view Employees");
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/candidate/get-Employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      <EmployeeTable employees={employees} />
    </>
  );
};

export default Employees;
