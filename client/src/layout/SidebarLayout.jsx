import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { BsBarChartLine, BsStars } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import classes from "./SidebarLayout.module.css";
import Navbar from "../component/Navbar/Navbar";

export default function SidebarLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    const result = window.confirm("Are you sure you want to logout?");
    if (!result) return;
    localStorage.removeItem("token");
    navigate("/login");
  };
  const isActive = (path) => location.pathname === path;

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/employees": "Employees",
    "/attendance": "Attendance",
    "/leaves": "Leaves",
  };
  const title = pageTitles[location.pathname] || "Candidates";

  return (
    <div className={classes.layout}>
      {/* Sidebar */}
      <aside className={classes.sidebar}>
        <div className={classes.logo}>LOGO</div>

        {/* Search Bar */}
        <div className={classes.searchBox}>
          <CiSearch className={classes.searchIcon} />
          <input type="text" placeholder="Search" />
        </div>

        {/* Recruitment Section */}
        <div className={classes.section}>
          <p className={classes.sectionTitle}>Recruitment</p>
          <Link
            to="/dashboard"
            className={`${classes.navItem} ${
              isActive("/dashboard") ? classes.active : ""
            }`}
          >
            <FiUserPlus /> Candidates
          </Link>
        </div>

        {/* Organization Section */}
        <div className={classes.section}>
          <p className={classes.sectionTitle}>Organization</p>
          <Link
            to="/employees"
            className={`${classes.navItem} ${
              isActive("/employees") ? classes.active : ""
            }`}
          >
            <FiUsers /> Employees
          </Link>
          <Link
            to="/attendance"
            className={`${classes.navItem} ${
              isActive("/attendance") ? classes.active : ""
            }`}
          >
            <BsBarChartLine /> Attendance
          </Link>
          <Link
            to="/leaves"
            className={`${classes.navItem} ${
              isActive("/leaves") ? classes.active : ""
            }`}
          >
            <BsStars /> Leaves
          </Link>
        </div>

        {/* Others Section */}
        <div className={classes.section}>
          <p className={classes.sectionTitle}>Others</p>
          <button className={classes.logoutBtn} onClick={handleLogout}>
            <IoExitOutline /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={classes.mainContent}>
        <Navbar title={title} />
        <Outlet />
      </main>
    </div>
  );
}
