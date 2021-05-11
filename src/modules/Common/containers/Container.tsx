import classNames from 'classnames';
import React from 'react';
import s from './Container.module.css';

type ContainerProps = {
  className?: string;
  layout?: 'boxed' | 'fluid';
} & React.HTMLAttributes<HTMLDivElement>;

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  layout = 'boxed',
  ...props
}: ContainerProps) => {
  return (
    <div
      {...props}
      className={classNames(s.container, { [s.container__fluid]: layout === 'fluid' }, className)}
    >
      Container
      {children}
    </div>
  );
};

export default Container;
