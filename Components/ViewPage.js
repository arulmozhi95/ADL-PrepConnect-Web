import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ViewPage() {
  const [content, setContent] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Get URL parameters from the location
    const params = new URLSearchParams(location.search);
    const url = params.get('url');
    const company = params.get('company');

    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch(`/view?url=${encodeURIComponent(url)}&company=${company}`);
        if (response.ok) {
          const data = await response.text();
          setContent(data); // Set the content for display
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <div>
      <h1>Scraped Content</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default ViewPage;
