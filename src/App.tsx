import { Routes, Route, Navigate } from "react-router-dom";
import VehicleList from "./pages/VehicleList";
import VehicleDetail from "./pages/VehicleDetail";
import VehicleCreate from "./pages/VehicleCreate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<VehicleList />} />
      <Route path="/vehicles/new" element={<VehicleCreate />} />
      <Route path="/vehicles/:id" element={<VehicleDetail />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
