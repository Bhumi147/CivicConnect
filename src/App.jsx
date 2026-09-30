
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./App.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const complaints = [
  {
    id: "CIV-001",
    issue: "Garbage Overflow",
    location: "Indirapuram",
    priority: "High",
    status: "Pending",
    department: "Sanitation Department",
    officer: "Rajesh Verma",
    expectedDate: "28 Sep 2026",
    lat: 28.6469,
    lng: 77.3715,
  },
  {
    id: "CIV-002",
    issue: "Street Light Not Working",
    location: "Vaishali",
    priority: "Medium",
    status: "In Progress",
    department: "Electrical Department",
    officer: "Neha Singh",
    expectedDate: "29 Sep 2026",
    lat: 28.6492,
    lng: 77.339,
  },
  {
    id: "CIV-003",
    issue: "Pothole on Road",
    location: "Vasundhara",
    priority: "High",
    status: "Pending",
    department: "Road Department",
    officer: "Amit Gupta",
    expectedDate: "27 Sep 2026",
    lat: 28.6692,
    lng: 77.369,
  },
  {
    id: "CIV-004",
    issue: "Water Leakage",
    location: "Crossings Republik",
    priority: "Medium",
    status: "Resolved",
    department: "Water Department",
    officer: "Pooja Sharma",
    expectedDate: "30 Sep 2026",
    lat: 28.622,
    lng: 77.438,
  },
  {
    id: "CIV-005",
    issue: "Open Drain",
    location: "Indirapuram",
    priority: "High",
    status: "In Progress",
    department: "Sanitation Department",
    officer: "Vikas Kumar",
    expectedDate: "01 Oct 2026",
    lat: 28.6425,
    lng: 77.375,
  },
];

