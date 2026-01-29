import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Vehicle, VehicleFormData } from "../types";
import VehicleForm from "../components/Form";

const VehicleEdit = () => {
  const { id } = useParams<{ id:string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle>();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Vehicle>(`http://localhost:3001/vehicles/${id}`);
        setVehicle(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      };
    };
    fetchVehicle();
  },[id]);

  const handleSubmit = async (data:VehicleFormData) => {
    try {
      setIsSubmitting(true);
      const res = await axios.patch(`http://localhost:3001/vehicles/${id}`, {
        brand: data.brand,
        model: data.model,
        year: Number(data.year),
        plate: data.plate,
        lastService: data.lastService,
        mileage: Number(data.mileage),
        location: data.location,
        gpsStatus: data.gpsStatus,
      });
      navigate(`/vehicles/${res.data.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    };
  };

  if(loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-center font-semibold text-lg text-slate-400 animate-pulse">
        Cargando vehículo...
      </div>
    );
  } else if(!vehicle) {
    return (
      <div className="flex-1 flex items-center justify-center gap-2 text-center font-semibold text-lg text-slate-400">
        Vehículo no encontrado.
      </div>
    );
  }; 

  return (
    <div className="flex flex-col gap-6">
      <h1>Editar Vehículo</h1>
      <VehicleForm initialValues={vehicle} onSubmit={handleSubmit} loading={isSubmitting} back={`/vehicles/${vehicle.id}`}/>
    </div>
  );
};

export default VehicleEdit;