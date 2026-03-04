import React, { useState } from "react";
import { Toggle } from "../../components/shared/Toggle";
import { Button } from "../../components/shared/Button";
import { Input, Select, Textarea } from "../../components/shared/FormElements";
import { CollapsibleSection } from "../../components/shared/LayoutElements";
import { useGymStore } from "../../store/useGymStore";
import { Badge } from "../../components/shared/Badge";
import { useForm } from "../../hooks/useForm";
import type { DaySchedule, EventoAcceso } from "../../types";

const allDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const cicloOptions = [
  { label: "Fijo", value: "fijo" },
  { label: "Variable", value: "variable" },
];
const periodicidadOptions = [
  { label: "Mensual", value: "mensual" },
  { label: "Semanal", value: "semanal" },
  { label: "Anual", value: "anual" },
];
const centrosOptions = [
  { label: "Todos los centros", value: "todos" },
  { label: "Centro principal", value: "principal" },
  { label: "Sucursal Norte", value: "norte" },
];
const instalacionesOptions = [
  { label: "Gimnasio, Piscina, Sauna, Clases grupales", value: "todas" },
  { label: "Solo Gimnasio", value: "gimnasio" },
  { label: "Gimnasio y Piscina", value: "gym-piscina" },
];
const periodoOptions = [
  { label: "Semana/Mes/Periodo", value: "periodo" },
  { label: "Semana", value: "semana" },
  { label: "Mes", value: "mes" },
];

const defaultHorarios: DaySchedule[] = allDays.map((d) => ({
  day: d,
  start: "00:00",
  end: "00:00",
}));

const defaultEventos: EventoAcceso[] = [
  { tipo: "AD", evento: "Spinning", accesos: "2", periodo: "periodo" },
  { tipo: "SP", evento: "Entrenamiento", accesos: "1", periodo: "periodo" },
  { tipo: "ES", evento: "Tenis", accesos: "0", periodo: "periodo" },
];

interface PlanFormValues {
  name: string;
  desc: string;
  price: string;
  active: boolean;
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
  planesEntrenamiento: boolean;
  planesNutricion: boolean;
  invitacionesTerceros: string;
  accesosAlCentro: string;
  accesosCentroPeriodo: string;
  observaciones: string;
}

