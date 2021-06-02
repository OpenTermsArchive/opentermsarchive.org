import { FiChevronLeft as IconCollapse, FiChevronRight as IconExpand } from 'react-icons/fi';

import React from 'react';
import s from './Drawer.module.css';
import { useToggle } from 'react-use';

const Drawer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const [expanded, toggleExpanded] = useToggle(true);

  return (
    <section className={`${s.wrapper} ${expanded ? s.expanded : ''} ${className || ''}`} {...props}>
      <button className={s.expander} onClick={toggleExpanded}>
        {expanded ? <IconCollapse /> : <IconExpand />}
      </button>
      {children}
    </section>
  );
};

export default Drawer;
