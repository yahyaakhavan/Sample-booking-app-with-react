import { createContext, useContext, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";
const HotelContext = createContext();
const Base_URL = "http://localhost:5000/hotels";
export default function HotelsProvider({ children }) {
  const [serachParams, setSearchParams] = useSearchParams();
  const roomNumber = JSON.parse(serachParams.get("option"))?.room;
  const destination = serachParams.get("destination");
  const [currentHotel, setCurrentHotel] = useState({});

  const { isLoading, data: hotels } = useFetch(
    Base_URL,
    `name_like=${destination || ""}&accommodates_gte=${roomNumber}`
  );
  async function getCurrentHotel(id) {
    try {
      const { data } = await axios.get(`${Base_URL}/${id}`);
      setCurrentHotel(data);
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <HotelContext.Provider
      value={{ isLoading, hotels, currentHotel, getCurrentHotel }}
    >
      {children}
    </HotelContext.Provider>
  );
}
export function useHotels() {
  return useContext(HotelContext);
}
