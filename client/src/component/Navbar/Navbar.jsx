import React from "react";
import { FaEnvelope, FaBell } from "react-icons/fa";
import profilePic from "../../assets/profile.svg";
import classes from "./Navbar.module.css";
const Navbar = (props) => {
  return (
    <div className={classes.navbar}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.icons}>
        <FaEnvelope className={classes.icon} />
        <div className={classes.notification}>
          <FaBell className={classes.icon} />
          <span className={classes.badge}></span>
        </div>
        <img
          className={classes.avatar}
          src={profilePic}
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default Navbar;
