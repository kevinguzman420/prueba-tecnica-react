import React, { useState } from "react";

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  valueStyle?: React.CSSProperties;
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value, valueStyle = {} }) => (
  <div className="flex justify-between items-center py-[7px] border-b border-gray-100 last:border-0">
    <span className="text-[13px] text-gray-700 font-medium">
      {label}
    </span>
    <span
      className="text-[13px] text-gray-400 text-right"
      style={valueStyle}
    >
      {value}
    </span>
  </div>
);

interface SectionHeaderProps {
  title: string;
  collapsible?: boolean;
  collapsed: boolean;
  onToggle: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  collapsible = true,
  collapsed,
  onToggle,
}) => (
  <div
    onClick={collapsible ? onToggle : undefined}
    className={`flex justify-between items-center px-4 py-3 bg-gray-50 select-none ${
      collapsed ? "rounded-lg" : "rounded-t-lg"
    } ${collapsible ? "cursor-pointer" : "cursor-default"}`}
  >
    <span className="text-[13px] font-semibold text-gray-700">
      {title}
    </span>
    {collapsible && (
      <span
        className={`text-[12px] text-gray-400 transition-transform duration-200 ${
          collapsed ? "rotate-180" : "rotate-0"
        }`}
      >
        ▲
      </span>
    )}
  </div>
);

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = true,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
      <SectionHeader
        title={title}
        collapsed={!open}
        onToggle={() => setOpen(!open)}
      />
      {open && (
        <div className="px-4 py-3 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};
