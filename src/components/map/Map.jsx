import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotels } from "../context/HotelsProvider";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";

function Map() {
  const { isLoading, hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState([32.4279, 53.688]);

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const {
    geoLocation: geoPosition,
    isLoading: geoLoading,
    getGeoLocation,
    geoError,
  } = useGeoLocation();
  useEffect(() => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
    }
  }, [lat, lng]);
  useEffect(() => {
    if (geoPosition?.lat && geoPosition?.lng) {
      setMapCenter([geoPosition.lat, geoPosition.lng]);
      console.log("mi");
    }
    console.log(geoPosition);
  }, [geoPosition]);
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={6}
        scrollWheelZoom={true}
      >
        <button onClick={getGeoLocation} className="getLocation">
          {geoLoading ? "Loading..." : "Use Your Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        {hotels.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
