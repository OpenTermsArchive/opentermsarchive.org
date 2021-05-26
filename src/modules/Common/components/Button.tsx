import React from 'react';
import classNames from 'classnames';
import s from './Button.module.css';

type ButtonProps = {
  className?: string;
  type?: 'primary' | 'secondary';
  onlyIcon?: boolean;
} & React.HTMLProps<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type = 'primary',
  onlyIcon = false,
  ...props
}) => {
  return (
    <button
      type="button"
      className={classNames(
        s.button,
        type === 'secondary' ? s.button__secondary : null,
        onlyIcon === true ? s.button__hasOnlyIcon : null,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
