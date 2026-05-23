import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ItineraryListPage from "./pages/ItineraryListPage";
import ItineraryViewPage from "./pages/ItineraryViewPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SharedItineraryViewPage from "./pages/sharedItineraryViewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />        
        <Route path="/shared/:id" element={<SharedItineraryViewPage />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/itineraries"
          element={
            <ProtectedRoute>
              <ItineraryListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/itinerary/:id"
          element={
            <ProtectedRoute>
              <ItineraryViewPage />
            </ProtectedRoute>
          }
        />       

      </Routes>
    </BrowserRouter>
  );
}

export default App;