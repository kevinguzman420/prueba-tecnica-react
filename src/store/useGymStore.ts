import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Plan,
  Comment,
  SalaItem,
  IncidenceStatus,
  UserProfile,
  HistoryEntry,
  WorkOrder,
  Material,
} from '../types';

/* ─── State shape ────────────────────────────── */
interface GymState {
  // User Profile
  isUserActive: boolean;
  userProfile: UserProfile;
  setUserActive: (active: boolean) => void;
  updateUserProfile: (fields: Partial<UserProfile>) => void;

  // Memberships
  plans: Plan[];
  addPlan: (plan: Omit<Plan, 'id' | 'createdAt'>) => void;
  deletePlan: (id: string) => void;
  togglePlanActive: (id: string) => void;

  // Incidences
  incidenceStatus: IncidenceStatus;
  incidenceComments: Comment[];
  incidenceHistory: HistoryEntry[];
  setIncidenceStatus: (status: IncidenceStatus) => void;
  addIncidenceComment: (text: string) => void;

  // Work Order
  workOrder: WorkOrder;
  toggleWorkOrderStep: (id: string) => void;
  addWorkOrderMaterial: (material: Material) => void;
  updateWorkOrderNotes: (notes: string) => void;
  updateWorkOrderObservaciones: (obs: string) => void;

  // Facilities / Sala
  salaItems: SalaItem[];
  addSalaItem: (item: Omit<SalaItem, 'id'>) => void;
  removeSalaItem: (id: string) => void;
  toggleSalaItemEstado: (id: string) => void;
}

/* ─── Default data ───────────────────────────── */
const defaultProfile: UserProfile = {
  name: "Pablo Victor",
  filial: "Reparto",
  email: "usuariodeprueb@gmail.com",
  telefono: "123",
  registrado: "04-10-2024",
  nacimiento: "21-07-2004",
  sexo: "Masculino",
  objetivo: "Incremento de masa muscular",
  etiqueta: "Prueba",
};

const defaultSalaItems: SalaItem[] = [
  { id: "item-1", name: "Cinta 03", category: "Fitness Machines", estado: "Falla", pm: "12/09/2025" },
  { id: "item-2", name: "Aire 02", category: "HVAC", estado: "OK", pm: "12/09/2025" },
];

const defaultIncidenceHistory: HistoryEntry[] = [
  { fecha: "10/10/2025 09:43", accion: "Creación de incidencia", usuario: "Marta Gómez" },
  { fecha: "10/10/2025 09:43", accion: "Asignada a Juan Pérez", usuario: "Sistema" },
  { fecha: "10/10/2025 09:43", accion: "Estado → En progreso", usuario: "Juan Pérez" },
  { fecha: "10/10/2025 09:43", accion: "Comentario añadido", usuario: "Sistema" },
];

const defaultWorkOrder: WorkOrder = {
  id: "OT-204",
  titulo: "Reparación motor cinta NordicTrack 03",
  item: "Cinta de correr NordicTrack 03",
  sala: "Sala Fitness (1ª planta)",
  creadaPor: "Marta Gómez (Recepción)",
  asignadoA: "Juan Pérez (Técnico mantenimiento)",
  fechaCreacion: "10/10/2025 - 10:00",
  fechaLimite: "11/10/2025 - 17:00",
  ultimaActualizacion: "11/10/2025 - 12:30",
  pasos: [
    { id: "s1", descripcion: "Desconectar equipo y verificar alimentación", resultado: "Correcto", status: "Correcto", checked: false },
    { id: "s2", descripcion: "Medir voltaje del motor principal", resultado: "230V", status: "230V", checked: false },
    { id: "s3", descripcion: "Sustituir fusible principal", resultado: "Hecho", status: "Hecho", checked: false },
    { id: "s4", descripcion: "Verificar velocidad tras encendido", resultado: "Pendiente", status: "Pendiente", checked: false },
  ],
  notasAdicionales: '"El motor respondía intermitentemente; se recomienda revisar conectores internos."',
  materiales: [
    { codigo: "REP-045", descripcion: "REP-045", cantidad: 1, unidad: "ud", costo: "3.50 USD" },
    { codigo: "REP-045", descripcion: "REP-045", cantidad: 2, unidad: "m", costo: "3.50 USD" },
  ],
  tiempoInicio: "10/10/2025 - 10:15",
  tiempoFin: "11/10/2025 - 12:10",
  duracionTotal: "1h 55m",
  tecnico: "Juan Pérez",
  firmaTecnico: "10/10/2025 - 10:15",
  firmaResponsable: "11/10/2025 - 12:10",
  observacionesFinales: "> Equipo probado y en funcionamiento normal.\n> Se recomienda mantenimiento preventivo en 30 días.",
};

