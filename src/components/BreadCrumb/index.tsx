import { FiChevronRight as IconSeparator } from 'react-icons/fi';
import { Link } from 'modules/I18n';
import React from 'react';
import s from './Breadcrumb.module.css';

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
  <nav className={`${s.breadcrumb} ${className}`} role="navigation">
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
                {name}
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
