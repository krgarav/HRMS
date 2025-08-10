import React from "react";
import { FaBars, FaEnvelope, FaUserCircle } from "react-icons/fa";
import classes from "./Navbar.module.css";
const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      {/* Left menu icon */}
      <div className={classes.iconWrapper}>
        <FaBars size={22} />
      </div>

      {/* Center title */}
      <h1 className={classes.title}>My App</h1>

      {/* Right icons */}
      <div className={classes.rightIcons}>
        <FaEnvelope size={20} className={classes.icon} />
        <FaUserCircle size={24} className={classes.icon} />
      </div>
    </nav>
  );
};

export default Navbar;
