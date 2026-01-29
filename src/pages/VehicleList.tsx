import { useEffect, useMemo, useState } from "react";
import type { Status, Vehicle } from "../types";
import { filterVehicles } from "../utils/vehicleFilters";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { vehicleStatusOptions } from "../data/data";
import { getVehicles } from "../api/vehiclesService";

const VehicleList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<Status|"">("");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const resData = await getVehicles();
        setAllVehicles(resData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      };
    };
    fetchVehicles();
  }, []);

  //! Dado que json-server es un mock y su soporte de full-text depende de versión, decidí resolver la búsqueda en frontend para garantizar comportamiento consistente
  //* Filtrado de vehículos
  const filteredVehicles = useMemo(
    () => filterVehicles(allVehicles, searchTerm, statusFilter),
    [allVehicles, searchTerm, statusFilter]
  );

  //* Paginación de los resultados filtrados
  const paginatedVehicles = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredVehicles.slice(start, start + limit);
  }, [filteredVehicles, page]);

  //* Total de páginas
  const totalPages = Math.max(1, Math.ceil(filteredVehicles.length / limit));

  //* Reset página al cambiar filtros
  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter]);

  return (
    <div className="flex-1 flex flex-col gap-5 min-w-full">
      <section className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-2">
          <h1>Listado de vehículos</h1>
          <p className="font-semibold text-xs leading-8">({paginatedVehicles.length})</p>
        </div>
        <Link to="/vehicles/new" className="btn btn-primary">Crear vehículo</Link>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as Status)} className="select">
          <option value="">Todos los estados</option>
          {vehicleStatusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar por placa, marca o modelo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
      </section>

      <section className="flex-1 flex flex-col">
        {loading && 
          <p className="flex-1 flex items-center justify-center text-center font-semibold text-lg animate-pulse">Cargando vehículos...</p>
        }

        {!loading && paginatedVehicles.length > 0 &&
          <ul className="card-list">
            {paginatedVehicles.map((item) => (
              <Card key={item.id} vehicle={item}/>
            ))}
          </ul>
        }

        {!loading && paginatedVehicles.length === 0 && 
          <p className="flex-1 flex items-center justify-center text-center font-semibold text-lg opacity-50">No hay vehículos para mostrar.</p>
        }
      </section>

      <section className="flex justify-between">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn btn-secondary">
          Anterior
        </button>

        <span className="py-2 px-4 bg-slate-100 rounded-md">Página {page} de {totalPages}</span>

        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="btn btn-secondary">
          Siguiente
        </button>
      </section>
    </div>
  );
};

export default VehicleList;