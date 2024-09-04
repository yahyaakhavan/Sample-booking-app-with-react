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
import LoginForm from "./components/loginform/LoginForm.jsx";
import AuthContextProvider from "./components/context/AuthProvider.jsx";
import ProtectedRoute from "./components/protected_route/ProtectedRote.jsx";

function App() {
  return (
    <AuthContextProvider>
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
              <Route
                path="/bookmark"
                element={
                  <ProtectedRoute>
                    <BookMarkLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Bookmarks />} />
                <Route path=":id" element={<SingleBookmark />} />
                <Route path="add" element={<AddNewBookmark />} />
              </Route>
              <Route path="login" element={<LoginForm />} />
            </Routes>
          </div>
        </HotelsProvider>
      </BookMarksProvider>
    </AuthContextProvider>
  );
}

export default App;
