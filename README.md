# FleetTracker – Frontend

Aplicación frontend para la gestión básica de una flota vehicular.  
Permite listar, crear, editar, eliminar y actualizar el estado de vehículos, así como visualizar su información detallada.

Este proyecto fue desarrollado como parte de un reto técnico, priorizando claridad arquitectónica, buenas prácticas y mantenibilidad del código.

---

## Stack tecnológico

- React + TypeScript  
- React Router  
- Axios  
- Tailwind CSS  
- json-server (mock de API REST)

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Debraye7/Reto_Tecnico_Frontend_FleetTracker.git
cd Reto_Tecnico_Frontend_FleetTracker
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Levantar el backend mock (json-server)

```bash
npm run server
```

El servidor se levanta en:  
http://localhost:3001

### 4. Levantar la aplicación frontend

```bash
npm run dev
```

La aplicación estará disponible en:  
http://localhost:5173

---

## Funcionalidades principales

### Listado de vehículos

- Búsqueda por placa, marca o modelo  
- Filtro por estado  
- Paginación  

### Gestión de vehículos

- Vista de detalle de un vehículo  
- Registro de nuevos vehículos  
- Edición de vehículos existentes  
- Cambio de estado del vehículo (Disponible / En uso / Mantenimiento)  
- Eliminación de vehículos con confirmación  

### Validaciones

- Validación de formularios en frontend con mensajes por campo

---

## Decisiones técnicas relevantes

### Gestión del estado de los vehículos

Se utiliza **PATCH** para actualizaciones parciales (por ejemplo, cambio de estado), ya que refleja mejor el comportamiento real de una API REST.

### Validaciones

Las validaciones se implementan en frontend para cumplir el alcance del reto.  
Se valida formato de placa, fechas, rangos numéricos y campos obligatorios.  
Los errores se muestran de forma nativa y contextual por campo, priorizando claridad y experiencia de usuario.

### Búsqueda y filtrado

Dado que el soporte de full-text (q) de json-server depende de la versión, la búsqueda se resuelve en frontend para garantizar un comportamiento consistente independientemente de las limitaciones de `json-server`.

---

## Arquitectura

Separación clara entre responsabilidades:

- Páginas (`pages`)
- Componentes reutilizables (`components`)
- Utilidades (`utils`)
- Tipos (`types`)
- Servicios de API (`api`)

Los formularios reutilizables (`VehicleForm`) se utilizan tanto para crear como para editar, evitando duplicación de lógica.

---

## Estilos

Se utiliza **Tailwind CSS** con:

- Clases base globales
- Componentes reutilizables (`btn`, `input`, `card`, etc.)

El diseño prioriza claridad, jerarquía visual y consistencia.

---

## Estructura del proyecto (simplificada)

```txt
src/
├── api/
│   ├── api.ts
│   └── vehiclesService.ts
│
├── components/
│   ├── Card.tsx
│   ├── Form.tsx
│   ├── StatusSelect.tsx
│   └── Header.tsx
│
├── pages/
│   ├── VehicleList.tsx
│   ├── VehicleDetail.tsx
│   ├── VehicleCreate.tsx
│   └── VehicleEdit.tsx
│
├── utils/
│   ├── vehicleFilters.ts
│   └── badgesColor.ts
│
├── layouts/
│   └── BaseLayout.tsx
│
├── types.ts
├── main.tsx
└── App.tsx
```

---

## Notas finales

El uso de `json-server` se limita a simular una API real, sin introducir lógica dependiente del mock.