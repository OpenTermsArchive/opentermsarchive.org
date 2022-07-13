import { FiUser } from 'react-icons/fi';
import Image from 'next/image';
import React from 'react';
import classNames from 'classnames';
import s from './Card.module.css';

type CardProps = {
  title?: string;
  image?: string;
  subtitle?: string | React.ReactElement;
  author?: string;
  authorIcon?: boolean;
  authorCenter?: boolean;
  className?: string;
  link?: string;
  center?: boolean;
  small?: boolean;
  big?: boolean;
  white?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Card: React.FC<CardProps> = ({
  children,
  title,
  image,
  subtitle,
  author,
  authorIcon = true,
  authorCenter = false,
  link,
  center = false,
  small,
  big,
  white = false,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(
        s.card,
        link ? s.card__isLink : null,
        center ? s.card__center : null,
        small ? s.card__isSmall : null,
        big ? s.card__isBig : null,
        white ? s.card__isWhite : null,
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
        <div
          className={classNames(s.card_author, {
            [s.card_author__isCenter]: authorCenter === true,
          })}
        >
          {authorIcon && (
            <div className={s.card_author_icon}>
              <FiUser color="#999999" />
            </div>
          )}
          <div className={classNames(s.card_author_desc, 'text__light')}>{author}</div>
        </div>
      )}
      {link && <a className={s.card_link} href={link} target="_blank" rel="noopener"></a>}
    </div>
  );
};

export default Card;
