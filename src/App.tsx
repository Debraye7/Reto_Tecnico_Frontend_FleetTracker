import { Routes, Route, Navigate } from "react-router-dom";
import VehicleList from "./pages/VehicleList";
import VehicleDetail from "./pages/VehicleDetail";
import VehicleCreate from "./pages/VehicleCreate";
import BaseLayout from "./layouts/BaseLayout";
import VehicleEdit from "./pages/VehicleEdit";

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<VehicleList />} />
        <Route path="/vehicles/new" element={<VehicleCreate />} />
        <Route path="/vehicles/:id" element={<VehicleDetail />} />
        <Route path="/vehicles/:id/edit" element={<VehicleEdit />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
