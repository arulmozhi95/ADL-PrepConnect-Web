import React, { useState } from "react";
import "./Form.css";

const ResumeEditor = ({ formData, setFormData }) => {
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [activeProject, setActiveProject] = useState(0);
  const [activeEducation, setActiveEducation] = useState(0);

  // Local state for each section
  const [localProfile, setLocalProfile] = useState(formData.profile);
  const [localProjects, setLocalProjects] = useState(formData.projects);
  const [localEducation, setLocalEducation] = useState(formData.education);
  const [localSkills, setLocalSkills] = useState(formData.skills);
  const [localAchievements, setLocalAchievements] = useState(formData.achievements);
  const [localCoursework, setLocalCoursework] = useState(formData.coursework);

  const handleInputChange = (e, section, field) => {
    if (section === "profile") {
      setLocalProfile({ ...localProfile, [field]: e.target.value });
    }
  };

  const handleArrayChange = (e, section, index, field) => {
    if (section === "projects") {
      const updatedProjects = [...localProjects];
      updatedProjects[index][field] = e.target.value;
      setLocalProjects(updatedProjects);
    } else if (section === "education") {
      const updatedEducation = [...localEducation];
      updatedEducation[index][field] = e.target.value;
      setLocalEducation(updatedEducation);
    } else if (section === "skills") {
      const updatedSkills = [...localSkills];
      updatedSkills[index] = e.target.value;
      setLocalSkills(updatedSkills);
    } else if (section === "achievements") {
      const updatedAchievements = [...localAchievements];
      updatedAchievements[index] = e.target.value;
      setLocalAchievements(updatedAchievements);
    } else if (section === "coursework") {
      const updatedCoursework = [...localCoursework];
      updatedCoursework[index] = e.target.value;
      setLocalCoursework(updatedCoursework);
    }
  };

  const addNewEducation = () => {
    setLocalEducation([...localEducation, { degree: "", institution: "", year: "", grade: "" }]);
    setActiveEducation(localEducation.length);
  };

  const removeEducation = (index) => {
    if (localEducation.length > 1) {
      const updatedEducation = localEducation.filter((_, i) => i !== index);
      setLocalEducation(updatedEducation);
      setActiveEducation(0);
    }
  };

  const addNewProject = () => {
    setLocalProjects([...localProjects, { title: "", line1: "", line2: "", deployedLink: "" }]);
    setActiveProject(localProjects.length);
  };

  const removeProject = (index) => {
    if (localProjects.length > 1) {
      const updatedProjects = localProjects.filter((_, i) => i !== index);
      setLocalProjects(updatedProjects);
      setActiveProject(0);
    }
  };

  const handleSave = (section) => {
    if (section === "profile") {
      setFormData({ ...formData, profile: localProfile });
    } else if (section === "projects") {
      setFormData({ ...formData, projects: localProjects });
    } else if (section === "education") {
      setFormData({ ...formData, education: localEducation });
    } else if (section === "skills") {
      setFormData({ ...formData, skills: localSkills });
    } else if (section === "achievements") {
      setFormData({ ...formData, achievements: localAchievements });
    } else if (section === "coursework") {
      setFormData({ ...formData, coursework: localCoursework });
    }
    console.log(`Saved ${section}:`, formData[section]);
  };

  return (
    <div className="resume-editor">
       <h1 className="resume-heading">BUILD YOUR RESUME HERE</h1>
      <div className="tabs">
        {["Basic Info", "Projects", "Education", "Skills", "Achievements", "Coursework"].map((tab) => (
          <button key={tab} className={`tab-button ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "Basic Info" && (
          <div className="section">
            <h3>Basic Info</h3>
            <input type="text" placeholder="Name" value={localProfile.name} onChange={(e) => handleInputChange(e, "profile", "name")} />
            <input type="text" placeholder="About" value={localProfile.about} onChange={(e) => handleInputChange(e, "profile", "about")} />
            <input type="email" placeholder="Email" value={localProfile.email} onChange={(e) => handleInputChange(e, "profile", "email")} />
            <input type="text" placeholder="Phone" value={localProfile.phone} onChange={(e) => handleInputChange(e, "profile", "phone")} />
            <input type="text" placeholder="Address" value={localProfile.address} onChange={(e) => handleInputChange(e, "profile", "address")} />
            <input type="text" placeholder="GitHub Link" value={localProfile.github} onChange={(e) => handleInputChange(e, "profile", "github")} />
            <input type="text" placeholder="LinkedIn Link" value={localProfile.linkedin} onChange={(e) => handleInputChange(e, "profile", "linkedin")} />
            <div className="file-input-container">
    <label htmlFor="profile-upload" className="custom-file-upload">
      Upload Your Profile
    </label>
    <input
      id="profile-upload"
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setLocalProfile({ ...localProfile, profileImage: imageUrl });
        }
      }}
      style={{ display: "none" }} // Hide the default file input
    />
  </div>
  <button className="save-button" onClick={() => handleSave("profile")}>Save</button>
</div>
        )}
        {activeTab === "Projects" && (
          <div className="section">
            <h3>Projects</h3>
            <div className="project-tabs">
              {localProjects.map((project, index) => (
                <button key={index} className={`project-tab ${index === activeProject ? "active" : ""}`} onClick={() => setActiveProject(index)}>
                  {project.title || `Project ${index + 1}`}
                </button>
              ))}
              <button className="add-project" onClick={addNewProject}>+ New</button>
            </div>
            {localProjects.length > 0 && localProjects[activeProject] && (
              <div className="project-card">
                <input
                  type="text"
                  placeholder="Title"
                  value={localProjects[activeProject]?.title || ""}
                  onChange={(e) => handleArrayChange(e, "projects", activeProject, "title")}
                />
                <input
                  type="text"
                  placeholder="Line 1 Description"
                  value={localProjects[activeProject]?.line1 || ""}
                  onChange={(e) => handleArrayChange(e, "projects", activeProject, "line1")}
                />
                <input
                  type="text"
                  placeholder="Line 2 Description"
                  value={localProjects[activeProject]?.line2 || ""}
                  onChange={(e) => handleArrayChange(e, "projects", activeProject, "line2")}
                />
                <input
                  type="text"
                  placeholder="Deployment Link"
                  value={localProjects[activeProject]?.deployedLink || ""}
                  onChange={(e) => handleArrayChange(e, "projects", activeProject, "deployedLink")}
                />
                <button className="delete-button" onClick={() => removeProject(activeProject)}>Delete</button>
              </div>
            )}
            <button className="save-button" onClick={() => handleSave("projects")}>Save</button>
          </div>
        )}
        {activeTab === "Education" && (
          <div className="section">
            <h3>Education</h3>
            <div className="education-tabs">
              {localEducation.map((edu, index) => (
                <button key={index} className={`edu-tab ${index === activeEducation ? "active" : ""}`} onClick={() => setActiveEducation(index)}>
                  {edu.degree || `Education ${index + 1}`}
                </button>
              ))}
              <button className="add-education" onClick={addNewEducation}>+ New</button>
            </div>

            <div className="education-card">
              <input type="text" placeholder="Degree" value={localEducation[activeEducation].degree} onChange={(e) => handleArrayChange(e, "education", activeEducation, "degree")} />
              <input type="text" placeholder="Institution" value={localEducation[activeEducation].institution} onChange={(e) => handleArrayChange(e, "education", activeEducation, "institution")} />
              <input type="text" placeholder="Year" value={localEducation[activeEducation].year} onChange={(e) => handleArrayChange(e, "education", activeEducation, "year")} />
              <input type="text" placeholder="Grade" value={localEducation[activeEducation].grade} onChange={(e) => handleArrayChange(e, "education", activeEducation, "grade")} />
              <button className="delete-button" onClick={() => removeEducation(activeEducation)}>Delete</button>
            </div>

            <button className="save-button" onClick={() => handleSave("education")}>Save</button>
          </div>
        )}
        {activeTab === "Skills" && (
          <div className="section">
            <h3>Skills</h3>
            {localSkills.map((skill, index) => (
              <div key={index} className="skill-input">
                <input type="text" placeholder={`Skill ${index + 1}`} value={skill} onChange={(e) => handleArrayChange(e, "skills", index)} />
                
              </div>
            ))}
            <button className="save-button" onClick={() => handleSave("skills")}>Save</button>
          </div>
        )}
        {activeTab === "Achievements" && (
          <div className="section">
            <h3>Achievements</h3>
            {localAchievements.map((achievement, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Achievement ${index + 1}`}
                value={achievement}
                onChange={(e) => handleArrayChange(e, "achievements", index)}
              />
            ))}
            <button className="save-button" onClick={() => handleSave("achievements")}>Save</button>
          </div>
        )}
        {activeTab === "Coursework" && (
          <div className="section">
            <h3>Coursework</h3>
            {localCoursework.map((course, index) => (
              <input key={index} type="text" placeholder="Coursework" value={course} onChange={(e) => handleArrayChange(e, "coursework", index)} />
            ))}
            <button className="save-button" onClick={() => handleSave("coursework")}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeEditor;