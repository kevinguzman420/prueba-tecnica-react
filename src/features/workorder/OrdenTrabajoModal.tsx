import React from "react";
import { Badge } from "../../components/shared/Badge";
import { Button } from "../../components/shared/Button";
import { Textarea } from "../../components/shared/FormElements";
import { InfoRow, CollapsibleSection } from "../../components/shared/LayoutElements";
import { useGymStore } from "../../store/useGymStore";

const stepStatusVariant = (status: string): "success" | "primary" | "warning" | "default" => {
  switch (status) {
    case "Correcto": return "success";
    case "Hecho": return "primary";
    case "Pendiente": return "warning";
    default: return "default";
  }
};

export const OrdenTrabajoModal: React.FC = () => {
  const {
    workOrder,
    toggleWorkOrderStep,
    updateWorkOrderNotes,
    updateWorkOrderObservaciones,
  } = useGymStore();

  return (
    <div className="w-[380px] fade-in">
      <div className="bg-white rounded-xl shadow-modal overflow-hidden max-h-[650px] flex flex-col">
        {/* Header */}
        <div className="px-4 pt-3.5 pb-2.5 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="m-0 text-[15px] font-bold tracking-wider">
                ORDEN DE TRABAJO #{workOrder.id}
              </h2>
              <p className="m-0 mt-0.5 text-[11px] text-gray-400">
                Cinta no arranca correctamente
              </p>
            </div>
            <span className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-lg">
              ✕
            </span>
          </div>
          <div className="mt-2.5 flex flex-col gap-1.5">
            <InfoRow label="Sala" value="Sala Fitness" />
            <div className="flex justify-between items-center py-1">
              <span className="text-[13px] text-gray-700 font-medium">Técnico</span>
              <Badge variant="danger">Crítica</Badge>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[13px] text-gray-700 font-medium">SLA</span>
              <Badge variant="progress">En progreso</Badge>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-3">
          {/* Información básica */}
          <CollapsibleSection title="Información básica">
            <InfoRow label="Título" value={workOrder.titulo} />
            <InfoRow label="Ítem" value={workOrder.item} />
            <InfoRow label="Sala" value={workOrder.sala} />
            <InfoRow label="Creada por" value={workOrder.creadaPor} />
            <InfoRow label="Asignado a" value={workOrder.asignadoA} />
            <InfoRow label="Fecha de creación" value={workOrder.fechaCreacion} />
            <InfoRow label="Fecha límite (SLA)" value={workOrder.fechaLimite} />
            <InfoRow label="Última actualización" value={workOrder.ultimaActualizacion} />
          </CollapsibleSection>

          {/* Historial de cambios / Checklist */}
          <CollapsibleSection title="Historial de cambios">
            <table className="w-full text-[12px] mb-3">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="pb-1.5 w-6"></th>
                  <th className="pb-1.5 font-medium">Paso</th>
                  <th className="pb-1.5 font-medium">Descripción</th>
                  <th className="pb-1.5 font-medium text-right">Resultado</th>
                  <th className="pb-1.5 w-6"></th>
                </tr>
              </thead>
              <tbody>
                {workOrder.pasos.map((paso) => (
                  <tr key={paso.id} className="border-b border-gray-50">
                    <td className="py-2">
                      <input
                        type="checkbox"
                        checked={paso.checked}
                        onChange={() => toggleWorkOrderStep(paso.id)}
                        className="accent-primary w-3.5 h-3.5 cursor-pointer"
                      />
                    </td>
                    <td className="py-2 text-gray-700" colSpan={2}>
                      {paso.descripcion}
                    </td>
                    <td className="py-2 text-right">
                      <Badge variant={stepStatusVariant(paso.status)}>
                        {paso.resultado}
                      </Badge>
                    </td>
                    <td className="py-2 text-gray-400 cursor-pointer text-center">···</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px]">👤</span>
                <span className="text-[12px] font-semibold text-gray-700">Marta Gómez</span>
              </div>
              <button className="text-[12px] border border-gray-200 rounded-md px-2.5 py-1 bg-white hover:bg-gray-50 cursor-pointer transition-colors">
                +Añadir
              </button>
            </div>

            <div>
              <p className="text-[12px] font-bold text-gray-700 m-0 mb-1">Notas adicionales:</p>
              <Textarea
                value={workOrder.notasAdicionales}
                onChange={updateWorkOrderNotes}
                rows={2}
              />
            </div>
          </CollapsibleSection>

          {/* Materiales usados */}
          <CollapsibleSection title="Materiales usados">
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-100">
                    <th className="pb-1.5 font-medium">Código</th>
                    <th className="pb-1.5 font-medium">Descripción</th>
                    <th className="pb-1.5 font-medium">Cant.</th>
                    <th className="pb-1.5 font-medium">Unidad.</th>
                    <th className="pb-1.5 font-medium">Costo</th>
                  </tr>
                </thead>
                <tbody>
                  {workOrder.materiales.map((mat, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-1.5 text-gray-700">{mat.codigo}</td>
                      <td className="py-1.5 text-gray-700">{mat.descripcion}</td>
                      <td className="py-1.5 text-gray-700">{mat.cantidad}</td>
                      <td className="py-1.5 text-gray-700">{mat.unidad}</td>
                      <td className="py-1.5 text-gray-700">{mat.costo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CollapsibleSection>

          {/* Tiempo de ejecución */}
          <CollapsibleSection title="Tiempo de ejecución">
            <InfoRow label="Inicio" value={workOrder.tiempoInicio} />
            <InfoRow label="Fin" value={workOrder.tiempoFin} />
            <InfoRow
              label="Duración total"
              value={<span className="font-bold">{workOrder.duracionTotal}</span>}
            />
            <InfoRow label="Técnico" value={workOrder.tecnico} />
            <div className="mt-2 flex justify-center">
              <Button variant="primary" size="sm">Registrar nuevo tiempo</Button>
            </div>
          </CollapsibleSection>

          {/* Medios */}
          <CollapsibleSection title="Medios">
            <div className="flex flex-col items-center gap-3">
              <div className="w-full border-2 border-dashed border-gray-200 rounded-lg py-6 flex flex-col items-center gap-1 bg-gray-50 hover:border-primary/40 transition-colors cursor-pointer">
                <span className="text-2xl text-gray-400">☁</span>
                <span className="text-[12px] text-gray-500">Arrastra imágenes aquí o</span>
                <span className="text-[12px] text-primary font-semibold cursor-pointer hover:underline">busca archivos</span>
              </div>
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-lg border border-gray-200">🖼</div>
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-lg border border-gray-200">🖼</div>
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-lg border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors">+</div>
              </div>
              <div className="w-full">
                <p className="text-[12px] font-bold text-gray-700 m-0 mb-1">Video corto</p>
                <div className="border border-gray-200 rounded-lg py-3 text-center bg-gray-50 cursor-pointer hover:border-primary/40 transition-colors">
                  <span className="text-[12px] text-gray-500">🎬 Subir vídeo (máx. 30s)</span>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Firmas y observaciones */}
          <div className="mt-3 border-t border-gray-100 pt-3">
            <InfoRow label="Firma del técnico" value={workOrder.firmaTecnico} />
            <InfoRow label="Firma del responsable" value={workOrder.firmaResponsable} />
            <div className="mt-3">
              <p className="text-[12px] font-bold text-gray-700 m-0 mb-1">Observaciones finales</p>
              <Textarea
                value={workOrder.observacionesFinales}
                onChange={updateWorkOrderObservaciones}
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 py-2.5 border-t border-gray-100 flex justify-center">
          <Button variant="danger" size="sm">
            Completar y cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};
