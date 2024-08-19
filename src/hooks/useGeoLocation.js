import { useState } from "react";

export default function useGeoLocation() {
  const [geoLocation, setGeoLocation] = useState({});
  const [geoError, setGeoError] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  function getGeoLocation() {
    if (!navigator.geolocation) {
      return setGeoError("Your browser doesnot support");
    }
    setIsloading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsloading(false);
      },
      (error) => {
        setGeoError(error.message);
        setIsloading(false);
      }
    );
  }
  return { geoLocation, isLoading, getGeoLocation, geoError };
}
