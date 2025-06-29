import { useState } from "react";
import axios from "axios";
import "./ExperienceSharing.css"; // Import CSS

function ExperienceSharing() {
  const [formData, setFormData] = useState({
    name: "",
    roll_no: "",
    department: "CSE",
    company_name: "",
    year: "",
    job_type: "Internship",
    file: null
  });

  const companies = ["Google", "Microsoft", "Amazon", "Paypal","D E SHAW","Arcesium","Citi Bank",
    "Jp Morgan","Morgan Stanley","Walmart","Myntra","Infosys","Oracle","Visa","Qualcomm"
  ]; // Add more if needed

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedExtensions = ["pdf", "doc", "docx"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
  
      if (!allowedExtensions.includes(fileExtension)) {
        alert("Invalid file type! Please upload a PDF or Word document.");
        e.target.value = ""; // Reset the file input
        return;
      }
  
      setFormData({ ...formData, file });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("name", formData.name);
    data.append("roll_no", formData.roll_no);
    data.append("department", formData.department);
    data.append("company_name", formData.company_name);
    data.append("year", formData.year);
    data.append("job_type", formData.job_type);
    data.append("file", formData.file);
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/share-experience/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("Success:", response.data);
      alert("Experience shared successfully!");
    } catch (error) {
      console.error("Error sharing experience:", error.response ? error.response.data : error);
    }
  };
  
  return (
    <div className="experience-sharing-container">
      <h2 className="experience-sharing-title">Share Your Experience</h2>
      <form className="experience-sharing-form" onSubmit={handleSubmit} encType="multipart/form-data">
        
        <div className="experience-sharing-field">
          <label className="experience-sharing-label">Name:</label>
          <input className="experience-sharing-input" type="text" name="name" onChange={handleChange} required />
        </div>

        <div className="experience-sharing-field">
          <label className="experience-sharing-label">Roll No:</label>
          <input className="experience-sharing-input" type="text" name="roll_no" onChange={handleChange} required />
        </div>

        <div className="experience-sharing-field">
          <label className="experience-sharing-label">Department:</label>
          <select className="experience-sharing-select" name="department" onChange={handleChange}>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="AIML">AI & ML</option>
          </select>
        </div>

        <div className="experience-sharing-field">
          <label className="experience-sharing-label">Company Name:</label>
          <select className="experience-sharing-select" name="company_name" onChange={handleChange} required>
            <option value="">Select a Company</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>{company}</option>
            ))}
          </select>
        </div>

        <div className="experience-sharing-field">
          <label className="experience-sharing-label">Year:</label>
          <input
            className="experience-sharing-input"
            type="number"
            name="year"
            onChange={handleChange}
            required
          />
        </div>

        <div className="experience-sharing-field">
          <label className="experience-sharing-label">Job Type:</label>
          <select className="experience-sharing-select" name="job_type" onChange={handleChange}>
            <option value="Internship">Internship</option>
            <option value="Fulltime">Full-time</option>
          </select>
        </div>

        <div className="experience-sharing-field">
        <label className="experience-sharing-label">Upload File:</label>
        <input
            className="experience-sharing-file"
            type="file"
            name="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
        />
        </div>

        <button className="experience-sharing-button" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ExperienceSharing;
