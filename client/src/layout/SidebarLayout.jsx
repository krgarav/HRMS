import { Link, Outlet, useNavigate } from "react-router-dom";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { BsBarChartLine, BsStars } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import classes from "./SidebarLayout.module.css";

export default function SidebarLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const result = window.confirm("Are you sure you want to logout?");
    if (!result) return;
    localStorage.removeItem("token");
    navigate("/login");
  };

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
          <Link to="/dashboard" className={classes.navItem}>
            <FiUserPlus /> Candidates
          </Link>
        </div>

        {/* Organization Section */}
        <div className={classes.section}>
          <p className={classes.sectionTitle}>Organization</p>
          <Link to="/employees" className={classes.navItem}>
            <FiUsers /> Employees
          </Link>
          <Link to="/attendance" className={classes.navItem}>
            <BsBarChartLine /> Attendance
          </Link>
          <Link to="/leaves" className={classes.navItem}>
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
        <Outlet />
      </main>
    </div>
  );
}
