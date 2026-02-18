import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`rounded-xl border border-slate-700 bg-slate-800 text-slate-200 shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
