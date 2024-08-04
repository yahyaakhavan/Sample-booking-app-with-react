import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function useFetch(url, query = "") {
  const [data, setDate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        setDate(data);
      } catch (error) {
        setDate([]);
        toast.error(error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query, url]);
  return { isLoading, data };
}
