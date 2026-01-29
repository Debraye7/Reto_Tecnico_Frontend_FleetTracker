import { useState, type FormEvent, } from "react";
import { Link } from "react-router-dom";
import type { Vehicle, VehicleFormData } from "../types";

const VehicleForm = ({ initialValues, onSubmit, loading, back }:{ initialValues?:Vehicle, onSubmit: (data:VehicleFormData) => void, loading?:boolean, back:string }) => {
  const [errors, setErrors] = useState<Partial<Record<keyof VehicleFormData, string>>>({});
  const [form, setForm] = useState({
    brand: initialValues?.brand || "",
    model: initialValues?.model || "",
    year: `${initialValues?.year}` || "",
    plate: initialValues?.plate || "",
    lastService: initialValues?.lastService || "",
    mileage: `${initialValues?.mileage}` || "",
    location: initialValues?.location || "",
    gpsStatus: initialValues?.gpsStatus || "Inactivo",
  });

  const validateForm = (data: VehicleFormData) => {
    const errors: Partial<Record<keyof VehicleFormData, string>> = {};
    const normalizedData: VehicleFormData = {
      ...data,
      plate: data.plate.trim().toUpperCase(),
      brand: data.brand.trim(),
      model: data.model.trim(),
      location: data.location.trim(),
    };

    if (!normalizedData.brand.trim()) errors.brand = "La marca es obligatoria";

    if (!normalizedData.model.trim()) errors.model = "El modelo es obligatorio";

    if (Number(normalizedData.year) > new Date().getFullYear()) errors.year = "El año no puede ser mayor al actual";

    if (!/^[A-Z0-9-]{5,10}$/.test(normalizedData.plate)) errors.plate = "Formato de placa inválido";

    if (new Date(normalizedData.lastService) > new Date()) errors.lastService = "La fecha no puede ser futura";

    if (Number(normalizedData.mileage) < 0) errors.mileage = "El kilometraje no puede ser negativo";

    if (!normalizedData.location.trim()) errors.location = "La ubicación es obligatoria";

    if (!normalizedData.gpsStatus) errors.gpsStatus = "El estado del GPS es obligatorio";

    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prev => {
      if (!(name in prev)) return prev;

      const newErrors = { ...prev };
      delete newErrors[name as keyof VehicleFormData];
      return newErrors;
    });
  };

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="label-container">
        <label htmlFor="brand" className="label">Marca</label>
        <input
          id="brand"
          name="brand"
          type="text"
          placeholder="Ej. Toyota"
          className={`input ${errors.brand && "border-red-500"}`}
          value={form.brand}
          onChange={handleChange}
          required
        />
        {errors.brand && 
          <p className="text-xs text-red-500">{errors.brand}</p>
        }
      </div>
      <div className="label-container">
        <label htmlFor="model" className="label">Modelo</label>
        <input 
          id="model"
          name="model"
          type="text"
          placeholder="Ej. Corolla"
          className={`input ${errors.model && "border-red-500"}`}
          value={form.model}
          onChange={handleChange}
          required
        />
        {errors.model &&
          <p className="text-xs text-red-500">{errors.model}</p>
        }
      </div>
      <div className="label-container">
        <label htmlFor="year" className="label">Año</label>
        <input 
          id="year"
          name="year"
          type="number"
          placeholder="2026"
          className={`input ${errors.year && "border-red-500"}`}
          value={form.year}
          onChange={handleChange}
          required
          min={1980}
          max={new Date().getFullYear()}
        />
        {errors.year &&
          <p className="text-xs text-red-500">{errors.year}</p>
        }
      </div>
      <div className="label-container">
        <label htmlFor="plate" className="label">Placa</label>
        <input 
          id="plate"
          name="plate"
          type="text"
          placeholder="Ej. ABC-123"
          className={`input ${errors.plate && "border-red-500"}`}
          value={form.plate}
          onChange={handleChange}
          required
        />
        {errors.plate &&
          <p className="text-xs text-red-500">{errors.plate}</p>
        }
      </div>
      <div className="label-container">
        <label htmlFor="lastService" className="label">Último Servicio</label>
        <input 
          id="lastService"
          name="lastService"
          type="date"
          className={`input ${errors.lastService && "border-red-500"}`}
          value={form.lastService}
          onChange={handleChange}
          required
          max={new Date().toISOString().split('T')[0]}
        />
        {errors.lastService &&
          <p className="text-xs text-red-500">{errors.lastService}</p>
        }
      </div>
      <div className="label-container">
        <label htmlFor="mileage" className="label">Kilometraje</label>
        <input 
          id="mileage"
          name="mileage"
          type="number"
          placeholder="Ej. 35000"
          className={`input ${errors.mileage && "border-red-500"}`}
          value={form.mileage}
          onChange={handleChange}
          required
          min={0}
        />
        {errors.mileage &&
          <p className="text-xs text-red-500">{errors.mileage}</p>
        }
      </div>
      <div className="label-container">
        <label htmlFor="location" className="label">Ubicación</label>
        <input 
          id="location"
          name="location"
          type="text"
          placeholder="Ej. Ciudad de México"
          className={`input ${errors.location && "border-red-500"}`}
          value={form.location}
          onChange={handleChange}
          required
        />
        {errors.location &&
          <p className="text-xs text-red-500">{errors.location}</p>
        }
      </div>
      <div className="label-container">
        <label htmlFor="gpsStatus" className="label">GPS</label>
        <select 
          id="gpsStatus"
          name="gpsStatus"
          className={`select ${errors.gpsStatus && "border-red-500"}`}
          value={form.gpsStatus}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Seleccione estado del GPS</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        {errors.gpsStatus &&
          <p className="text-xs text-red-500">{errors.gpsStatus}</p>
        }
      </div>
      <div className="flex flex-wrap-reverse justify-end gap-2 sm:col-span-2">
        <Link to={back} className="btn btn-secondary">
          Cancelar
        </Link>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Guardando..." : "Guardar vehículo"}
        </button>
      </div>
    </form>
  );
};

export default VehicleForm;