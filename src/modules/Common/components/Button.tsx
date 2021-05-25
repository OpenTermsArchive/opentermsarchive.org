import React from 'react';
import classNames from 'classnames';
import s from './Button.module.css';

type ButtonProps = {
  className?: string;
  type?: 'primary' | 'secondary';
} & React.HTMLProps<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, className, type = 'primary', ...props }) => {
  return (
    <button
      type="button"
      className={classNames(s.button, type === 'secondary' ? s.button__secondary : null, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
