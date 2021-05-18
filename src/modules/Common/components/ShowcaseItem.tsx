import { FiUser } from 'react-icons/fi';
import React from 'react';
import classNames from 'classnames';
import s from './ShowcaseItem.module.css';

type ShowcaseItemProps = {
  title: string;
  desc: string;
  author: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ShowcaseItem: React.FC<ShowcaseItemProps> = ({
  children,
  title,
  desc,
  author,
  className,
  ...props
}) => {
  return (
    <div className={classNames(s.showcaseItem, className)} {...props}>
      <h4 className={s.showcaseItem_title}>{title}</h4>
      <p className={s.showcaseItem_desc}>{desc}</p>
      {children}
      <div className={s.showcaseItem_author}>
        <div className={s.showcaseItem_author_icon}>
          <FiUser color="#999999" />
        </div>
        <div className={classNames(s.showcaseItem_author_desc, 'text__light')}>{author}</div>
      </div>
    </div>
  );
};

export default ShowcaseItem;
