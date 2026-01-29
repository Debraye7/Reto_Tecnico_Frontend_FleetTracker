import type { GpsStatus, Status } from "../types";

export const getStatusColor = (status: Status) => {
  const badgeColor = {
    bg:
      status === "Disponible"
        ? "bg-green-500/10"
        : status === "En uso"
        ? "bg-yellow-500/10"
        : "bg-red-500/10",
    ball:
      status === "Disponible"
        ? "bg-green-500"
        : status === "En uso"
        ? "bg-yellow-500"
        : "bg-red-500",
  };

  return badgeColor;
};

export const getGpsColor = (gpsStatus:GpsStatus) => {
  const badgeColor = {
    bg:
      gpsStatus === "Activo"
        ? "bg-blue-500/10"
        : "bg-stone-500/10",
    ball:
      gpsStatus === "Activo"
        ? "bg-blue-500"
        : "bg-stone-500",
  };

  return badgeColor;
};