import React from 'react';
import './styles.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', fullWidth, className = '', ...props }) => {
  const cls = `btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${className}`.trim();
  return <button {...props} className={cls} />;
};

export default Button;
