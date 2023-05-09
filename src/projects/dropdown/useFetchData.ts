import { useEffect, useState } from 'react';

export type RandomuserAPIResponse = {
  results: RandomuserResponseData[];
};

export type RandomuserResponseData = {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  id: {
    name: string;
    value: string;
  };
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
};

const useFetchData = () => {
  const [data, setData] = useState<RandomuserResponseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = 'https://randomuser.me/api/?results=50&inc=id,gender,name,nat,email,picture,login';

  const fetchData = async () => {
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
    error
  };
};

export default useFetchData;
