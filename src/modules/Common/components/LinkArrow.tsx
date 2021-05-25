import Link, { LinkProps } from 'next/link';

import { FiArrowRight as IconArrow } from 'react-icons/fi';
import React from 'react';
import classNames from 'classnames';
import s from './LinkArrow.module.css';

type LinkArrowProps = {
  iconColor?: string;
  className?: string;
  small?: boolean;
  direction: 'right' | 'left';
} & LinkProps;

const LinkArrow: React.FC<LinkArrowProps> = ({
  children,
  iconColor,
  small = false,
  direction = 'right',
  className,
  ...props
}) => {
  return (
    <Link {...props}>
      <a
        className={classNames(
          s.linkArrow,
          small ? s.linkArrow__isSmall : null,
          direction === 'left' ? s.linkArrow__isLeft : null,
          className
        )}
      >
        <IconArrow color={iconColor} />
        <span className={s.linkArrow_content}>{children}</span>
      </a>
    </Link>
  );
};

export default LinkArrow;
