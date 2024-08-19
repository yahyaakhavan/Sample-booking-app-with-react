import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/applayout/AppLayout";
import Hotels from "./components/hotels/Hotels.jsx";
import HotelsProvider from "./components/context/HotelsProvider.jsx";
import SingleHotel from "./components/single_hotel/SingleHotel.jsx";

function App() {
  return (
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
        </Routes>
      </div>
    </HotelsProvider>
  );
}

export default App;
