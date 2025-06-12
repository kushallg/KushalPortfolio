import React from "react";

export default function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) {
  const variantStyles = {
    default: `
      bg-black text-white border-2 border-white 
      shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] 
      transition-all duration-150 ease-in-out 
      transform 
      hover:-translate-x-1 hover:-translate-y-1 
      hover:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)]
    `,
    reverse: `
      bg-white text-black border-2 border-white 
      shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] 
      transition-all duration-150 ease-in-out 
      transform 
      hover:-translate-x-1 hover:-translate-y-1 
      hover:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)]
    `,
    neutral: `
      bg-gray-200 text-black border-2 border-white
    `,
  };

  const sizeStyles = {
    default: "px-4 py-2 text-sm rounded-md",
    sm: "px-3 py-1.5 text-sm rounded-md",
    lg: "px-6 py-3 text-base rounded-lg",
    icon: "p-2 rounded-full",
  };

  const combinedClassName = `${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
