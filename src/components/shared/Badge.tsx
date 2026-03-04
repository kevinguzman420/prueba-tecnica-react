import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "primary" | "progress";
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-success-light text-green-700",
    warning: "bg-warning-light text-orange-700",
    danger: "bg-danger-light text-red-700",
    primary: "bg-[#EDE9FE] text-primary",
    progress: "bg-[#FEF3C7] text-[#92400E]",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${
        styles[variant] || styles.default
      }`}
    >
      {children}
    </span>
  );
};
