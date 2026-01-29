export type Status = "Disponible" | "En uso" | "Mantenimiento";
export type GpsStatus = "Activo" | "Inactivo";

export interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  status: Status;
  lastService: string;
  mileage: number;
  gpsStatus: GpsStatus;
  location: string;
};

export interface VehicleFormData {
  plate: string;
  brand: string;
  model: string;
  year: string;
  lastService: string;
  mileage: string;
  gpsStatus: GpsStatus;
  location: string;
};