import React from 'react';
import classNames from 'classnames';
import s from './ThumbGallery.module.css';

type ThumbGalleryProps = {
  title?: string;
  subtitle?: string;
  titleLevel?: 'h2' | 'h3' | 'h4';
  small?: boolean;
  align?: 'left' | 'center' | 'right';
  marginTop?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ThumbGallery: React.FC<ThumbGalleryProps> = ({
  children,
  title,
  subtitle,
  titleLevel = 'h2',
  small = false,
  align = 'center',
  marginTop = true,
  className,
  ...props
}) => {
  const TitleComponent = titleLevel;
  const hasTitle = title || subtitle;

  return (
    <div
      className={classNames(
        s.thumbGalery,
        { [s.thumbGalery__isSmall]: !!small },
        s[`thumbGalery__alignX${align}`],
        className
      )}
      {...props}
    >
      {hasTitle && (
        <div className={classNames(s.thumbGalery_header)}>
          {title && <TitleComponent className={s.logoGalery_title}>{title}</TitleComponent>}
          {subtitle && <div className={s.thumbGalery_subtitle}>{subtitle}</div>}
        </div>
      )}
      <div
        className={classNames(s.thumbGalery_items, {
          [s.thumbGalery_items__hasNoMarginTop]: marginTop === false,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default ThumbGallery;