/* ─── Store ──────────────────────────────────── */
export const useGymStore = create<GymState>()(
  persist(
    (set) => ({
      // ── User Profile ──
      isUserActive: true,
      userProfile: defaultProfile,
      setUserActive: (active) => set({ isUserActive: active }),
      updateUserProfile: (fields) =>
        set((state) => ({ userProfile: { ...state.userProfile, ...fields } })),

      // ── Memberships ──
      plans: [],
      addPlan: (newPlan) =>
        set((state) => ({
          plans: [
            ...state.plans,
            {
              ...newPlan,
              id: crypto.randomUUID(),
              createdAt: new Date().toLocaleDateString('es-ES'),
            },
          ],
        })),
      deletePlan: (id) =>
        set((state) => ({ plans: state.plans.filter((p) => p.id !== id) })),
      togglePlanActive: (id) =>
        set((state) => ({
          plans: state.plans.map((p) =>
            p.id === id ? { ...p, active: !p.active } : p,
          ),
        })),

      // ── Incidences ──
      incidenceStatus: 'en-progreso',
      incidenceComments: [
        {
          author: "Marta Gómez (Recepción)",
          time: "10/10/2025 - 09:45",
          text: '"Reporto incidencia tras ver que la cinta no responde."',
        },
        {
          author: "Juan Pérez (Técnico)",
          time: "10/10/2025 - 11:00",
          text: '"Comprobando alimentación y fusible. Solicito repuesto motor interno."',
        },
        {
          author: "Marta Gómez",
          time: "10/10/2025 - 11:15",
          text: '"Gracias Juan, deja aviso si necesitas cortar el suministro."',
        },
      ],
      incidenceHistory: defaultIncidenceHistory,
      setIncidenceStatus: (status) =>
        set((state) => ({
          incidenceStatus: status,
          incidenceHistory: [
            ...state.incidenceHistory,
            {
              fecha: new Date().toLocaleString('es-ES', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit',
              }),
              accion: `Estado → ${status === 'abierta' ? 'Abierta' : status === 'en-progreso' ? 'En progreso' : 'Cerrada'}`,
              usuario: "Tú (Admin)",
            },
          ],
        })),
      addIncidenceComment: (text) =>
        set((state) => ({
          incidenceComments: [
            ...state.incidenceComments,
            {
              author: "Tú (Administrador)",
              time: new Date().toLocaleString('es-ES', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit',
              }),
              text: `"${text}"`,
            },
          ],
          incidenceHistory: [
            ...state.incidenceHistory,
            {
              fecha: new Date().toLocaleString('es-ES', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit',
              }),
              accion: "Comentario añadido",
              usuario: "Sistema",
            },
          ],
        })),

      // ── Work Order ──
      workOrder: defaultWorkOrder,
      toggleWorkOrderStep: (id) =>
        set((state) => ({
          workOrder: {
            ...state.workOrder,
            pasos: state.workOrder.pasos.map((s) =>
              s.id === id ? { ...s, checked: !s.checked } : s,
            ),
          },
        })),
      addWorkOrderMaterial: (material) =>
        set((state) => ({
          workOrder: {
            ...state.workOrder,
            materiales: [...state.workOrder.materiales, material],
          },
        })),
      updateWorkOrderNotes: (notes) =>
        set((state) => ({
          workOrder: { ...state.workOrder, notasAdicionales: notes },
        })),
      updateWorkOrderObservaciones: (obs) =>
        set((state) => ({
          workOrder: { ...state.workOrder, observacionesFinales: obs },
        })),

      // ── Facilities ──
      salaItems: defaultSalaItems,
      addSalaItem: (item) =>
        set((state) => ({
          salaItems: [...state.salaItems, { ...item, id: crypto.randomUUID() }],
        })),
      removeSalaItem: (id) =>
        set((state) => ({
          salaItems: state.salaItems.filter((i) => i.id !== id),
        })),
      toggleSalaItemEstado: (id) =>
        set((state) => ({
          salaItems: state.salaItems.map((i) =>
            i.id === id
              ? { ...i, estado: i.estado === 'OK' ? 'Falla' : 'OK' }
              : i,
          ),
        })),
    }),
    {
      name: 'gym-manager-storage',
    },
  ),
);
