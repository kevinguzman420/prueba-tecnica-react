import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "purple" | "danger";
  size?: "sm" | "md";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  type = "button",
  className = "",
  style = {},
}) => {
  const baseClasses =
    "rounded-full font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2";
  const sizeClasses =
    size === "sm" ? "px-3.5 py-1.5 text-[12px]" : "px-5 py-2.5 text-[13px]";

  const variantClasses: Record<string, string> = {
    primary:
      "bg-linear-to-br from-accent to-accent-pink text-white border-none cursor-pointer hover:brightness-110 hover:shadow-md active:scale-[0.97]",
    secondary:
      "bg-transparent text-gray-700 border border-gray-300 cursor-pointer hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100",
    purple:
      "bg-primary text-white border-none cursor-pointer hover:bg-primary-light hover:shadow-md active:scale-[0.97]",
    danger:
      "bg-danger text-white border-none cursor-pointer hover:brightness-110 active:scale-[0.97]",
  };

  const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]} ${disabled ? disabledClasses : ""} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};
