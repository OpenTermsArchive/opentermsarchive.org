import React from 'react';
import s from './LinkArrow.module.css';
import { FiArrowRight as IconArrow } from 'react-icons/fi';
import Link, { LinkProps } from 'next/link';
import classNames from 'classnames';

type LinkArrowProps = {
  iconColor?: string;
  className?: string;
  small?: boolean;
} & LinkProps;

const LinkArrow: React.FC<LinkArrowProps> = ({
  children,
  iconColor,
  small = false,
  className,
  ...props
}) => {
  return (
    <Link {...props}>
      <a className={classNames(s.linkArrow, small ? s.linkArrow__isSmall : null, className)}>
        <IconArrow color={iconColor} />
        <span className={s.linkArrow_content}>{children}</span>
      </a>
    </Link>
  );
};

export default LinkArrow;
