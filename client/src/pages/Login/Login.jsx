import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import dashboardImg from "../../assets/first.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    localStorage.setItem("token", "ojoijoi");
    navigate("/dashboard");
  };

  return (
    <div className={styles.fullWrapper}>
      <div className={styles.registerWrapper}>
        <div className={styles.leftSection}>
          <div className={styles.logo}>LOGO</div>
          <div className={styles.imagePlaceholder}>
            <img src={dashboardImg} alt="Dashboard" />
          </div>
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
          <p>
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>

        <div className={styles.rightSection}>
          <h2>Welcome to Dashboard</h2>
          <form onSubmit={submitHandler} className={styles.form}>
            <label htmlFor="email">
              Email Address<span>*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">
              Password<span>*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className={styles.registerBtn}>
              Login
            </button>
          </form>
          <small>
            Don't have an account? ? <Link to="/register">Register</Link>
          </small>
        </div>
      </div>
    </div>

    // <div>
    //   <form onSubmit={submitHandler}>
    //     <label htmlFor="email">Email Address</label>
    //     <input
    //       type="email"
    //       id="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />

    //     <label htmlFor="password">Password</label>
    //     <input
    //       type="password"
    //       id="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    //   <small>
    //     Don't have an account? ? <Link to="/register">Register</Link>
    //   </small>
    // </div>
  );
};

export default Login;
