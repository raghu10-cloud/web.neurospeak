import React from 'react';

export default function GradientText({ children, className = '' }) {
  return (
    <span className={`bg-gradient-to-r from-primary via-secondary to-alert text-transparent bg-clip-text animate-gradient bg-[length:200%_auto] ${className}`}>
      {children}
    </span>
  );
}
