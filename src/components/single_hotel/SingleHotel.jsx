import { useParams } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider.jsx";
import { useEffect } from "react";
export default function SingleHotel() {
  const { id } = useParams();
  const { currentHotel, getCurrentHotel } = useHotels();
  useEffect(() => {
    getCurrentHotel(id);
  }, [id]);
  //   if (isLoading) {
  //     return <IsLoading />;
  //   }

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}
