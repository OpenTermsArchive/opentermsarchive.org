import React from 'react';
import s from './Button.module.css';
import classNames from 'classnames';
import Link from 'next/link';

type ButtonProps = {
  className?: string;
  href: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Button: React.FC<ButtonProps> = ({ children, className, href, ...props }) => {
  return (
    <Link {...props} href={href}>
      <a href={href} className={classNames(s.button, className)}>
        {children}
      </a>
    </Link>
  );
};

export default Button;
