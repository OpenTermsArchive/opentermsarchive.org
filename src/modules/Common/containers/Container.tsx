import classNames from 'classnames';
import React from 'react';
import s from './Container.module.css';

type ContainerProps = {
  className?: string;
  layout?: 'boxed' | 'fluid'| 'wide';
  flex?: true | false,
  gridCols?:string,
  gridGutters?:string
} & React.HTMLAttributes<HTMLDivElement>;

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  layout = 'boxed',
  flex = false,
  gridCols = '12',
  gridGutters = '11',
  ...props
}: ContainerProps) => {
  return (
    <div
      {...props}
      className={classNames(
        s.container,
        { [s.container__fluid]: layout === 'fluid' },
        { [s.container__wide]: layout === 'wide' },
        { [s.container__flex]: flex === true },
        s.[`container__${gridCols+gridGutters}`],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
