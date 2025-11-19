import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-bold shadow-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/30",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white shadow-slate-500/30",
    danger: "bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/30",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};