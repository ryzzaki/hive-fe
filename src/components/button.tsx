import React, { ReactNode } from 'react';
import cn from 'classnames';

type ButtonProps = {
  variation: 'primary' | 'secondary';
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, variation = 'primary', onClick, className }) => (
  <button
    className={cn('px-15 md:px-10 py-10 md:py-4 font-bold rounded-md', className, {
      'bg-amber-500 text-white': variation === 'primary',
      'border-2 border-amber-500 text-amber-500': variation === 'secondary',
    })}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
