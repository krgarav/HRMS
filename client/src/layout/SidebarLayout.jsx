import { Link, Outlet, useNavigate } from "react-router-dom";

export default function SidebarLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const result = window.confirm("Are you sure you want to logout?");
    if (!result) return;
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#2c3e50",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>Logo</h2>
        <input type="text" placeholder="Search" />
        <nav>
          <h2>Recruitment</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/dashboard" style={{ color: "#fff" }}>
                Candidates
              </Link>
            </li>
          </ul>
          <h2>Organisation</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/employees" style={{ color: "#fff" }}>
                Employees
              </Link>
            </li>
            <li>
              <Link to="/attendance" style={{ color: "#fff" }}>
                Attendance
              </Link>
            </li>
            <li>
              <Link to="/leaves" style={{ color: "#fff" }}>
                Leaves
              </Link>
            </li>
          </ul>
        </nav>
        <button
          style={{
            marginTop: "20px",
            background: "#e74c3c",
            color: "#fff",
            padding: "8px 12px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
