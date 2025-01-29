import React from "react";
import { DivideIcon as LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: typeof LucideIcon;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  icon: Icon,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "rounded-lg py-2 px-4 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variantStyles = {
    primary: "bg-[#0066b3] text-white hover:bg-[#005292]",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  };
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}
