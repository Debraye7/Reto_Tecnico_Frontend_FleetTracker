import type { Vehicle } from '../types';

export const filterVehicles = (vehicles: Vehicle[], searchTerm: string, statusFilter?: string) => {
  let filtered = vehicles;

  // Filtro por búsqueda en placa, marca o modelo
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (vehicle) =>
        vehicle.plate.toLowerCase().includes(term) ||
        vehicle.brand.toLowerCase().includes(term) ||
        vehicle.model.toLowerCase().includes(term)
    );
  }

  // Filtro por estado
  if (statusFilter && statusFilter !== 'all') filtered = filtered.filter((v) => v.status === statusFilter);

  return filtered;
};