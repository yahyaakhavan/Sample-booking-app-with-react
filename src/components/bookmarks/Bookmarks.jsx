import { Link } from "react-router-dom";
import { useBookMarks } from "../context/BookMarksProvider";
import ReactCountryFlag from "react-country-flag";
import Loader from "../loader/Loader";
import { TrashIcon } from "@heroicons/react/16/solid";
export default function BookMarks() {
  const { bookmarks, isLoading, currentBookmark, deleteBookmark } =
    useBookMarks();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };
  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>BookmarkList</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              key={item.id}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} /> &nbsp;
                  <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button
                  onClick={(e) => {
                    handleDelete(e, item.id);
                  }}
                >
                  <TrashIcon className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
