function Navbar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">C</div>

        <div>
          <h2>CivicConnect</h2>
          <span>Citizen Portal</span>
        </div>
      </div>

      <nav className="nav-menu">
        <button
          className={page === "dashboard" ? "nav-item active" : "nav-item"}
          onClick={() => setPage("dashboard")}
        >
          <span>⌂</span>
          Dashboard
        </button>

        <button
          className={page === "report" ? "nav-item active" : "nav-item"}
          onClick={() => setPage("report")}
        >
          <span>＋</span>
          Report Issue
        </button>

        <button
          className={page === "complaints" ? "nav-item active" : "nav-item"}
          onClick={() => setPage("complaints")}
        >
          <span>▤</span>
          My Complaints
        </button>

        <button
          className={page === "nearby" ? "nav-item active" : "nav-item"}
          onClick={() => setPage("nearby")}
        >
          <span>⌖</span>
          Nearby Issues
        </button>
      </nav>

      <div className="sidebar-bottom">
        <div className="help-box">
          <div className="help-icon">?</div>

          <div
  onClick={() => alert("For support, please contact CivicConnect Help Desk.")}
  style={{ cursor: "pointer" }}
>
  <strong>Need help?</strong>
  <p>We're here for you.</p>
</div>


        <button
          className="logout-button"
          onClick={() => setPage("login")}
        >
          <span>↪</span>
          Logout
        </button>
      </div>
      </div>
    </aside>
  );
}

export default Navbar;