"use client";

import { forwardRef } from "react";

const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  default: "h-10 px-4 py-2",
};

const variantClasses = {
  default: "bg-emerald-600 text-white hover:bg-emerald-700",
  ghost: "bg-transparent hover:bg-slate-100",
};

export const Button = forwardRef(function Button(
  { className = "", size = "default", variant = "default", type = "button", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.default} ${className}`}
      {...props}
    />
  );
});
