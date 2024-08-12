import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const HotelContext = createContext();
export default function HotelsProvider({ children }) {
  const [serachParams, setSearchParams] = useSearchParams();
  const roomNumber = JSON.parse(serachParams.get("option"))?.room;
  const destination = serachParams.get("destination");

  const { isLoading, data: hotels } = useFetch(
    "http://localhost:5000/hotels",
    `name_like=${destination || ""}&accommodates_gte=${roomNumber}`
  );
  return (
    <HotelContext.Provider value={{ isLoading, hotels }}>
      {children}
    </HotelContext.Provider>
  );
}
export function useHotels() {
  return useContext(HotelContext);
}
