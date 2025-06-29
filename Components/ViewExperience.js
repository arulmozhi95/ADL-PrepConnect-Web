import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewExperience.css"; // Import CSS

// Company List (Easily Expandable)
const companies = [
  "Google", "Microsoft", "Amazon", "Paypal", "D E SHAW", "Arcesium", "Citi Bank",
  "Jp Morgan", "Morgan Stanley", "Walmart", "Myntra", "Infosys", "Oracle"
];

function ViewExperience() {
  const [filters, setFilters] = useState({
    company: "",
    job_type: "",
    year: ""
  });

  const [experiences, setExperiences] = useState([]); // Store experience data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Fetch experiences from backend
  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/view-experience/", {
        params: filters, // Send filters as query params
      });

      setExperiences(response.data);
    } catch (err) {
      setError("Failed to fetch experiences. Try again later.");
      console.error("Error fetching experiences:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch experiences when the component mounts
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="view-experience-container">
      <h2 className="view-experience-title">View Experiences</h2>

      {/* Filter Section */}
      <div className="view-experience-filters">
        {/* Company Dropdown */}
        <select className="view-experience-select" name="company" onChange={handleFilterChange}>
          <option value="">Select Company</option>
          {companies.map((company, index) => (
            <option key={index} value={company}>{company}</option>
          ))}
        </select>

        {/* Job Type Dropdown */}
        <select className="view-experience-select" name="job_type" onChange={handleFilterChange}>
          <option value="">Select Job Type</option>
          <option value="Internship">Internship</option>
          <option value="Fulltime">Full-time</option>
        </select>

        {/* Year Dropdown */}
        <select className="view-experience-select" name="year" onChange={handleFilterChange}>
          <option value="">Select Year</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <button className="view-experience-button" onClick={handleSearch}>Search</button>
      </div>

      {/* Loading State */}
      {loading && <p>Loading experiences...</p>}

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Display Experience Results */}
      <div className="view-experience-results">
        {experiences.length > 0 ? (
          <ul>
            {experiences.map((exp) => (
              <li key={exp.id} className="experience-card">
                <h3 class='company_name'>{exp.company_name}</h3>
                <p><strong>Name:</strong> {exp.name}</p>
                <p><strong>Roll No:</strong> {exp.roll_no}</p>
                <p><strong>Department:</strong> {exp.department}</p>
                <p><strong>Year:</strong> {exp.year}</p>
                <p><strong>Job Type:</strong> {exp.job_type}</p>
                {exp.file && (
                  <p>
                    <strong>File:</strong> 
                    <a href={`http://127.0.0.1:8000${exp.file}`} target="_blank" rel="noopener noreferrer">
                      Download
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No experiences found. Try different filters.</p>
        )}
      </div>
    </div>
  );
}

export default ViewExperience;
