import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { VehicleFormData } from "../types";
import VehicleForm from "../components/Form";

const VehicleCreate = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data:VehicleFormData) => {
    try {
      setIsSubmitting(true);
      const res = await axios.post("http://localhost:3001/vehicles", {
        brand: data.brand,
        model: data.model,
        year: Number(data.year),
        plate: data.plate,
        lastService: data.lastService,
        mileage: Number(data.mileage),
        location: data.location,
        gpsStatus: data.gpsStatus,
        status: "Disponible",
      });
      navigate(`/vehicles/${res.data.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    };
  };

  return (
    <div className="flex flex-col gap-6">
      <h1>Registrar Vehículo</h1>
      <VehicleForm onSubmit={handleSubmit} loading={isSubmitting} back="/"/>
    </div>
  );
};

export default VehicleCreate;