function App() {
  const [page, setPage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // AI Analysis selected complaint
  const [aiComplaint, setAiComplaint] = useState(null);

  const filteredComplaints = complaints.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      item.id.toLowerCase().includes(searchText) ||
      item.issue.toLowerCase().includes(searchText) ||
      item.location.toLowerCase().includes(searchText)
    );
  });

  function renderComplaintsTable(data) {
    return (
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Issue</th>
              <th>Location</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.id}</strong>
                </td>

                <td>{item.issue}</td>

                <td>📍 {item.location}</td>

                <td>{item.priority}</td>

                <td>{item.status}</td>

                <td>
                  <button
                    className="view-button"
                    onClick={() => setSelectedComplaint(item)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <p className="empty-state">No complaints found.</p>
        )}
      </div>
    );
  }

  function DashboardPage() {
    return (
      <>
        <div className="page-title">
          <h1>Dashboard</h1>
          <p>
            Overview of civic complaints and resolution progress.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <p>Total Complaints</p>
              <h2>124</h2>
            </div>
            <span className="stat-icon">📋</span>
          </div>

          <div className="stat-card">
            <div>
              <p>Pending</p>
              <h2>42</h2>
            </div>
            <span className="stat-icon">⏳</span>
          </div>

          <div className="stat-card">
            <div>
              <p>In Progress</p>
              <h2>36</h2>
            </div>
            <span className="stat-icon">🔧</span>
          </div>

          <div className="stat-card">
            <div>
              <p>Resolved</p>
              <h2>46</h2>
            </div>
            <span className="stat-icon">✅</span>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div>
              <h2>Recent Complaints</h2>
              <p>Latest reported civic issues.</p>
            </div>

            <button
              className="secondary-button"
              onClick={() => setPage("All Complaints")}
            >
              View All
            </button>
          </div>

          {renderComplaintsTable(complaints.slice(0, 4))}
        </div>
      </>
    );
  }

  function AllComplaintsPage() {
    return (
      <>
        <div className="page-title">
          <h1>All Complaints</h1>
          <p>
            Search and manage all reported civic complaints.
          </p>
        </div>

        <div className="content-card">
          <div className="filter-row">
            <input
              className="search-input"
              type="text"
              placeholder="Search complaint, issue or location..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {renderComplaintsTable(filteredComplaints)}
        </div>
      </>
    );
  }

  function StatusPage({ status }) {
    const statusComplaints = complaints.filter(
      (item) => item.status === status
    );

    return (
      <>
        <div className="page-title">
          <h1>{status} Complaints</h1>

          <p>
            Complaints currently marked as{" "}
            {status.toLowerCase()}.
          </p>
        </div>

        <div className="content-card">
          {renderComplaintsTable(statusComplaints)}
        </div>
      </>
    );
  }

  function MapPage() {
    return (
      <>
        <div className="page-title">
          <h1>Complaint Map</h1>

          <p>
            Real interactive map showing complaint locations.
          </p>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div>
              <h2>Complaint Locations</h2>

              <p>
                Click any marker to view complaint details.
              </p>
            </div>
          </div>

          <div
            style={{
              height: "500px",
              marginTop: "20px",
              borderRadius: "18px",
              overflow: "hidden",
            }}
          >
            <MapContainer
              center={[28.6469, 77.3715]}
              zoom={13}
              dragging={true}
              touchZoom={true}
              doubleClickZoom={true}
              scrollWheelZoom={true}

              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {complaints.map((item) => (
                <Marker
                  key={item.id}
                  position={[item.lat, item.lng]}
                >
                  <Popup>
                    <div>
                      <h3>{item.issue}</h3>

                      <p>
                        <strong>ID:</strong> {item.id}
                      </p>

                      <p>
                        <strong>Area:</strong>{" "}
                        {item.location}
                      </p>

                      <p>
                        <strong>Priority:</strong>{" "}
                        {item.priority}
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        {item.status}
                      </p>

                      <button
                        className="view-button"
                        onClick={() =>
                          setSelectedComplaint(item)
                        }
                      >
                        View Full Details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h3>Map Legend</h3>

            <p>📍 Complaint location</p>
            <p>🔴 High priority complaint</p>
            <p>🟠 Medium priority complaint</p>
          </div>
        </div>
      </>
    );
  }

  function HeatmapPage() {
    return (
      <>
        <div className="page-title">
          <h1>Complaint Heatmap</h1>

          <p>
            Area-wise concentration of civic complaints.
          </p>
        </div>

        <div className="content-card">
          <h2>Complaint Density</h2>

          <div
            style={{
              height: "500px",
              marginTop: "20px",
              borderRadius: "18px",
              overflow: "hidden",
            }}
          >
            <MapContainer
              center={[28.6469, 77.3715]}
              zoom={12}
              dragging={true}
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {complaints.map((item) => (
                <Circle
                  key={item.id}
                  center={[item.lat, item.lng]}
                  radius={500}
                  pathOptions={{
                    color:
                      item.priority === "High"
                        ? "red"
                        : "orange",
                    fillColor:
                      item.priority === "High"
                        ? "red"
                        : "orange",
                    fillOpacity: 0.25,
                  }}
                >
                  <Popup>
                    <strong>{item.location}</strong>

                    <br />

                    {item.issue}
                  </Popup>
                </Circle>
              ))}
            </MapContainer>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h3>Heatmap Legend</h3>

            <p>🔴 High priority / high-density area</p>
            <p>🟠 Medium priority area</p>
          </div>
        </div>
      </>
    );
  }

  function AnalyticsPage() {
    const total = complaints.length;

    const pending = complaints.filter(
      (item) => item.status === "Pending"
    ).length;

    const inProgress = complaints.filter(
      (item) => item.status === "In Progress"
    ).length;

    const resolved = complaints.filter(
      (item) => item.status === "Resolved"
    ).length;

    const highPriority = complaints.filter(
      (item) => item.priority === "High"
    ).length;

    const mediumPriority = complaints.filter(
      (item) => item.priority === "Medium"
    ).length;

    const areas = [
      "Indirapuram",
      "Vaishali",
      "Vasundhara",
      "Crossings Republik",
    ];

    return (
      <>
        <div className="page-title">
          <h1>Complaint Analytics</h1>

          <p>
            Area-wise and status-wise analysis of civic
            complaints.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <p>Total Complaints</p>
              <h2>{total}</h2>
            </div>

            <span className="stat-icon">📋</span>
          </div>

          <div className="stat-card">
            <div>
              <p>Pending</p>
              <h2>{pending}</h2>
            </div>

            <span className="stat-icon">⏳</span>
          </div>

          <div className="stat-card">
            <div>
              <p>In Progress</p>
              <h2>{inProgress}</h2>
            </div>

            <span className="stat-icon">🔧</span>
          </div>

          <div className="stat-card">
            <div>
              <p>Resolved</p>
              <h2>{resolved}</h2>
            </div>

            <span className="stat-icon">✅</span>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div>
              <h2>Complaints by Area</h2>

              <p>
                Distribution of reported complaints across
                different locations.
              </p>
            </div>
          </div>

          <div style={{ marginTop: "25px" }}>
            {areas.map((area) => {
              const areaComplaints = complaints.filter(
                (item) => item.location === area
              );

              const percentage =
                total === 0
                  ? 0
                  : Math.round(
                      (areaComplaints.length / total) * 100
                    );

              return (
                <div
                  key={area}
                  style={{
                    marginBottom: "25px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <strong>📍 {area}</strong>

                    <span>
                      {areaComplaints.length} complaints
                    </span>
                  </div>

                  <div
                    style={{
                      height: "12px",
                      background: "#e7ece9",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${percentage}%`,
                        height: "100%",
                        background: "#123b2a",
                        borderRadius: "10px",
                      }}
                    />
                  </div>

                  <small style={{ color: "#718078" }}>
                    {percentage}% of total complaints
                  </small>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div className="content-card">
            <h2>Priority Analysis</h2>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "25px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: "25px",
                  background: "#fff1f1",
                  borderRadius: "14px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "28px" }}>🔴</div>

                <h2>{highPriority}</h2>

                <p>High Priority</p>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: "25px",
                  background: "#fff7e8",
                  borderRadius: "14px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "28px" }}>🟠</div>

                <h2>{mediumPriority}</h2>

                <p>Medium Priority</p>
              </div>
            </div>
          </div>

          <div className="content-card">
            <h2>Status Analysis</h2>

            <div style={{ marginTop: "20px" }}>
              <div
                style={{
                  padding: "15px",
                  marginBottom: "10px",
                  background: "#fff7e8",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <strong>⏳ Pending</strong>

                <strong>{pending}</strong>
              </div>

              <div
                style={{
                  padding: "15px",
                  marginBottom: "10px",
                  background: "#eef5ff",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <strong>🔧 In Progress</strong>

                <strong>{inProgress}</strong>
              </div>

              <div
                style={{
                  padding: "15px",
                  background: "#edf8f0",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <strong>✅ Resolved</strong>

                <strong>{resolved}</strong>
              </div>
            </div>
          </div>
        </div>

        <div
          className="content-card"
          style={{ marginTop: "20px" }}
        >
          <h2>Resolution Performance</h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "25px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                background:
                  "conic-gradient(#123b2a 0deg 260deg, #e7ece9 260deg 360deg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                72%
              </div>
            </div>

            <div>
              <h3>Resolution Rate</h3>

              <p style={{ color: "#718078" }}>
                Percentage of complaints successfully resolved.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  function UsersPage() {
    const users = [
      ["Rahul Kumar", "Citizen", "Indirapuram", 8],
      ["Priya Singh", "Citizen", "Vaishali", 5],
      ["Rajesh Verma", "Officer", "Indirapuram", 0],
      ["Neha Singh", "Officer", "Vaishali", 0],
      ["Amit Gupta", "Officer", "Vasundhara", 0],
    ];

    return (
      <>
        <div className="page-title">
          <h1>Users</h1>

          <p>Manage citizens and authority users.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <p>Total Users</p>
              <h2>248</h2>
            </div>

            <span className="stat-icon">👥</span>
          </div>

          <div className="stat-card">
            <div>
              <p>Citizens</p>
              <h2>214</h2>
            </div>

            <span className="stat-icon">🧑</span>
          </div>

          <div className="stat-card">
            <div>
              <p>Officers</p>
              <h2>28</h2>
            </div>

            <span className="stat-icon">👮</span>
          </div>

          <div className="stat-card">
            <div>
              <p>Active Users</p>
              <h2>239</h2>
            </div>

            <span className="stat-icon">🟢</span>
          </div>
        </div>

        <div className="content-card">
          <h2>Registered Users</h2>

          <div
            className="table-wrapper"
            style={{ marginTop: "20px" }}
          >
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Area</th>
                  <th>Complaints</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user[0]}>
                    <td>
                      <strong>{user[0]}</strong>
                    </td>

                    <td>{user[1]}</td>

                    <td>📍 {user[2]}</td>

                    <td>{user[3]}</td>

                    <td>Active</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  function AIAnalysisPage() {
    function getCategory(item) {
      if (
        item.issue.toLowerCase().includes("garbage")
      ) {
        return "Waste Management";
      }

      if (
        item.issue.toLowerCase().includes("light")
      ) {
        return "Street Infrastructure";
      }

      if (
        item.issue.toLowerCase().includes("pothole")
      ) {
        return "Road Infrastructure";
      }

      if (
        item.issue.toLowerCase().includes("water")
      ) {
        return "Water & Drainage";
      }

      if (
        item.issue.toLowerCase().includes("drain")
      ) {
        return "Drainage";
      }

      return "General Civic Issue";
    }

    function getPriorityScore(item) {
      if (item.priority === "High") return 92;

      if (item.priority === "Medium") return 68;

      return 40;
    }

    return (
      <>
        <div className="page-title">
          <h1>AI / ML Analysis</h1>

          <p>
            AI-assisted complaint classification, priority
            detection and duplicate detection.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <p>AI Classified</p>
              <h2>118</h2>
            </div>

            <span className="stat-icon">🤖</span>
          </div>

          <div className="stat-card">
            <div>
              <p>High Priority</p>
              <h2>38</h2>
            </div>

            <span className="stat-icon">🚨</span>
          </div>

          <div className="stat-card">
            <div>
              <p>Possible Duplicates</p>
              <h2>12</h2>
            </div>

            <span className="stat-icon">🔁</span>
          </div>

          <div className="stat-card">
            <div>
              <p>AI Confidence</p>
              <h2>94%</h2>
            </div>

            <span className="stat-icon">🎯</span>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div>
              <h2>AI Complaint Analysis</h2>

              <p>
                Select a complaint to simulate AI
                classification and priority analysis.
              </p>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            {complaints.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "18px",
                  marginBottom: "12px",
                  border: "1px solid #e2e8e4",
                  borderRadius: "12px",
                }}
              >
                <div>
                  <strong>{item.id}</strong>

                  <h3 style={{ margin: "5px 0" }}>
                    {item.issue}
                  </h3>

                  <span style={{ color: "#718078" }}>
                    📍 {item.location}
                  </span>
                </div>

                <button
                  type="button"
                  className="view-button"
                  onClick={() => setAiComplaint(item)}
                >
                  🤖 Analyze
                </button>
              </div>
            ))}
          </div>
        </div>

        {aiComplaint && (
          <div
            className="content-card"
            style={{ marginTop: "20px" }}
          >
            <div className="card-header">
              <div>
                <h2>🤖 AI Analysis Result</h2>

                <p>{aiComplaint.id}</p>
              </div>

              <button
                type="button"
                className="view-button"
                onClick={() => setAiComplaint(null)}
              >
                Close
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
                marginTop: "25px",
              }}
            >
              <div className="content-card">
                <p>Detected Category</p>

                <h3>
                  {getCategory(aiComplaint)}
                </h3>
              </div>

              <div className="content-card">
                <p>Priority Score</p>

                <h3>
                  {getPriorityScore(aiComplaint)} / 100
                </h3>
              </div>

              <div className="content-card">
                <p>Classification Confidence</p>

                <h3>94%</h3>
              </div>

              <div className="content-card">
                <p>Duplicate Detection</p>

                <h3>Checked ✓</h3>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                borderRadius: "12px",
                background:
                  aiComplaint.priority === "High"
                    ? "#fff1f1"
                    : "#edf8f0",
              }}
            >
              <h3>AI Recommendation</h3>

              <p>
                {aiComplaint.priority === "High"
                  ? "🚨 High priority detected. Immediate attention is recommended."
                  : "🟢 Normal priority detected. Standard resolution workflow recommended."}
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  function CurrentPage() {
    if (page === "Dashboard") {
      return <DashboardPage />;
    }

    if (page === "All Complaints") {
      return <AllComplaintsPage />;
    }

    if (page === "Pending") {
      return <StatusPage status="Pending" />;
    }

    if (page === "In Progress") {
      return <StatusPage status="In Progress" />;
    }

    if (page === "Resolved") {
      return <StatusPage status="Resolved" />;
    }

    if (page === "Map") {
      return <MapPage />;
    }

    if (page === "Heatmap") {
      return <HeatmapPage />;
    }

    if (page === "Analytics") {
      return <AnalyticsPage />;
    }

    if (page === "AI Analysis") {
      return <AIAnalysisPage />;
    }

    if (page === "Users") {
      return <UsersPage />;
    }

    return null;
  }

  const menuItems = [
    ["Dashboard", "🏠"],
    ["All Complaints", "📋"],
    ["Pending", "⏳"],
    ["In Progress", "🔧"],
    ["Resolved", "✅"],
    ["Map", "🗺️"],
    ["Heatmap", "🔥"],
    ["Analytics", "📊"],
    ["AI Analysis", "🤖"],
    ["Users", "👥"],
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">C</div>

          <div>
            <h2>Civic Admin</h2>
            <span>Control Center</span>
          </div>
        </div>

        <nav>
          {menuItems.map((item) => (
            <button
              type="button"
              key={item[0]}
              className={
                page === item[0]
                  ? "menu-item active"
                  : "menu-item"
              }
              onClick={() => {
                setPage(item[0]);

                // Close previous AI result when changing page
                if (item[0] !== "AI Analysis") {
                  setAiComplaint(null);
                }
              }}
            >
              <span>{item[1]}</span>

              {item[0]}
            </button>
          ))}
        </nav>

        <button
  type="button"
  className="logout-button"
  onClick={() => {
    setPage("Dashboard");
    alert("Logged out successfully");
  }}
>
  🚪 Logout
</button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h2>Civic Issue Reporting System</h2>

            <span>Admin Dashboard</span>
          </div>

          <div className="admin-profile">
            <div className="profile-avatar">A</div>

            <div>
              <strong>Admin</strong>

              <span>Administrator</span>
            </div>
          </div>
        </header>

        <section className="page-content">
          <CurrentPage />
        </section>
      </main>

      {selectedComplaint && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedComplaint(null)}
        >
          <div
            className="complaint-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <h2>
                  {selectedComplaint.issue}
                </h2>

                <p>{selectedComplaint.id}</p>
              </div>

            
            </div>

            <div className="complaint-details">
              <p>
                <strong>Location:</strong>{" "}
                {selectedComplaint.location}
              </p>

              <p>
                <strong>Priority:</strong>{" "}
                {selectedComplaint.priority}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedComplaint.status}
              </p>

              <p>
                <strong>Complaint ID:</strong>{" "}
                {selectedComplaint.id}
              </p>
            </div>

            <div className="modal-description">
              <h3>Complaint Details</h3>

              <p>
                Civic issue reported by a citizen. The
                concerned department can review and take
                necessary action.
              </p>
            </div>

            <div className="assignment-box">
              <h3>Complaint Assignment</h3>

              <p>
                <strong>Department:</strong>{" "}
                {selectedComplaint.department}
              </p>

              <p>
                <strong>Assigned Officer:</strong>{" "}
                {selectedComplaint.officer}
              </p>

              <p>
                <strong>Expected Resolution:</strong>{" "}
                {selectedComplaint.expectedDate}
              </p>
            </div>

            <button
              type="button"
              className="close-modal-button"
              onClick={() =>
                setSelectedComplaint(null)
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

