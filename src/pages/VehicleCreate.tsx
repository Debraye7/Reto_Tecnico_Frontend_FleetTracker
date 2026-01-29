import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { VehicleFormData } from "../types";
import VehicleForm from "../components/Form";
import { createVehicle } from "../api/vehiclesService";

const VehicleCreate = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data:VehicleFormData) => {
    try {
      setIsSubmitting(true);
      const resData = await createVehicle(data);
      navigate(`/vehicles/${resData.id}`);
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