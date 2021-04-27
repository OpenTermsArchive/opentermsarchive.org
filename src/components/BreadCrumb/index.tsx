import { MdChevronRight as IconSeparator } from 'react-icons/md';
import Link from 'next/link';
import React from 'react';
import s from './Breadcrumb.module.scss';

export interface IBreadcrumb {
  name: string;
  url?: string;
}

interface IProps {
  items: IBreadcrumb[];
}

const Breadcrumb: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({
  items,
  className,
}) => (
  <nav className={`${s.wrapper} ${className}`} role="navigation">
    <ul>
      {items.map(({ name, url }, i: number) => (
        <React.Fragment key={name ? `${name}-${i}` : i}>
          {i > 0 && (
            <li>
              <IconSeparator />
            </li>
          )}
          <li key={name}>
            {url && (
              <Link href={url} passHref={!url.startsWith('/')}>
                <a>{name}</a>
              </Link>
            )}
            {!url && <span>{name}</span>}
          </li>
        </React.Fragment>
      ))}
    </ul>
  </nav>
);

export default Breadcrumb;
