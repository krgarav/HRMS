import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {

  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <small>
        Don't have an account? ? <Link to="/register">Register</Link>
      </small>
    </div>
  );
};

export default Login;
