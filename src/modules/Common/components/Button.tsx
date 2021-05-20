import React from 'react';
import classNames from 'classnames';
import s from './Button.module.css';

type ButtonProps = {
  className?: string;
} & React.HTMLProps<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button type="button" className={classNames(s.button, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
