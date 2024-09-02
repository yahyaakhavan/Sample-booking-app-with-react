import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
const Base_URL = "http://localhost:5000/bookmarks";
const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: {},
  merror: null,
};
export default function BookMarksProvider({ children }) {
  function bookmarkReducer(state, action) {
    switch (action.type) {
      case "bookmarks/loaded":
        return { ...state, bookmarks: action.payload, isLoading: false };
      case "bookmark/loaded":
        return { ...state, currentBookmark: action.payload, isLoading: false };
      case "loading":
        return { ...state, isLoading: true };
      case "bookmark/create":
        return {
          ...state,
          bookmarks: [...state.bookmarks, action.payload],
          currentBookmark: action.payload,
          isLoading: false,
        };
      case "bookmark/deleted":
        return {
          ...state,
          bookmarks: state.bookmarks.filter((item) => {
            return item.id != action.payload;
          }),
          isLoading: false,
          currentBookmark: {},
        };
      case "reject":
        return { ...state, isLoading: false, merror: action.payload };
      default:
        return "unknown action...!";
    }
  }
  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );
  // const [bookmarks, setBookmarks] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentBookmark, setCurrentBookmark] = useState({});

  useEffect(() => {
    async function getAllBookmarks() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(Base_URL);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({ type: "reject", payload: error.message });
      }
    }
    getAllBookmarks();
  }, []);
  async function getCurrentBookMark(id) {
    dispatch({ type: "loading" });
    // setCurrentBookmark({});
    try {
      const { data } = await axios.get(`${Base_URL}/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "reject", payload: error.message });
    }
  }
  async function addNewBookmark(item) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(Base_URL, item);
      dispatch({ type: "bookmark/create", payload: data });
      console.log(initialState.bookmarks);
    } catch (error) {
      dispatch({ type: "reject", payload: error.message });
    }
  }
  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${Base_URL}/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        getCurrentBookMark,
        currentBookmark,
        addNewBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookMarks() {
  return useContext(BookmarkContext);
}
