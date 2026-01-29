import { useEffect, useState } from "react";
import type { Status, Vehicle } from "../types";
import { getGpsColor, getStatusColor } from "../utils/badgesColor";
import type { IconType } from "react-icons";
import { LuArrowLeft, LuCalendar, LuCarFront, LuGauge, LuMapPin, LuPencil, LuTrash2 } from "react-icons/lu";
import { Link, useNavigate, useParams } from "react-router-dom";
import StatusSelect from "../components/StatusSelect";
import { getVehicleById, updateVehicleStatus, deleteVehicle } from "../api/vehiclesService";

const VehicleDetail = () => {
  const { id } = useParams<{ id:string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const resData = await getVehicleById(id!);
        setVehicle(resData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      };
    };

    fetchVehicle();
  }, [id]);

  useEffect(() => {
    // Se bloquea el scroll del body para evitar interacción con el contenido detrás del modal
    if (openDeleteAlert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openDeleteAlert]);

  if(loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-center font-semibold text-lg text-slate-400 animate-pulse">
        Cargando vehículo...
      </div>
    );
  } else if(!vehicle) {
    return (
      <div className="flex-1 flex items-center justify-center gap-2 text-center font-semibold text-lg text-slate-400">
        <Link to={"/"} className="btn btn-secondary flex items-center justify-center rounded-full p-2">
          <LuArrowLeft className=""/>
        </Link>
        Vehículo no encontrado.
      </div>
    );
  };

  const updateStatus = async (newStatus: Status) => {
    if (vehicle.status === newStatus) return;
    const previousStatus = vehicle.status;

    setVehicle({ ...vehicle, status: newStatus });
    setIsUpdating(true);

    try {
      await updateVehicleStatus(vehicle.id, newStatus);
    } catch (error) {
      console.error(error);
      setVehicle({ ...vehicle, status: previousStatus });
    } finally {
      setIsUpdating(false);
    };
  };

  const handleDeleteVehicle = async () => {
    try {
      setIsDeleting(true);
      await deleteVehicle(vehicle.id);
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setOpenDeleteAlert(false);
      setIsDeleting(false);
    };
  };

  const badgeStatusColor = getStatusColor(vehicle.status);
  const badgeGpsColor = getGpsColor(vehicle.gpsStatus);

  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-wrap justify-end gap-2">
        <Link to={`/vehicles/${id}/edit`} className="flex-1 sm:flex-none btn btn-primary">
          <LuPencil className=""/>
          Editar
        </Link>
        <button className="flex-1 sm:flex-none btn btn-danger" onClick={()=>setOpenDeleteAlert(true)}>
          <LuTrash2 className=""/>
          Eliminar
        </button>
        <StatusSelect currentStatus={vehicle.status} onChange={(newStatus:Status) => updateStatus(newStatus)} disabled={isUpdating} loading={isUpdating}/>
      </section>
      <article className="flex-1 flex flex-col md:flex-row gap-5 min-w-full">
        <section className="relative card flex gap-4 md:w-1/2">
          <img src="/default.webp" alt={`Vehículo ${vehicle.brand} ${vehicle.model}`} className="h-full min-h-48 object-cover"/>
          <div className="absolute top-2 right-2 flex flex-wrap justify-end gap-2">
            <p aria-label={`Estado del vehículo: ${vehicle.status}`} className={`flex items-center justify-center gap-1 px-3 py-1 font-semibold text-xs rounded-full ${badgeStatusColor.bg}`}>
              <span className={`w-2 h-2 rounded-full ${badgeStatusColor.ball}`}/>
              {vehicle.status}
            </p>
            <p aria-label={`Estado del GPS: ${vehicle.gpsStatus}`} className={`flex items-center justify-center gap-1 px-3 py-1 font-semibold text-xs rounded-full ${badgeGpsColor.bg}`}>
              <span className={`w-2 h-2 rounded-full ${badgeGpsColor.ball}`}/>
              GPS {vehicle.gpsStatus}
            </p>
          </div>
          <div className="absolute bottom-2 left-2 px-4 py-2 rounded-xl bg-slate-100">
            <h2 className="">{vehicle.brand} {vehicle.model}</h2>
            <p className="text-slate-500 font-semibold text-sm">({vehicle.year})</p>
          </div>
        </section>
        <section className="md:w-1/2">
          <ul className="flex flex-col gap-2">
            <InfoItem Icon={LuCarFront} label="Placa" value={vehicle.plate} />
            <InfoItem Icon={LuGauge} label="Kilometraje" value={vehicle.mileage} />
            <InfoItem Icon={LuCalendar} label="Último Servicio" value={vehicle.lastService} />
            <InfoItem Icon={LuMapPin} label="Ubicación" value={vehicle.location} />
          </ul>
        </section>
      </article>
      {openDeleteAlert && 
        <div role="dialog" aria-modal="true" onClick={()=>setOpenDeleteAlert(false)} className="fixed inset-0 bg-slate-950/30 flex items-center justify-center p-4">
          <div onClick={(e)=>e.stopPropagation()} className="bg-slate-50 rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Eliminar Vehículo</h2>
            <p className="text-sm text-slate-600">¿Estás seguro de que deseas eliminar este vehículo? Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2 mt-4">
              <button className="btn btn-secondary" disabled={isDeleting} onClick={()=>setOpenDeleteAlert(false)}>Cancelar</button>
              <button className="btn btn-danger" disabled={isDeleting} onClick={handleDeleteVehicle}>Eliminar</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default VehicleDetail;

const InfoItem = ({ Icon, label, value }:{ Icon:IconType, label: string; value: string | number }) => {
  return (
    <li className="flex items-center gap-2 rounded-md px-4 py-2 h-20 w-full border border-slate-200">
      <div className="flex items-center justify-center size-12 p-2 rounded-lg bg-blue-500">
        <Icon className="text-2xl text-slate-50" />
      </div>
      <div>
        <h3 className="font-semibold text-xs text-slate-500">{label}</h3>
        <p className="text-base font-semibold">{value}</p>
      </div>
    </li>
  );
};
