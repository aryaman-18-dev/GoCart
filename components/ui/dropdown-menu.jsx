"use client";

import { createContext, cloneElement, isValidElement, useContext, useEffect, useRef, useState } from "react";

const DropdownContext = createContext(null);

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={ref} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild, children, ...props }) {
  const { setOpen } = useDropdownMenu();
  const triggerProps = {
    ...props,
    onClick: (event) => {
      props.onClick?.(event);
      setOpen((value) => !value);
    },
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...triggerProps,
      onClick: (event) => {
        children.props.onClick?.(event);
        triggerProps.onClick(event);
      },
    });
  }

  return <button type="button" {...triggerProps}>{children}</button>;
}

export function DropdownMenuContent({ align = "start", className = "", children }) {
  const { open } = useDropdownMenu();

  if (!open) return null;

  return (
    <div
      className={`absolute top-full z-50 mt-2 min-w-40 overflow-hidden ${align === "end" ? "right-0" : "left-0"} ${className}`}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ asChild, className = "", children, onClick, ...props }) {
  const { setOpen } = useDropdownMenu();
  const itemProps = {
    ...props,
    onClick: (event) => {
      onClick?.(event);
      setOpen(false);
    },
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...itemProps,
      className: `${children.props.className || ""} ${className}`,
      onClick: (event) => {
        children.props.onClick?.(event);
        itemProps.onClick(event);
      },
    });
  }

  return (
    <button type="button" className={`w-full text-left ${className}`} {...itemProps}>
      {children}
    </button>
  );
}

export function DropdownMenuLabel({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-slate-200" />;
}

function useDropdownMenu() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown menu components must be used inside DropdownMenu.");
  }
  return context;
}
