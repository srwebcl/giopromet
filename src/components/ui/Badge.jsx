import React from 'react';

/**
 * Componente Badge reutilizable para etiquetas.
 * Variantes: discount, new, hot, info
 */
const variantStyles = {
  discount:
    'bg-gradient-to-r from-red-500 to-red-600 text-white font-black shadow-lg',
  new: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold',
  hot: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold',
  info: 'bg-blue-100 text-blue-800 font-bold',
  featured:
    'bg-blue-900 text-white font-bold uppercase tracking-wider',
};

const sizeStyles = {
  sm: 'text-[10px] px-2 py-0.5 rounded-md',
  md: 'text-xs px-3 py-1.5 rounded-full',
  lg: 'text-sm px-4 py-2 rounded-full',
};

export default function Badge({
  children,
  variant = 'info',
  size = 'md',
  className = '',
}) {
  const classes = [
    'inline-flex items-center gap-1.5',
    variantStyles[variant] || variantStyles.info,
    sizeStyles[size] || sizeStyles.md,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
}
