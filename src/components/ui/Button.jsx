import React from 'react';

/**
 * Componente Button reutilizable con múltiples variantes.
 * Variantes: primary, secondary, outline, ghost
 * Tamaños: sm, md, lg
 */
const variantStyles = {
  primary:
    'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 shadow-lg shadow-amber-500/30 border border-amber-300/50 font-black',
  secondary:
    'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg font-bold',
  outline:
    'bg-transparent border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 font-bold',
  ghost:
    'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-semibold',
};

const sizeStyles = {
  sm: 'py-2 px-4 text-sm rounded-lg gap-1.5',
  md: 'py-3 px-6 text-base rounded-xl gap-2',
  lg: 'py-4 px-8 text-lg rounded-xl gap-2',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  disabled = false,
  fullWidth = false,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  const classes = [
    baseStyles,
    variantStyles[variant] || variantStyles.primary,
    sizeStyles[size] || sizeStyles.md,
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Si tiene href, renderiza un <a>
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
