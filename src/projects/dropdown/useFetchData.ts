import React, { useState, useEffect } from 'react';

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url =
    'https://randomuser.me/api/?results=50&inc=id,gender,name,nat,email';

  const fetchData = async () => {
    console.log('fetching data');
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);
      setLoading(false);
    } catch (e: any) {
      setError(e);
    }
  };
  useEffect(() => {
    void fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
