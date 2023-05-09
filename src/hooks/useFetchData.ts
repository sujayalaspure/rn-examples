import { useEffect, useState } from 'react';

type FetchDataProps = {
  url: string;
};

interface FetchDataResponse<T> {
  loading: boolean;
  error: any;
  data: T | undefined;
}
const useFetchData = <T>({ url }: FetchDataProps): FetchDataResponse<T> => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const url = 'https://randomuser.me/api/?results=50&inc=id,gender,name,nat,email,picture,login';

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
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
