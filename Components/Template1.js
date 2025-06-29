import React from "react";
import { BsLinkedin, BsGithub, BsGlobe } from "react-icons/bs";
import { HiLocationMarker, HiOutlineMail, HiPhone } from "react-icons/hi";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import "./Template1.css";

const Template1 = ({ data }) => {
  if (!data) return <p>No data available</p>;
  const { profile, projects, education, skills, achievements, coursework } = data;
  console.log("Profile Data:", profile);

  return (
    <div className="resume-container">
      <div className="resume-left">
        <div className="profile-img-container">
  {data.profile.profileImage ? (
    <img
      src={data.profile.profileImage}
      alt="Profile"
      style={{ width: "100px", height: "100px", borderRadius: "50%" }}
    />
  ) : (
    <img
      src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1256.jpg"
      alt="Default Profile"
      style={{ width: "100px", height: "100px", borderRadius: "50%" }}
    />
  )}
</div>
        <h3 style={{fontSize:"28px"}}>{profile?.name }</h3>
        <p style={{textAlign: "left",fontSize:"15px"}}>{profile?.about }</p>
        <div >
          {profile?.email && (
            <p>
              <HiOutlineMail /> {profile.email}
            </p>
          )}
          {profile?.phone && (
            <p>
              <HiPhone /> {profile.phone}
            </p>
          )}
          {profile?.linkedin && (
            <p>
              <BsLinkedin /> {profile.linkedin}
            </p>
          )}
          {profile?.github && (
            <p>
              <BsGithub /> {profile.github}
            </p>
          )}
          {profile?.address && (
            <p>
              <HiLocationMarker /> {profile.address}
            </p>
          )}
        </div>
        <h3 style={{fontSize:"28px"}}>Skills</h3>
        <ul>
          {skills?.map((skill, index) => (
            <li key={index}>{skill || `Skill ${index + 1}`}</li>
          ))}
        </ul>
        <h3 style={{fontSize:"28px"}}>Achievements</h3>
        <ul>
          {achievements?.map((achievement, index) => (
            <li key={index}>
              <MdOutlineWorkspacePremium /> {achievement || `Achievement ${index + 1}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="resume-right">
        <h3 style={{fontSize:"28px"}}>Projects</h3>
        {projects?.map((project, index) => (
          <div key={index} className="project-item">
           
            <div>
              <h4 style={{fontSize:"20px"}}>{project.title}</h4>
              <p>{project.line1}</p>
              <p style={{ fontWeight: "medium" }}>{project.line2}</p>
              {project.deployedLink && (
                <p>
                  <a href={project.deployedLink} target="_blank" rel="noopener noreferrer">
                    {project.deployedLink}
                  </a>
                </p>
              )}
            </div>
          </div>
        ))}
        <h3 style={{fontSize:"28px"}}>Education</h3>
        {education?.map((edu, index) => (
          <div key={index} className="education-item">
            <div>
              <h4>{edu.degree}</h4>
              <p>{edu.institution}</p>
              <p>Year:{edu.year}</p>
              <p>Grade: {edu.grade}</p>
            </div>
          </div>
        ))}
        <h3 style={{fontSize:"28px"}}>Coursework</h3>
        <ul>
          {coursework?.map((course, index) => (
            <p key={index}>{course || `Course ${index + 1}`}</p>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Template1;