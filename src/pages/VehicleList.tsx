import { Link } from "react-router-dom";

const VehicleList = () => {
  return (
    <div>
      <h1>Listado de vehículos</h1>
      <Link to="/vehicles/new">Crear vehículo</Link>
    </div>
  );
};

export default VehicleList;