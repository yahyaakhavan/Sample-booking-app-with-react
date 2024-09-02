import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/applayout/AppLayout";
import Hotels from "./components/hotels/Hotels.jsx";
import HotelsProvider from "./components/context/HotelsProvider.jsx";
import SingleHotel from "./components/single_hotel/SingleHotel.jsx";
import BookMarkLayout from "./components/bookmarklayout/BookMarkLayout.jsx";
import BookMarksProvider from "./components/context/BookMarksProvider.jsx";
import Bookmarks from "./components/bookmarks/Bookmarks.jsx";
import SingleBookmark from "./components/single_bookmark/SingleBookmark.jsx";
import AddNewBookmark from "./components/add_new_bookmark/AddNewBookmark.jsx";

function App() {
  return (
    <BookMarksProvider>
      <HotelsProvider>
        <div>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmark" element={<BookMarkLayout />}>
              <Route index element={<Bookmarks />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
          </Routes>
        </div>
      </HotelsProvider>
    </BookMarksProvider>
  );
}

export default App;
