import React, { useState } from "react";
import { scrapeCompany } from "./api";
import "./ScraperButton.css";

const companies = [
  "Amazon", "Oracle", "Google", "Microsoft", "Morgan Stanley",
  "DE Shaw", "Adobe", "Cisco", "Directi", "Facebook",
  "Flipkart", "Goldman Sachs", "Paytm", "SAP Labs",
  "Visa", "VMware", "Samsung", "MAQ Software"
];

const ScraperButton = () => {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [scrapedContent, setScrapedContent] = useState("");

  const handleScrape = async () => {
    const result = await scrapeCompany(selectedCompany);
    console.log("Scraped Data:", result); // Debugging to see actual content
    setScrapedContent(result);
  };

  return (
    <div className="scraper-container">
      <h2>Interview Questions - Company Wise</h2>
      <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
        {companies.map((company) => (
          <option key={company} value={company}>{company}</option>
        ))}
      </select>
      <button onClick={handleScrape} className="scraper-button">Get Coding Questions</button>

      <div className="scraped-content">
  <div 
    className="scraped-answer" 
    dangerouslySetInnerHTML={{ 
      __html: scrapedContent.replace(
        /href="\/view\?url=([^"]+)&company=([^"]+)"/g, 
        'target="_blank" rel="noopener noreferrer" href="http://127.0.0.1:5000/view?url=$1&company=$2"'
      ) 
    }} 
  />
</div>



      <footer className="footer">
        <p>Copyright © GeeksforGeeks. All rights belong to their respective owners.</p>
      </footer>
    </div>
  );
};

export default ScraperButton;
