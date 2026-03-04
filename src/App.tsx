import React, { useState } from "react";
import { UserProfileSidebar } from "./features/profile/UserProfileSidebar";
import { NewPlanModal } from "./features/membership/NewPlanModal";
import { IncidenciaModal } from "./features/maintenance/IncidenciaModal";
import { SalaDetailSidebar } from "./features/facilities/SalaDetailSidebar";
import { OrdenTrabajoModal } from "./features/workorder/OrdenTrabajoModal";

const tabs = [
  { id: "profile", label: "👤 Perfil" },
  { id: "plan", label: "📋 Nuevo Plan" },
  { id: "incidencia", label: "🔧 Incidencia" },
  { id: "sala", label: "🏋️ Sala" },
  { id: "orden", label: "🛠️ Orden" },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderPanel = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfileSidebar />;
      case "plan":
        return <NewPlanModal />;
      case "incidencia":
        return <IncidenciaModal />;
      case "sala":
        return <SalaDetailSidebar onNavigateToIncidencia={() => setActiveTab("incidencia")} />;
      case "orden":
        return <OrdenTrabajoModal />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6 text-white">
        <h1 className="m-0 text-[22px] font-extrabold tracking-tight">
          <span className="text-primary-light">Gym</span>Manager UI
        </h1>
        <p className="m-0 mt-1 text-[13px] text-white/50">
          Pixel-perfect React · Tailwind v4 · TypeScript
        </p>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-2 mb-6 bg-white/10 p-1.5 rounded-xl">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`border-none rounded-lg px-3.5 py-2 text-[12px] font-semibold cursor-pointer transition-all duration-200 shadow-card ${
              activeTab === t.id
                ? "bg-white text-gray-900 shadow-card"
                : "bg-transparent text-white/60 shadow-none"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="fade-in">{renderPanel()}</div>
    </div>
  );
};

export default App;
