import React from 'react';
import classNames from 'classnames';
import s from './Button.module.css';

type ButtonProps = {
  className?: string;
  type?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  onlyIcon?: boolean;
} & Omit<React.HTMLProps<HTMLButtonElement>, 'size'>;

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type = 'primary',
  size = 'md',
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
        size ? s[size] : null,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
