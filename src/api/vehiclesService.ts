import { api } from "./api";
import type { Vehicle, VehicleFormData, Status } from "../types";

// GET /vehicles
export const getVehicles = async (): Promise<Vehicle[]> => {
  const { data } = await api.get<Vehicle[]>("/vehicles");
  return data;
};

// GET /vehicles/:id
export const getVehicleById = async (id: string): Promise<Vehicle> => {
  const { data } = await api.get<Vehicle>(`/vehicles/${id}`);
  return data;
};

// POST /vehicles
export const createVehicle = async (
  payload: VehicleFormData
): Promise<Vehicle> => {
  const { data } = await api.post<Vehicle>("/vehicles", {
    ...payload,
    year: Number(payload.year),
    mileage: Number(payload.mileage),
    status: "Disponible",
  });

  return data;
};

// PATCH /vehicles/:id
export const updateVehicle = async (
  id: string,
  payload: VehicleFormData
): Promise<Vehicle> => {
  const { data } = await api.patch<Vehicle>(`/vehicles/${id}`, {
    ...payload,
    year: Number(payload.year),
    mileage: Number(payload.mileage),
  });

  return data;
};

// PATCH solo estado
export const updateVehicleStatus = async (
  id: string,
  status: Status
): Promise<Vehicle> => {
  const { data } = await api.patch<Vehicle>(`/vehicles/${id}`, { status });
  return data;
};

// DELETE /vehicles/:id
export const deleteVehicle = async (id: string): Promise<void> => {
  await api.delete(`/vehicles/${id}`);
};