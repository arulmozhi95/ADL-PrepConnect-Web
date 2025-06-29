import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import ExperienceSharing from "./Components/ExperienceSharing";
import ViewExperience from "./Components/ViewExperience";
import ScraperButton from "./Components/ScraperButton";
import "./App.css"; // Import the CSS file
import SignupPage from "./Components/SignupPage";
import LoginPage from "./Components/LoginPage";
import { useState, useEffect } from "react";
import Home from "./Components/Home";
import ResumeBuilder from "./Components/ResumeBuilder"
function App() {
  // Check if user info exists in localStorage to persist login across page reloads or new tab
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Handle user logout - Clear from localStorage
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    // Check for any changes in localStorage (in case it's updated by other tabs)
    const onStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  return (
    
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>PrepConnect</h1>
        </header>

        <div className="app-buttons">
          {user ? (
            <>
              <Link to="/share-experience"><button className="app-button">Share Experience</button></Link>
              <Link to="/view-experience"><button className="app-button">View Experience</button></Link>
              <Link to="/learn-coding"><button className="app-button">Learn Coding</button></Link>
              <Link to="/resume-builder"><button className="app-button">Build Your Resume</button></Link>
              <button onClick={handleLogout} className="app-button">Logout</button>
            </>
          ) : (
            <Link to="/login"><button className="app-button">Login</button></Link>
          )}
        </div>

        <div className="app-content">
          <Routes>
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/share-experience" element={user ? <ExperienceSharing /> : <Navigate to="/login" />} />
            <Route path="/view-experience" element={user ? <ViewExperience /> : <Navigate to="/login" />} />
            <Route path="/learn-coding" element={user ? <ScraperButton /> : <Navigate to="/login" />} />
            <Route path="/resume-builder" element={user ? <ResumeBuilder/> : <Navigate to="/login" />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
