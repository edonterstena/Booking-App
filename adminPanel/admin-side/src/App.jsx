import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import HotelPage from "./pages/hotel/HotelPage";
import RoomPage from "./pages/room/RoomPage";
import UserPage from "./pages/user/UserPage";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/SideBar";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/AuthContext";
import CreateHotel from "./pages/hotel/CreateHotel";
import EditHotel from "./pages/hotel/EditHotel";
import HotelDetails from "./pages/hotel/HotelDetails";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="login/*" element={<LoginLayout />} />
          <Route path="/*" element={<ProtectedLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function LoginLayout() {
  return (
    <div className="flex">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

function ProtectedLayout() {
  return (
    <div className="flex items-center gap-24">
      <SideBar />
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hotels"
            element={
              <ProtectedRoute>
                <HotelPage />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            path="/createHotel"
            element={
              <ProtectedRoute>
                <CreateHotel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editHotel/:id"
            element={
              <ProtectedRoute>
                <EditHotel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hotelDetails/:id"
            element={
              <ProtectedRoute>
                <HotelDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <RoomPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
