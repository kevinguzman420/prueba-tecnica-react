import React, { useState } from "react";
import { Badge } from "../../components/shared/Badge";
import { Button } from "../../components/shared/Button";
import { Input, Select } from "../../components/shared/FormElements";
import { InfoRow, CollapsibleSection } from "../../components/shared/LayoutElements";
import { useGymStore } from "../../store/useGymStore";
import type { ItemEstado } from "../../types";

const categoryOptions = [
  { label: "Fitness Machines", value: "Fitness Machines" },
  { label: "HVAC", value: "HVAC" },
  { label: "Iluminación", value: "Iluminación" },
  { label: "Sonido", value: "Sonido" },
];

interface SalaDetailSidebarProps {
  onNavigateToIncidencia?: () => void;
}

export const SalaDetailSidebar: React.FC<SalaDetailSidebarProps> = ({
  onNavigateToIncidencia,
}) => {
  const { salaItems, addSalaItem, removeSalaItem, toggleSalaItemEstado } =
    useGymStore();

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCat, setNewCat] = useState("Fitness Machines");

  const handleAdd = () => {
    if (!newName.trim()) return;
    addSalaItem({
      name: newName.trim(),
      category: newCat,
      estado: "OK" as ItemEstado,
      pm: new Date().toLocaleDateString("es-ES"),
    });
    setNewName("");
    setShowForm(false);
  };

  const hasFalla = salaItems.some((i) => i.estado === "Falla");

  return (
    <div className="w-[380px] fade-in">
      <div className="bg-bg-main rounded-xl p-4 shadow-modal">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="m-0 text-base font-bold text-gray-900">
            Detalle de la sala
          </h2>
          <span
            className="cursor-pointer text-gray-500 text-lg hover:text-gray-700 transition-colors"
            title="Cerrar"
          >
            ✕
          </span>
        </div>

        {/* Sala info */}
        <CollapsibleSection title="Sala Fitness">
          <InfoRow label="Planta" value="1" />
          <InfoRow label="QR" value="S-001" />
          <div className="flex justify-between items-center py-1.5">
            <span className="text-[13px] font-medium">Estado</span>
            <Badge variant={hasFalla ? "warning" : "success"}>
              {hasFalla ? "En revisión" : "Operativa"}
            </Badge>
          </div>
        </CollapsibleSection>

        {/* Items list — with (+) icon and table headers matching design */}
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
          <div className="flex justify-between items-center px-4 py-3 bg-gray-50">
            <span className="text-[13px] font-semibold text-gray-700">
              Listado de ítems en la sala
            </span>
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-200 cursor-pointer transition-colors bg-transparent text-[14px]"
              title="Añadir ítem"
            >
              ＋
            </button>
          </div>

          <div className="p-2.5">
            {/* Table headers */}
            <div className="grid grid-cols-[1fr_1fr_60px_80px] gap-1.5 mb-2 text-[11px] text-gray-400 font-medium">
              <span>Ítem</span>
              <span>Categoría</span>
              <span>Estado</span>
              <span>Último PM</span>
            </div>

            {salaItems.length === 0 && (
              <p className="text-[12px] text-gray-400 text-center py-3 m-0">
                Sin ítems registrados
              </p>
            )}

            {salaItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_1fr_60px_80px] gap-1.5 items-center mb-2 last:mb-0 group"
              >
                <span className="text-[13px]">{item.name}</span>
                <span className="text-[11px] text-gray-500">{item.category}</span>
                <button
                  onClick={() => toggleSalaItemEstado(item.id)}
                  className="border-none bg-transparent p-0 cursor-pointer"
                  title="Clic para cambiar estado"
                >
                  <Badge
                    variant={item.estado === "OK" ? "success" : "danger"}
                  >
                    {item.estado}
                  </Badge>
                </button>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">{item.pm}</span>
                  <button
                    onClick={() => removeSalaItem(item.id)}
                    className="text-red-400 hover:text-red-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity border-none bg-transparent text-[11px] ml-1"
                    title="Eliminar ítem"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inline add form */}
        {showForm && (
          <div className="border border-primary/30 rounded-lg p-3 mb-3 bg-white fade-in">
            <p className="m-0 mb-2 text-[12px] font-semibold text-gray-700">
              Nuevo ítem
            </p>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Nombre del equipo"
                value={newName}
                onChange={setNewName}
                error={
                  newName.trim() === "" && newName !== ""
                    ? "Nombre requerido"
                    : undefined
                }
              />
              <Select
                value={newCat}
                onChange={setNewCat}
                options={categoryOptions}
              />
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAdd}
                  disabled={!newName.trim()}
                >
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Footer buttons — matching design labels */}
        <div className="flex gap-2.5 justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Ocultar" : "+ Añadir ítem"}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onNavigateToIncidencia}
          >
            Crear incidencia
          </Button>
        </div>
      </div>
    </div>
  );
};
