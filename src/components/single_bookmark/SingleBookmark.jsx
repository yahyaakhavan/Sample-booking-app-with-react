import { useNavigate, useParams } from "react-router-dom";
import { useBookMarks } from "../context/BookMarksProvider";
import { useEffect } from "react";
import Loader from "../loader/Loader";

export default function SingleBookmark() {
  const { getCurrentBookMark, currentBookmark, isLoading } = useBookMarks();
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    getCurrentBookMark(id);
  }, [id]);
  if (isLoading || !currentBookmark) {
    return <Loader />;
  }
  return (
    <div>
      <h2>{currentBookmark.cityName}</h2>
      <button onClick={handleBack} className="btn btn--back">
        &larr; back
      </button>
    </div>
  );
}
