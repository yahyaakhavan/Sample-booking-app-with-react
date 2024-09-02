import { Outlet } from "react-router-dom";
import Map from "../map/Map.jsx";
import { useBookMarks } from "../context/BookMarksProvider.jsx";
export default function BookMarkLayout() {
  const { bookmarks } = useBookMarks();

  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
}
