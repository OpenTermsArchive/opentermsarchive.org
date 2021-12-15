// import Image from 'next/image';
import React from 'react';
import classNames from 'classnames';
import s from './ThumbGalleryItem.module.css';

type ThumbGalleryItemProps = {
  width: string;
  height: string;
  src: string;
  small?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ThumbGalleryItem: React.FC<ThumbGalleryItemProps> = ({
  children,
  width,
  height,
  src,
  small = false,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(
        s.thumbGaleryItem,
        { [s.thumbGaleryItem__isSmall]: !!small },
        className
      )}
      {...props}
    >
      <img src={src} width={width} height={height} />
      {children}
    </div>
  );
};

export default ThumbGalleryItem;
