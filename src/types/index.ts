/* ───────────────────────────────────────────────
   Domain types — Single source of truth
   ─────────────────────────────────────────────── */

// ── Membership ──────────────────────────────────
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  active: boolean;
  createdAt: string;
  ciclo: string;
  periodicidad: string;
  limiteUsuarios: string;
  prorrateo: boolean;
  duracionDescuento: string;
  descuento: string;
  matricula: string;
  centrosPermitidos: string;
  accesoInstalaciones: string;
  mismoHorario: boolean;
  horarios: DaySchedule[];
  planesEntrenamiento: boolean;
  planesNutricion: boolean;
  invitacionesTerceros: string;
  accesosAlCentro: string;
  accesosCentroPeriodo: string;
  eventosAcceso: EventoAcceso[];
  observaciones: string;
}

export interface DaySchedule {
  day: string;
  start: string;
  end: string;
}

export interface EventoAcceso {
  tipo: string;
  evento: string;
  accesos: string;
  periodo: string;
}

// ── Maintenance / Incidences ────────────────────
export type IncidenceStatus = 'abierta' | 'en-progreso' | 'cerrada';

export interface Comment {
  author: string;
  time: string;
  text: string;
}

export interface HistoryEntry {
  fecha: string;
  accion: string;
  usuario: string;
}

// ── Work Order / Orden de Trabajo ───────────────
export type CheckResultStatus = 'Correcto' | 'Hecho' | 'Pendiente' | string;

export interface WorkOrderStep {
  id: string;
  descripcion: string;
  resultado: string;
  status: CheckResultStatus;
  checked: boolean;
}

export interface Material {
  codigo: string;
  descripcion: string;
  cantidad: number;
  unidad: string;
  costo: string;
}

export interface WorkOrder {
  id: string;
  titulo: string;
  item: string;
  sala: string;
  creadaPor: string;
  asignadoA: string;
  fechaCreacion: string;
  fechaLimite: string;
  ultimaActualizacion: string;
  pasos: WorkOrderStep[];
  notasAdicionales: string;
  materiales: Material[];
  tiempoInicio: string;
  tiempoFin: string;
  duracionTotal: string;
  tecnico: string;
  firmaTecnico: string;
  firmaResponsable: string;
  observacionesFinales: string;
}

// ── Facilities / Sala ───────────────────────────
export type ItemEstado = 'OK' | 'Falla';

export interface SalaItem {
  id: string;
  name: string;
  category: string;
  estado: ItemEstado;
  pm: string;
}

// ── User Profile ────────────────────────────────
export interface UserProfile {
  name: string;
  filial: string;
  email: string;
  telefono: string;
  registrado: string;
  nacimiento: string;
  sexo: string;
  objetivo: string;
  etiqueta: string;
}
