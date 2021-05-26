// import Image from 'next/image';
import React from 'react';
import classNames from 'classnames';
import s from './ThumbGaleryItem.module.css';

type ThumbGaleryItemProps = {
  width: string;
  height: string;
  src: string;
  small?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ThumbGaleryItem: React.FC<ThumbGaleryItemProps> = ({
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

export default ThumbGaleryItem;
