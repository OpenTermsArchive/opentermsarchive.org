import * as FeatherIcons from 'react-icons/fi';

import Link, { LinkProps } from 'next/link';

import React from 'react';
import classNames from 'classnames';
import s from './LinkIcon.module.css';

type LinkIconProps = {
  iconColor?: string;
  className?: string;
  small?: boolean;
  direction?: 'right' | 'left';
  iconName?: keyof typeof FeatherIcons;
} & LinkProps;

const LinkIcon: React.FC<LinkIconProps & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  iconColor,
  small = false,
  direction = 'right',
  className,
  iconName = 'FiArrowRight',
  ...allProps
}) => {
  const icon = iconName
    ? React.createElement(FeatherIcons[iconName], { color: iconColor })
    : undefined;

  const { href, as, replace, scroll, shallow, passHref, prefetch, locale, ...props } = allProps;
  const linkProps = { href, as, replace, scroll, shallow, passHref, prefetch, locale };

  return (
    <Link {...linkProps}>
      <a
        className={classNames(
          s.linkIcon,
          small ? s.linkIcon__isSmall : null,
          direction === 'left' ? s.linkIcon__isLeft : null,
          className
        )}
        {...props}
      >
        {icon}
        <span className={s.linkIcon_content}>{children}</span>
      </a>
    </Link>
  );
};

export default LinkIcon;
