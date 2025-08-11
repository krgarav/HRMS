import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import dashboardImg from "../../assets/first.svg";
import axios from "axios";
import { toast } from "react-toastify";
const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      toast.error("Passwords do not match!", { position: "top-right" });
      return;
    }

    const obj = { name: fullname, email, password };

    try {
      const res = await axios.post("http://localhost:5000/users/register", obj);

      toast.success("User registered successfully!", { position: "top-right" });

      // Optional: reset form fields
      setFullname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      const errMsg =
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(errMsg, { position: "top-right" });
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
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
            <label htmlFor="fullname">
              Full name<span>*</span>
            </label>
            <input
              type="text"
              id="fullname"
              placeholder="Full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />

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

            <label htmlFor="confirm-password">
              Confirm Password<span>*</span>
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {!passwordMatch && (
              <p className={styles.errorText}>Passwords do not match</p>
            )}

            <button type="submit" className={styles.registerBtn}>
              Register
            </button>
          </form>
          <small>
            Already have an account? <Link to="/login">Login</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
