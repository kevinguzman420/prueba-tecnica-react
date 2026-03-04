import React from "react";

/* ─── Card ───────────────────────────────────── */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className = "", style = {} }) => (
  <div
    className={`bg-white rounded-lg p-4 shadow-card ${className}`}
    style={style}
  >
    {children}
  </div>
);

/* ─── Input ──────────────────────────────────── */
interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string | null;
  className?: string;
  style?: React.CSSProperties;
  type?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  error,
  className = "",
  style = {},
  type = "text",
  disabled = false,
}) => (
  <div className="w-full">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border rounded-md px-2.5 py-2 text-[13px] text-gray-700 outline-none box-border bg-white placeholder-gray-400 transition-colors duration-150 focus:border-primary focus:ring-1 focus:ring-primary/30 ${
        error ? "border-danger" : "border-gray-200"
      } ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : ""} ${className}`}
      style={style}
    />
    {error && (
      <span className="block mt-0.5 text-[11px] text-danger">{error}</span>
    )}
  </div>
);

/* ─── Select ─────────────────────────────────── */
interface SelectProps {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  className = "",
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full border border-gray-200 rounded-md px-2.5 py-2 text-[13px] bg-white outline-none transition-colors duration-150 focus:border-primary focus:ring-1 focus:ring-primary/30 cursor-pointer ${className}`}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

/* ─── Textarea ───────────────────────────────── */
interface TextareaProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
  rows?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  value,
  onChange,
  className = "",
  rows = 3,
}) => (
  <textarea
    placeholder={placeholder}
    value={value}
    rows={rows}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full border border-gray-200 rounded-md p-2 text-[13px] resize-none outline-none box-border transition-colors duration-150 focus:border-primary focus:ring-1 focus:ring-primary/30 ${className}`}
  />
);
