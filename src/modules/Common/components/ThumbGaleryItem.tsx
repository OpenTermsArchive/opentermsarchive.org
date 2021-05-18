import Image from 'next/image';
import React from 'react';
import classNames from 'classnames';
import s from './ThumbGaleryItem.module.css';

type ThumbGaleryItemProps = {
  width: string;
  height: string;
  src: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ThumbGaleryItem: React.FC<ThumbGaleryItemProps> = ({
  children,
  width,
  height,
  src,
  className,
  ...props
}) => {
  return (
    <div className={classNames(s.thumbGaleryItem, className)} {...props}>
      <Image src={src} width={width} height={height} />
      {children}
    </div>
  );
};

export default ThumbGaleryItem;
