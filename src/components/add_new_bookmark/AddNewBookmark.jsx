import { useNavigate } from "react-router-dom";
import useGetParams from "../../hooks/useGetParams";

import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader/Loader.jsx";
import ReactCountryFlag from "react-country-flag";
import { useBookMarks } from "../context/BookMarksProvider.jsx";
export default function AddNewBookmark() {
  const BASE_URL_GEOCODE =
    "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const navigate = useNavigate();
  const [lat, lng] = useGetParams();
  const [cityName, setCityName] = useState();
  const [countryName, setCountryName] = useState();
  const [countryCode, setCountryCode] = useState();
  const [isLoadingBookmark, setIsLoadingBookmark] = useState(false);
  const [errorBookmark, setErrorBookmark] = useState("");
  const { addNewBookmark } = useBookMarks();
  const handlesubmit = async () => {
    if (!cityName || !countryName) {
      return;
    }
    const newBookmark = {
      cityName,
      country: countryName,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: countryName,
    };
    await addNewBookmark(newBookmark);
    navigate("/bookmark");
  };
  useEffect(() => {
    async function getLocationData() {
      if (!lat || !lng) {
        return;
      }
      setIsLoadingBookmark(true);
      try {
        const { data } = await axios.get(
          `${BASE_URL_GEOCODE}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );

        if (!data.countryCode) {
          throw new Error("The place that you clicked on the map is unknown!");
        }
        setErrorBookmark("");
        setCityName(data.city);
        setCountryName(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        console.log(error.message);
        setErrorBookmark(error.message);
      } finally {
        setIsLoadingBookmark(false);
      }
    }
    getLocationData();
  }, [lat, lng]);
  if (isLoadingBookmark) {
    return <Loader />;
  }
  if (errorBookmark) {
    return <strong>{errorBookmark}</strong>;
  }
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form">
        <div className="formControl">
          <label htmlFor="cityname">CityName</label>
          <input
            onChange={(e) => {
              return setCityName(e.target.value);
            }}
            value={cityName}
            type="text"
            name="cityname"
            id="cityname"
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            onChange={(e) => {
              return setCountryName(e.target.value);
            }}
            value={countryName}
            type="text"
            name="country"
            id="country"
          />

          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handlesubmit();
            }}
            className="btn btn--primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
