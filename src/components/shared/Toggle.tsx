import React from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => (
  <div className="flex items-center gap-2">
    {label && (
      <span className="text-[13px] text-gray-700">{label}</span>
    )}
    <div
      onClick={() => onChange(!checked)}
      className={`w-10 h-[22px] rounded-full cursor-pointer relative transition-colors duration-200 ${
        checked ? "bg-primary" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-[18px] h-[18px] rounded-full bg-white absolute top-0.5 transition-all duration-200 shadow-sm ${
          checked ? "left-5" : "left-0.5"
        }`}
      />
    </div>
  </div>
);
