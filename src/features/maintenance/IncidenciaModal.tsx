import React, { useState } from "react";
import { Badge } from "../../components/shared/Badge";
import { Button } from "../../components/shared/Button";
import { Textarea } from "../../components/shared/FormElements";
import { InfoRow, CollapsibleSection } from "../../components/shared/LayoutElements";
import { useGymStore } from "../../store/useGymStore";
import type { IncidenceStatus } from "../../types";

const statusConfig: Record<IncidenceStatus, { label: string; variant: "progress" | "success" | "danger" }> = {
  'abierta': { label: "Abierta", variant: "danger" },
  'en-progreso': { label: "En progreso", variant: "progress" },
  'cerrada': { label: "Cerrada", variant: "success" },
};

const nextStatusMap: Record<IncidenceStatus, IncidenceStatus> = {
  'abierta': 'en-progreso',
  'en-progreso': 'cerrada',
  'cerrada': 'abierta',
};

export const IncidenciaModal: React.FC = () => {
  const [newComment, setNewComment] = useState("");
  const {
    incidenceComments,
    addIncidenceComment,
    incidenceStatus,
    setIncidenceStatus,
    incidenceHistory,
  } = useGymStore();

  const handleAddComment = () => {
    if (newComment.trim()) {
      addIncidenceComment(newComment);
      setNewComment("");
    }
  };

  const handleAdvanceStatus = () => {
    setIncidenceStatus(nextStatusMap[incidenceStatus]);
  };

  const handleClose = () => {
    setIncidenceStatus('cerrada');
  };

  const isClosed = incidenceStatus === 'cerrada';
  const { label: statusLabel, variant: statusVariant } = statusConfig[incidenceStatus];

  return (
    <div className="w-[380px] fade-in">
      <div className="bg-white rounded-xl shadow-modal overflow-hidden max-h-[650px] flex flex-col">
        {/* Header */}
        <div className="px-4 pt-3.5 pb-2.5 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="m-0 text-[15px] font-bold tracking-wider">INCIDENCIA #INC-310</h2>
              <p className="m-0 mt-0.5 text-[11px] text-gray-400">Cinta no arranca correctamente</p>
            </div>
            <span
              className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-lg"
              onClick={() => setIncidenceStatus(incidenceStatus)}
              title="Cerrar modal"
            >
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
              <Badge variant={statusVariant}>{statusLabel}</Badge>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-3">
          {/* Descripción */}
          <CollapsibleSection title="Descripcion">
            <p className="m-0 text-[13px] text-gray-600 leading-relaxed">
              El monitor reporta que la cinta NordicTrack 03 no enciende desde ayer. Al encender, muestra un pitido y pantalla negra. Posible fallo eléctrico o fusible interno.
            </p>
          </CollapsibleSection>

          {/* Responsable */}
          <CollapsibleSection title="RESPONSABLE">
            <InfoRow label="Asignado a" value="Juan Pérez (Técnico mantenimiento)" />
            <InfoRow label="Fecha de creación" value="10/10/2025 - 09:43" />
            <InfoRow label="Fecha límite según SLA" value="11/10/2025 - 17:00" />
            <InfoRow label="Última actualización" value="11/10/2025 - 10:15" />
          </CollapsibleSection>

          {/* Comentarios */}
          <CollapsibleSection title="Comentarios">
            <div className="flex flex-col gap-3 mb-4">
              {incidenceComments.map((c, i) => (
                <div key={i} className="border-l-2 border-primary pl-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-[12px] font-bold text-gray-900">{c.author}</span>
                    <span className="text-[11px] text-gray-400">{c.time}</span>
                  </div>
                  <p className="m-0 text-[13px] text-gray-600 italic leading-snug">{c.text}</p>
                </div>
              ))}
            </div>

            {!isClosed && (
              <div className="flex flex-col gap-2">
                <Textarea
                  placeholder="Escribe un comentario..."
                  value={newComment}
                  onChange={setNewComment}
                />
                <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                  Enviar comentario
                </Button>
              </div>
            )}

            {isClosed && (
              <p className="text-[12px] text-gray-400 text-center italic mt-2">
                Incidencia cerrada — no se pueden agregar comentarios.
              </p>
            )}
          </CollapsibleSection>

          {/* Medios */}
          <CollapsibleSection title="Medios">
            <div className="flex flex-col items-center gap-3">
              {/* Drop zone */}
              <div className="w-full border-2 border-dashed border-gray-200 rounded-lg py-6 flex flex-col items-center gap-1 bg-gray-50 hover:border-primary/40 transition-colors cursor-pointer">
                <span className="text-2xl text-gray-400">☁</span>
                <span className="text-[12px] text-gray-500">Arrastra imágenes aquí o</span>
                <span className="text-[12px] text-primary font-semibold cursor-pointer hover:underline">busca archivos</span>
              </div>
              {/* Thumbnail placeholders */}
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-lg border border-gray-200">🖼</div>
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-lg border border-gray-200">🖼</div>
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-lg border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors">+</div>
              </div>
              {/* Video corto */}
              <div className="w-full">
                <p className="text-[12px] font-bold text-gray-700 m-0 mb-1">Video corto</p>
                <div className="border border-gray-200 rounded-lg py-3 text-center bg-gray-50 cursor-pointer hover:border-primary/40 transition-colors">
                  <span className="text-[12px] text-gray-500">🎬 Subir vídeo (máx. 30s)</span>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Historial de cambios */}
          <CollapsibleSection title="Historial de cambios">
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-100">
                    <th className="pb-1.5 font-medium">Fecha</th>
                    <th className="pb-1.5 font-medium">Acción</th>
                    <th className="pb-1.5 font-medium">Usuario</th>
                    <th className="pb-1.5 w-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {incidenceHistory.map((entry, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-1.5 text-gray-500 whitespace-nowrap">{entry.fecha}</td>
                      <td className="py-1.5 text-gray-700">{entry.accion}</td>
                      <td className="py-1.5 text-gray-700">{entry.usuario}</td>
                      <td className="py-1.5 text-gray-400 cursor-pointer">···</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CollapsibleSection>
        </div>

        {/* Footer — 3 buttons matching design */}
        <div className="px-3 py-2.5 border-t border-gray-100 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAdvanceStatus}
            style={{ flex: 1 }}
          >
            {isClosed ? "Reabrir" : "Cambiar estado"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            style={{ flex: 1 }}
            onClick={() => {/* Reasignar: placeholder */}}
          >
            Reasignar
          </Button>
          <Button
            variant={isClosed ? "purple" : "danger"}
            size="sm"
            onClick={handleClose}
            disabled={isClosed}
            style={{ flex: 1 }}
          >
            {isClosed ? "Ya cerrada" : "Cerrar incidencia"}
          </Button>
        </div>
      </div>
    </div>
  );
};
