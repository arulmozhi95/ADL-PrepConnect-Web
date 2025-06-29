import React, { useState, useRef } from "react";
import ResumeEditor from "./ResumeEditor";
import Template1 from "./Template1";
import "./ResumeBuilder.css"; // Add your CSS for layout
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    
    profile: { name: "", about: "", email: "", phone: "", address: "", github: "", linkedin: "", profileImage: "" },
    projects: [{ title: "", line1: "", line2: "", deployedLink: "" }],
    education: [{ degree: "", institution: "", year: "", grade: "" }],
    skills: ["", "", ""],
    achievements: ["", "", ""],
    coursework: ["", "", ""],
  });

  const resumeRef = useRef(null);
  const downloadPDF = () => {
    if (!resumeRef.current) return;
    

    html2canvas(resumeRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
    
      // Convert template size to mm
      const pdfWidth = 211.6; // 800px converted to mm
      const pdfHeight = 264.5; // 1000px converted to mm
    
      // Create a PDF with the same dimensions as the template
      const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);
    
      // Add the image to the PDF (full width and height)
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    });
    
  };

  return (
    <div className="resume-builder">
      <div className="resume-editor">
        <ResumeEditor formData={formData} setFormData={setFormData} />
      </div>
      <div className="resume-preview-container">
        <div className="resume-preview" ref={resumeRef}>
          <Template1 data={formData} />
        </div>
        <button className="download-btn" onClick={downloadPDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default ResumeBuilder;
