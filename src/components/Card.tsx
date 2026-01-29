import type { Vehicle } from "../types";
import Image from "../../public/default.webp";
import { Link } from "react-router-dom";
import { getStatusColor } from "../utils/badgesColor";

const Card = ({ vehicle }:{ vehicle:Vehicle }) => {

  const badgeStatusColor = getStatusColor(vehicle.status);

  return (
    <li className="card flex flex-col">
      <div className="relative">
        <img src={Image} alt={`Vehículo ${vehicle.brand} ${vehicle.model}`} className="h-40 w-full object-cover rounded-t-lg"/>
        <p aria-label={`Estado del vehículo: ${vehicle.status}`} className={`absolute top-2 right-2 flex items-center justify-center gap-1 px-3 py-1 font-semibold text-xs rounded-full ${badgeStatusColor.bg}`}>
          <span className={`w-2 h-2 rounded-full ${badgeStatusColor.ball}`}/>
          {vehicle.status}
        </p>
      </div>

      <article className="flex flex-col gap-2 p-4">
        <h2>{vehicle.brand} {vehicle.model} ({vehicle.year})</h2>
        <section className="flex flex-wrap justify-between gap-2">
          <p className="w-fit px-3 py-1.5 rounded-md bg-slate-200 border border-slate-400">{vehicle.plate}</p>
          <Link to={`/vehicles/${vehicle.id}`} className="btn btn-primary">Ver detalles</Link>
        </section>
      </article>
    </li>
  );
};

export default Card;