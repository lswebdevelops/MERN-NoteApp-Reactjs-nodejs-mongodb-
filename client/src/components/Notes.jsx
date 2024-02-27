import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Notes() {
  // grabbing the url from .env.local
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return <div>
    
  <pre>
    {JSON.stringify(data, null, 2)}
  </pre>


  </div>;
}

export default Notes;
