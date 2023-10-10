import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchPlace(url) {
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    fetchData();
  }, [url]);
  const refetch = async () => {
    // Manually fetch data again and update the state with fresh data
    check();
    fetchData();
  };

  const check = () => {
    console.log("form hook check");
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      const data = response.data.places;
      console.log("hook second time ", data);
      setDatas(data);
      
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { datas, error, loading, refetch, check };
}
