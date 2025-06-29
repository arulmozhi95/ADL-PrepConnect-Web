const API_BASE_URL = "http://127.0.0.1:5000"; // Flask server

export const fetchCompanies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) throw new Error("Failed to fetch companies");
    return await response.text(); // Keep text() if the response is HTML
  } catch (error) {
    console.error("Error fetching companies:", error);
    return null;
  }
};

export const scrapeCompany = async (company) => {
  try {
    const response = await fetch(`${API_BASE_URL}/scrape?company=${encodeURIComponent(company)}`);
    if (!response.ok) throw new Error(`Failed to scrape ${company}`);
    return await response.text(); // Keep text() if returning HTML content
  } catch (error) {
    console.error(`Error scraping ${company}:`, error);
    return null;
  }
};