export const NewPlanModal: React.FC = () => {
  const { plans, addPlan, deletePlan, togglePlanActive } = useGymStore();

  const [horarios, setHorarios] = useState<DaySchedule[]>(defaultHorarios);
  const [eventos, setEventos] = useState<EventoAcceso[]>(defaultEventos);

  const {
    values,
    setValue,
    visibleErrors,
    isValid,
    touchAll,
    reset,
  } = useForm<PlanFormValues>(
    {
      name: "", desc: "", price: "99.00", active: true,
      ciclo: "fijo", periodicidad: "mensual",
      limiteUsuarios: "4", prorrateo: true,
      duracionDescuento: "3", descuento: "15%",
      matricula: "50.00",
      centrosPermitidos: "todos", accesoInstalaciones: "todas",
      mismoHorario: true,
      planesEntrenamiento: true, planesNutricion: false,
      invitacionesTerceros: "2", accesosAlCentro: "4",
      accesosCentroPeriodo: "periodo",
      observaciones: "",
    },
    {
      name: (v) => (v.trim() ? null : "El nombre es obligatorio"),
      desc: (v) => (v.trim() ? null : "La descripción es obligatoria"),
      price: (v) =>
        v.trim() && !isNaN(Number(v)) && Number(v) >= 0
          ? null
          : "Introduce un precio válido (≥ 0)",
    },
  );

  const updateHorario = (
    idx: number,
    field: "start" | "end",
    val: string,
  ) => {
    setHorarios((prev) =>
      prev.map((h, i) => (i === idx ? { ...h, [field]: val } : h)),
    );
  };

  const updateEvento = (
    idx: number,
    field: keyof EventoAcceso,
    val: string,
  ) => {
    setEventos((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, [field]: val } : e)),
    );
  };

  const handleCreatePlan = () => {
    touchAll();
    if (!isValid) return;
    addPlan({
      name: values.name,
      description: values.desc,
      price: values.price,
      active: values.active,
      ciclo: values.ciclo,
      periodicidad: values.periodicidad,
      limiteUsuarios: values.limiteUsuarios,
      prorrateo: values.prorrateo,
      duracionDescuento: values.duracionDescuento,
      descuento: values.descuento,
      matricula: values.matricula,
      centrosPermitidos: values.centrosPermitidos,
      accesoInstalaciones: values.accesoInstalaciones,
      mismoHorario: values.mismoHorario,
      horarios,
      planesEntrenamiento: values.planesEntrenamiento,
      planesNutricion: values.planesNutricion,
      invitacionesTerceros: values.invitacionesTerceros,
      accesosAlCentro: values.accesosAlCentro,
      accesosCentroPeriodo: values.accesosCentroPeriodo,
      eventosAcceso: eventos,
      observaciones: values.observaciones,
    });
    reset();
    setHorarios(defaultHorarios);
  };

  const handleReset = () => {
    reset();
    setHorarios(defaultHorarios);
    setEventos(defaultEventos);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-4xl fade-in">
      {/* ─── Form ─────────────────────── */}
      <div className="w-[340px] bg-white rounded-xl shadow-modal overflow-hidden max-h-[650px] flex flex-col">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 flex justify-between items-center border-b border-gray-100">
          <h2 className="m-0 text-base font-bold text-gray-900">Crear nuevo plan</h2>
          <span
            className="cursor-pointer text-gray-400 text-lg hover:text-gray-600 transition-colors"
            onClick={handleReset}
            title="Limpiar formulario"
          >
            ✕
          </span>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-3">
          {/* ── Datos generales ── */}
          <CollapsibleSection title="Datos generales">
            <div className="flex flex-col gap-2.5">
              <div>
                <label className="text-[12px] text-gray-500 block mb-1">Nombre del plan*</label>
                <Input placeholder="Nombre" value={values.name} onChange={(v) => setValue("name", v)} error={visibleErrors.name} />
              </div>
              <div>
                <label className="text-[12px] text-gray-500 block mb-1">Descripción*</label>
                <Input placeholder="Descripción" value={values.desc} onChange={(v) => setValue("desc", v)} error={visibleErrors.desc} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-gray-700">Estado</span>
                <Toggle checked={values.active} onChange={(v) => setValue("active", v)} label={values.active ? "Activo" : "Inactivo"} />
              </div>
            </div>
          </CollapsibleSection>

          {/* ── Precio y condiciones ── */}
          <CollapsibleSection title="Precio y condiciones">
            <div className="flex flex-col gap-2.5">
              {/* Precio base */}
              <div>
                <label className="text-[12px] text-gray-500 block mb-1">Precio base</label>
                <div className="flex border border-gray-200 rounded-md overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30 transition-colors">
                  <input value={values.price} onChange={(e) => setValue("price", e.target.value)} className="flex-1 border-none px-2.5 py-2 text-[13px] outline-none" type="number" min="0" step="0.01" />
                  <span className="px-2.5 py-2 text-[13px] text-gray-400 bg-gray-50 border-l border-gray-200">USD ▾</span>
                </div>
                {visibleErrors.price && <span className="block mt-0.5 text-[11px] text-danger">{visibleErrors.price}</span>}
              </div>
              {/* Ciclo + Periodicidad */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[12px] text-gray-500 block mb-1">Ciclo</label>
                  <Select value={values.ciclo} onChange={(v) => setValue("ciclo", v)} options={cicloOptions} />
                </div>
                <div>
                  <label className="text-[12px] text-gray-500 block mb-1">Periodicidad</label>
                  <Select value={values.periodicidad} onChange={(v) => setValue("periodicidad", v)} options={periodicidadOptions} />
                </div>
              </div>
              {/* Límite usuarios */}
              <div>
                <label className="text-[12px] text-gray-500 block mb-1">Límite de usuarios o familiares dependientes</label>
                <Input value={values.limiteUsuarios} onChange={(v) => setValue("limiteUsuarios", v)} type="number" />
              </div>
              {/* Prorrateo */}
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-gray-700">Permite prorrateo en alta</span>
                <Toggle checked={values.prorrateo} onChange={(v) => setValue("prorrateo", v)} label={values.prorrateo ? "Sí" : "No"} />
              </div>
              {/* Descuento */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[12px] text-gray-500 block mb-1">Duración del descuento (periodos)</label>
                  <Input value={values.duracionDescuento} onChange={(v) => setValue("duracionDescuento", v)} type="number" />
                </div>
                <div>
                  <label className="text-[12px] text-gray-500 block mb-1">Descuento</label>
                  <Input value={values.descuento} onChange={(v) => setValue("descuento", v)} placeholder="15%" />
                </div>
              </div>
              {/* Matrícula */}
              <div>
                <label className="text-[12px] text-gray-500 block mb-1">Matrícula por defecto</label>
                <div className="flex border border-gray-200 rounded-md overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30 transition-colors">
                  <input value={values.matricula} onChange={(e) => setValue("matricula", e.target.value)} className="flex-1 border-none px-2.5 py-2 text-[13px] outline-none" type="number" min="0" step="0.01" />
                  <span className="px-2.5 py-2 text-[13px] text-gray-400 bg-gray-50 border-l border-gray-200">USD ▾</span>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* ── Accesos y beneficios ── */}
          <CollapsibleSection title="Accesos y beneficios">
            <div className="flex flex-col gap-2.5">
              <div>
                <label className="text-[12px] text-gray-500 font-bold block mb-1">Centros permitidos</label>
                <Select value={values.centrosPermitidos} onChange={(v) => setValue("centrosPermitidos", v)} options={centrosOptions} />
              </div>
              <div>
                <label className="text-[12px] text-gray-500 font-bold block mb-1">Acceso a instalaciones</label>
                <Select value={values.accesoInstalaciones} onChange={(v) => setValue("accesoInstalaciones", v)} options={instalacionesOptions} />
              </div>
              {/* Mismo horario toggle */}
              <div className="flex justify-between items-center text-[12px] text-gray-600">
                <span>Todos los centros e instalaciones tienen los mismos horarios</span>
                <Toggle checked={values.mismoHorario} onChange={(v) => setValue("mismoHorario", v)} />
              </div>
              {/* Horarios */}
              <div className="grid grid-cols-[60px_1fr_1fr] gap-1.5 mb-1">
                <span className="text-[11px] text-gray-400">Días</span>
                <span className="text-[11px] text-gray-400">Hora de inicio</span>
                <span className="text-[11px] text-gray-400">Hora de fin</span>
              </div>
              {horarios.map((h, idx) => (
                <div key={h.day} className="grid grid-cols-[60px_1fr_1fr] gap-1.5 items-center">
                  <span className="inline-flex items-center justify-center bg-primary text-white rounded-full py-1 text-[11px] font-semibold">
                    {h.day}
                  </span>
                  <div className="flex items-center border border-gray-200 rounded-md px-2 py-1 gap-1 focus-within:border-primary transition-colors">
                    <input
                      type="time"
                      value={h.start}
                      onChange={(e) => updateHorario(idx, "start", e.target.value)}
                      className="text-[12px] flex-1 border-none outline-none bg-transparent"
                    />
                  </div>
                  <div className="flex items-center border border-gray-200 rounded-md px-2 py-1 gap-1 focus-within:border-primary transition-colors">
                    <input
                      type="time"
                      value={h.end}
                      onChange={(e) => updateHorario(idx, "end", e.target.value)}
                      className="text-[12px] flex-1 border-none outline-none bg-transparent"
                    />
                  </div>
                </div>
              ))}
              {/* Beneficios */}
              <div className="mt-2">
                <p className="text-[12px] text-gray-500 font-bold m-0 mb-2">Beneficios incluidos</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[13px] text-gray-700">Planes de entrenamiento</span>
                  <Toggle checked={values.planesEntrenamiento} onChange={(v) => setValue("planesEntrenamiento", v)} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-700">Planes de nutrición</span>
                  <Toggle checked={values.planesNutricion} onChange={(v) => setValue("planesNutricion", v)} />
                </div>
              </div>
              {/* Invitaciones */}
              <div>
                <label className="text-[12px] text-gray-500 font-bold block mb-1">Invitaciones a terceros</label>
                <Input value={values.invitacionesTerceros} onChange={(v) => setValue("invitacionesTerceros", v)} type="number" />
              </div>
              {/* Accesos al centro */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[12px] text-gray-500 font-bold block mb-1">Accesos al centro</label>
                  <Input value={values.accesosAlCentro} onChange={(v) => setValue("accesosAlCentro", v)} type="number" />
                </div>
                <div>
                  <label className="text-[12px] text-gray-500 block mb-1">&nbsp;</label>
                  <Select value={values.accesosCentroPeriodo} onChange={(v) => setValue("accesosCentroPeriodo", v)} options={periodoOptions} />
                </div>
              </div>
              {/* Accesos a eventos */}
              <div>
                <p className="text-[12px] text-gray-500 font-bold m-0 mb-2">Accesos a eventos</p>
                <div className="grid grid-cols-[40px_1fr_40px_1fr] gap-1 text-[11px] text-gray-400 mb-1">
                  <span>Tipo</span><span>Evento</span><span>Acc.</span><span>Periodo</span>
                </div>
                {eventos.map((ev, idx) => (
                  <div key={idx} className="grid grid-cols-[40px_1fr_40px_1fr] gap-1 items-center mb-1.5">
                    <span className="text-[12px] text-gray-700">{ev.tipo}</span>
                    <span className="text-[12px] text-gray-700">{ev.evento}</span>
                    <input
                      value={ev.accesos}
                      onChange={(e) => updateEvento(idx, "accesos", e.target.value)}
                      className="w-full border border-gray-200 rounded px-1.5 py-1 text-[12px] outline-none text-center focus:border-primary transition-colors"
                      type="number"
                      min="0"
                    />
                    <Select
                      value={ev.periodo}
                      onChange={(v) => updateEvento(idx, "periodo", v)}
                      options={periodoOptions}
                      className="!text-[11px] !py-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleSection>

          {/* ── Observaciones internas ── */}
          <CollapsibleSection title="Observaciones internas">
            <div>
              <label className="text-[12px] text-gray-500 font-bold block mb-1">Notas visibles solo para administración</label>
              <Textarea
                placeholder="Notas internas sobre el plan..."
                value={values.observaciones}
                onChange={(v) => setValue("observaciones", v)}
                rows={3}
              />
            </div>
          </CollapsibleSection>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-100 flex justify-end gap-2">
          <Button variant="secondary" onClick={handleReset}>Cancelar</Button>
          <Button variant="primary" onClick={handleCreatePlan}>Crear plan</Button>
        </div>
      </div>

      {/* ─── Plans list ───────────────── */}
      <div className="w-[320px] bg-white rounded-xl shadow-modal p-4 flex flex-col max-h-[650px]">
        <h3 className="m-0 mb-4 text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
          Planes Guardados ({plans.length})
        </h3>

        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
          {plans.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-[13px]">
              No hay planes creados aún.<br />Usa el formulario para empezar.
            </div>
          ) : (
            plans.map((plan) => (
              <div key={plan.id} className="border border-gray-100 rounded-lg p-3 bg-gray-50 relative group hover:shadow-card transition-shadow">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-[14px] text-gray-900">{plan.name}</span>
                  <button onClick={() => togglePlanActive(plan.id)} className="border-none bg-transparent cursor-pointer p-0">
                    <Badge variant={plan.active ? "success" : "danger"}>
                      {plan.active ? "Activo" : "Inactivo"}
                    </Badge>
                  </button>
                </div>
                <p className="text-[12px] text-gray-500 m-0 mb-2 line-clamp-2">{plan.description}</p>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="font-bold text-primary">${plan.price} USD</span>
                  <button
                    onClick={() => deletePlan(plan.id)}
                    className="text-red-400 hover:text-red-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity border-none bg-transparent text-[12px]"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
