import React, { ReactNode } from 'react';
import cn from 'classnames';

type ButtonProps = {
  variation: 'primary' | 'secondary';
  children?: ReactNode;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, variation = 'primary', onClick }) => (
  <button
    className={cn('px-10 py-4 font-bold rounded-md', {
      'bg-amber-500 text-white': variation === 'primary',
      'border-2 border-amber-500 text-amber-500': variation === 'secondary',
    })}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
