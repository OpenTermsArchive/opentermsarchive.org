import { FiUser } from 'react-icons/fi';
import Image from 'next/image';
import React from 'react';
import classNames from 'classnames';
import s from './Card.module.css';

type CardProps = {
  title?: string;
  image?: string;
  subtitle?: string | React.ReactElement;
  author?: string | React.ReactElement;
  hasAuthorIcon?: boolean;
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
  hasAuthorIcon = true,
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
        {
          [s.card__isWhite]: !!white,
          [s.card__isLink]: !!link,
          [s.card__center]: !!center,
          [s.card__isSmall]: !!small,
          [s.card__isBig]: !!big,
        },
        className
      )}
      {...props}
    >
      {image && (
        <div className={s.card_header}>
          <Image src={image} layout="fill" objectFit="cover" objectPosition="top" alt="" />
        </div>
      )}
      <div className={s.card_body}>
        {title && <h4 className={s.card_title}>{title}</h4>}
        {subtitle && (
          <h5
            className={classNames(s.card_subtitle, 'h5__light')}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
        {children && <div className={s.card_children}>{children}</div>}
      </div>
      {author && (
        <div
          className={classNames(s.card_author, {
            [s.card_author__isCenter]: authorCenter,
          })}
        >
          {hasAuthorIcon && (
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
