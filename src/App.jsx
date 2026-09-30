import { useState } from "react";
import Navbar from "./components/Navbar";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

function LocationPicker({ setLocation, setPosition }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      setPosition([lat, lng]);
    },
  });

  return null;
}

function App() {
  const [page, setPage] = useState("login");
  const [complaints, setComplaints] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [issueTitle, setIssueTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState(null);

  /* ================= DASHBOARD ================= */

  if (page === "dashboard") {
    return (
      <div className="app-layout">
        <Navbar page={page} setPage={setPage} />

        <div className="main-area">
          <main className="dashboard-content">

            <div className="welcome-section">
              <div>
                <span className="welcome-label">
                  CITIZEN PORTAL
                </span>

                <h2>Good morning, Citizen 👋</h2>

                <p>
                  Help make your neighbourhood better by reporting
                  civic issues around you.
                </p>
              </div>

              <button
                className="primary-report-button"
                onClick={() => setPage("report")}
              >
                + Report an Issue
              </button>
            </div>

            <div className="dashboard-cards">

              <div className="dashboard-card">
                <div className="stat-top">
                  <span>Total Reports</span>
                  <div className="stat-icon blue">◫</div>
                </div>

                <strong>{complaints.length}</strong>

                <p>Your reported issues</p>
              </div>

              <div className="dashboard-card">
                <div className="stat-top">
                  <span>Pending</span>
                  <div className="stat-icon orange">◷</div>
                </div>

                <strong>
                  {
                    complaints.filter(
                      (c) => c.status === "Pending"
                    ).length
                  }
                </strong>

                <p>Waiting for action</p>
              </div>

              <div className="dashboard-card">
                <div className="stat-top">
                  <span>In Progress</span>
                  <div className="stat-icon purple">↻</div>
                </div>

                <strong>0</strong>

                <p>Currently being resolved</p>
              </div>

              <div className="dashboard-card">
                <div className="stat-top">
                  <span>Resolved</span>
                  <div className="stat-icon green">✓</div>
                </div>

                <strong>0</strong>

                <p>Successfully resolved</p>
              </div>

            </div>

            <div className="content-card">
              <div className="card-header">
                <h2>Quick Actions</h2>
                <p>Manage your civic complaints.</p>
              </div>

              <div className="quick-actions">

                <button
                  className="action-button"
                  onClick={() => setPage("report")}
                >
                  📝 Report an Issue
                </button>

                <button
                  className="action-button"
                  onClick={() => setPage("complaints")}
                >
                  📋 My Complaints
                </button>

                <button
                  className="action-button"
                  onClick={() => setPage("nearby")}
                >
                  📍 Nearby Issues
                </button>

              </div>
            </div>

            <div className="recent-section">

              <div className="recent-header">
                <div>
                  <h2>Recent Complaints</h2>
                  <p>Your latest reported civic issues</p>
                </div>

                <button
                  onClick={() => setPage("complaints")}
                >
                  View All
                </button>
              </div>

              {complaints.length === 0 ? (

                <div className="empty-complaints">
                  <div className="empty-icon">✓</div>

                  <h3>No complaints yet</h3>

                  <p>
                    Your reported issues will appear here.
                  </p>

                  <button
                    onClick={() => setPage("report")}
                  >
                    Report your first issue
                  </button>
                </div>

              ) : (

                complaints
                  .slice(-3)
                  .reverse()
                  .map((complaint, index) => (

                    <div
                      className="recent-complaint"
                      key={index}
                    >
                      <div className="recent-icon">
                        📍
                      </div>

                      <div className="recent-info">
                        <h3>{complaint.title}</h3>

                        <p>
                          {complaint.category} •{" "}
                          {complaint.location}
                        </p>
                      </div>

                      <span className="status-badge">
                        {complaint.status}
                      </span>
                    </div>

                  ))

              )}

            </div>

          </main>
        </div>
      </div>
    );
  }

  /* ================= REPORT ISSUE ================= */

  if (page === "report") {

    if (submitted) {
      return (
        <div className="app-layout">
          <Navbar page={page} setPage={setPage} />

          <div className="main-area">
            <main className="dashboard-content">

              <div className="success-card">

                <div className="success-icon">
                  ✓
                </div>

                <h2>
                  Complaint Submitted Successfully!
                </h2>

                <p>
                  Thank you for helping make your
                  neighbourhood better. Your complaint
                  has been recorded.
                </p>

                <button
                  className="success-button"
                  onClick={() => {
                    setSubmitted(false);
                    setPage("complaints");
                  }}
                >
                  View My Complaints
                </button>

                <button
                  className="success-secondary"
                  onClick={() => {
                    setSubmitted(false);
                    setPage("dashboard");
                  }}
                >
                  Back to Dashboard
                </button>

              </div>

            </main>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard-page">

        <header className="dashboard-header">
          <div>
            <h1>CivicConnect</h1>
            <p>Report Civic Issue</p>
          </div>

          <button
            onClick={() => setPage("dashboard")}
          >
            Back
          </button>
        </header>

        <main className="dashboard-content">

          <div className="page-title">
            <h2>Report an Issue</h2>

            <p>
              Provide details about the civic problem.
            </p>
          </div>

          <div className="content-card">

            <input
              type="text"
              placeholder="Issue Title"
              value={issueTitle}
              onChange={(e) =>
                setIssueTitle(e.target.value)
              }
            />

            <div className="category-box">
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <option value="" disabled>
                  Issue Category
                </option>

                <option>Road / Pothole</option>
                <option>Street Light</option>
                <option>Garbage</option>
                <option>Water Supply</option>
                <option>Drainage</option>
                <option>Other</option>
              </select>
            </div>

            <div className="location-row">
              <input
                type="text"
                placeholder="Issue Location"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />
            </div>

            <p
              style={{
                marginBottom: "10px",
                color: "#667085",
                fontSize: "14px",
              }}
            >
              📍 Click anywhere on the map to select
              the issue location.
            </p>

            <div
              style={{
                height: "350px",
                marginBottom: "20px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #d0d5dd",
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

                <LocationPicker
                  setLocation={setLocation}
                  setPosition={setPosition}
                />

                {position && (
                  <Marker position={position} />
                )}

              </MapContainer>

            </div>

            <textarea
              className="description-box"
              placeholder="Describe the issue"
              rows="5"
            />

            <div className="photo-upload">

              <label className="upload-label">
                📷 Upload Issue Photo
              </label>

              <p>
                Upload a clear photo of the civic issue
              </p>

              <input
                type="file"
                accept="image/*"
              />

            </div>

            <button
              className="action-button"
              onClick={() => {

                const newComplaint = {
                  title: issueTitle,
                  category: category,
                  location: location,
                  status: "Pending",
                };

                setComplaints([
                  ...complaints,
                  newComplaint,
                ]);

                setIssueTitle("");
                setCategory("");
                setLocation("");
                setPosition(null);

                setSubmitted(true);

              }}
            >
              Submit Complaint
            </button>

          </div>

        </main>

      </div>
    );
  }

  /* ================= MY COMPLAINTS ================= */

  if (page === "complaints") {
    return (
      <div className="dashboard-page">

        <header className="dashboard-header">
          <div>
            <h1>CivicConnect</h1>
            <p>My Complaints</p>
          </div>

          <button
            onClick={() => setPage("dashboard")}
          >
            Back
          </button>
        </header>

        <main className="dashboard-content">

          <div className="page-title">
            <h2>My Complaints</h2>

            <p>
              Track the status of your reported civic issues.
            </p>
          </div>

          <div className="content-card">

            {complaints.length === 0 ? (

              <div className="complaint-empty">

                <div className="empty-icon">
                  ✓
                </div>

                <h3>No complaints yet</h3>

                <p>
                  Your submitted civic issues will appear here.
                </p>

                <button
                  onClick={() => setPage("report")}
                >
                  Report an Issue
                </button>

              </div>

            ) : (

              complaints.map((complaint, index) => (

                <div
                  className="my-complaint-card"
                  key={index}
                >

                  <div className="complaint-top">

                    <div>

                      <span className="complaint-id">
                        CIV-
                        {String(index + 1).padStart(3, "0")}
                      </span>

                      <h3>
                        {complaint.title}
                      </h3>

                      <p>
                        {complaint.category} •{" "}
                        {complaint.location}
                      </p>

                    </div>

                    <span className="status-badge">
                      {complaint.status}
                    </span>

                  </div>

                  <div className="complaint-progress">

                    <span className="progress-active">
                      ✓ Submitted
                    </span>

                    <span>
                      Pending
                    </span>

                    <span>
                      In Progress
                    </span>

                    <span>
                      Resolved
                    </span>

                  </div>

                </div>

              ))

            )}

          </div>

        </main>

      </div>
    );
  }

  /* ================= NEARBY ISSUES ================= */
/* ================= NEARBY ISSUES ================= */

if (page === "nearby") {

  const nearbyIssues = [
    {
      id: "CIV-101",
      issue: "Road Pothole",
      category: "Road / Pothole",
      location: "Indirapuram",
      priority: "High",
      status: "Pending",
      lat: 28.6469,
      lng: 77.3715,
    },
    {
      id: "CIV-102",
      issue: "Garbage Dump",
      category: "Garbage",
      location: "Vaishali",
      priority: "Medium",
      status: "In Progress",
      lat: 28.6495,
      lng: 77.3650,
    },
    {
      id: "CIV-103",
      issue: "Street Light Not Working",
      category: "Street Light",
      location: "Vasundhara",
      priority: "Low",
      status: "Pending",
      lat: 28.6550,
      lng: 77.3780,
    },
  ];

  return (
    <div className="dashboard-page">

      <header className="dashboard-header">
        <div>
          <h1>CivicConnect</h1>
          <p>Nearby Issues</p>
        </div>

        <button onClick={() => setPage("dashboard")}>
          Back
        </button>
      </header>

      <main className="dashboard-content">

        <div className="page-title">
          <h2>Nearby Issues 📍</h2>

          <p>
            View civic issues reported near your location.
          </p>
        </div>

        <div className="content-card">

          <div
            style={{
              height: "450px",
              width: "100%",
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid #d0d5dd",
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

              {nearbyIssues.map((item) => (

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
                        <strong>Category:</strong>{" "}
                        {item.category}
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

                    </div>

                  </Popup>

                </Marker>

              ))}

            </MapContainer>

          </div>

        </div>

      </main>

    </div>
  );
}

  /* ================= REGISTER ================= */

  if (page === "register") {
    return (
      <div className="login-page">

        <div className="login-card">

          <h1>CivicConnect</h1>

          <p>
            Create your citizen account
          </p>

          <input
            type="text"
            placeholder="Enter your full name"
          />

          <input
            type="email"
            placeholder="Enter your email"
          />

          <input
            type="tel"
            placeholder="Enter your mobile number"
          />

          <input
            type="password"
            placeholder="Create password"
          />

          <button
            onClick={() => setPage("dashboard")}
          >
            Register
          </button>

          <p className="register-text">
            Already have an account?{" "}

            <b
              onClick={() => setPage("login")}
            >
              Login
            </b>
          </p>

        </div>

      </div>
    );
  }

  /* ================= LOGIN ================= */

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>CivicConnect</h1>

        <p>
          Citizen Issue Reporting System
        </p>

        <input
          type="email"
          placeholder="Enter your email"
        />

        <input
          type="password"
          placeholder="Enter your password"
        />

        <button
          onClick={() => setPage("dashboard")}
        >
          Login
        </button>

        <p className="forgot-password">
          Forgot Password?
        </p>

        <p className="register-text">
          Don't have an account?{" "}

          <b
            onClick={() => setPage("register")}
          >
            Register
          </b>
        </p>

      </div>

    </div>
  );
}

export default App;