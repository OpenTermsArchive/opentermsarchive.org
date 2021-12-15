import { FiUser } from 'react-icons/fi';
import Image from 'next/image';
import React from 'react';
import classNames from 'classnames';
import s from './Card.module.css';

type CardProps = {
  title?: string;
  image?: string;
  subtitle?: string;
  author?: string;
  className?: string;
  link?: string;
  center?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Card: React.FC<CardProps> = ({
  children,
  title,
  image,
  subtitle,
  author,
  link,
  center = false,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(
        s.card,
        link ? s.card__isLink : null,
        center ? s.card__center : null,
        className
      )}
      {...props}
    >
      {image && (
        <div className={s.card_header}>
          <Image src={image} layout="fill" objectFit="cover" objectPosition="top" />
        </div>
      )}
      <div className={s.card_body}>
        {title && <h4 className={s.card_title}>{title}</h4>}
        {subtitle && <h5 className={classNames(s.card_subtitle, 'h5__light')}>{subtitle}</h5>}
        {children && <div className={s.card_children}>{children}</div>}
      </div>
      {author && (
        <div className={s.card_author}>
          <div className={s.card_author_icon}>
            <FiUser color="#999999" />
          </div>
          <div className={classNames(s.card_author_desc, 'text__light')}>{author}</div>
        </div>
      )}
      <a className={s.card_link} href={link} target="_blank" rel="noopener"></a>
    </div>
  );
};

export default Card;
