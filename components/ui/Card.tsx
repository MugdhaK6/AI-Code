import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-slate-900/40 border border-slate-800 rounded-xl shadow-2xl shadow-slate-950/50 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
};