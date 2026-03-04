import React, { useState } from "react";
import { Toggle } from "../../components/shared/Toggle";
import { Card, Input, Select } from "../../components/shared/FormElements";
import { InfoRow } from "../../components/shared/LayoutElements";
import { Button } from "../../components/shared/Button";
import { Badge } from "../../components/shared/Badge";
import { useGymStore } from "../../store/useGymStore";

const etiquetaOptions = [
  { label: "Prueba", value: "Prueba" },
  { label: "VIP", value: "VIP" },
  { label: "Nuevo", value: "Nuevo" },
  { label: "Frecuente", value: "Frecuente" },
];

export const UserProfileSidebar: React.FC = () => {
  const { isUserActive, setUserActive, userProfile, updateUserProfile } = useGymStore();
  const [editing, setEditing] = useState(false);

  return (
    <div className="w-[300px]">
      {/* Header */}
      <div className="bg-gray-400 rounded-t-xl p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xl overflow-hidden">
          👤
        </div>
        <div className="flex flex-col gap-1">
          <Toggle checked={isUserActive} onChange={setUserActive} label="Activo" />
          <Badge variant={isUserActive ? "success" : "danger"}>
            {isUserActive ? "Cuenta activa" : "Cuenta inactiva"}
          </Badge>
        </div>
      </div>

      <div className="bg-gray-400 rounded-b-xl px-3 pb-3 flex flex-col gap-2.5">
        <Card>
          <div className="flex justify-between items-center mb-3">
            <h3 className="m-0 text-base font-bold text-gray-900">
              {userProfile.name}
            </h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Guardar" : "Editar"}
            </Button>
          </div>

          {editing ? (
            <div className="flex flex-col gap-2">
              <div>
                <label className="text-[12px] text-gray-500 block mb-1">E-mail</label>
                <Input
                  value={userProfile.email}
                  onChange={(v) => updateUserProfile({ email: v })}
                  type="email"
                />
              </div>
              <div>
                <label className="text-[12px] text-gray-500 block mb-1">Teléfono</label>
                <Input
                  value={userProfile.telefono}
                  onChange={(v) => updateUserProfile({ telefono: v })}
                  type="tel"
                />
              </div>
              <div>
                <label className="text-[12px] text-gray-500 block mb-1">Objetivo</label>
                <Input
                  value={userProfile.objetivo}
                  onChange={(v) => updateUserProfile({ objetivo: v })}
                />
              </div>
            </div>
          ) : (
            <>
              <InfoRow label="Filial/centro habitual" value={userProfile.filial} />
              <InfoRow label="E-mail" value={userProfile.email} />
              <InfoRow label="Teléfono" value={userProfile.telefono} />
              <InfoRow label="Registrado" value={userProfile.registrado} />
              <InfoRow label="Fecha de nacimiento" value={userProfile.nacimiento} />
              <InfoRow label="Sexo" value={userProfile.sexo} />
              <InfoRow
                label="Objetivo"
                value={userProfile.objetivo}
                valueStyle={{ color: "#9CA3AF" }}
              />
            </>
          )}
        </Card>

        <Card>
          <h4 className="m-0 mb-3 text-[14px] font-bold">
            Etiquetas
          </h4>
          <div className="mb-2">
            <div className="text-[12px] text-gray-500 mb-1">
              Cliente
            </div>
            <Select
              value={userProfile.etiqueta ?? "Prueba"}
              onChange={(v) => updateUserProfile({ etiqueta: v })}
              options={etiquetaOptions}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
