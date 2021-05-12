import classNames from 'classnames';
import React from 'react';
import s from './Container.module.css';

type ContainerProps = {
  className?: string;
  layout?: 'boxed' | 'fluid'| 'wide';
  flex?: true | false;
  padding?: true | false;
  gridCols?:string;
  gridGutters?:string;
  backgroundImage?:string;
} & React.HTMLAttributes<HTMLDivElement>;

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  layout = 'boxed',
  flex = false,
  padding = true,
  gridCols = '12',
  gridGutters = '11',
  backgroundImage,
  ...props
}: ContainerProps) => {
  let additionnalStyle;
  if(backgroundImage != undefined){
    additionnalStyle = {
      backgroundImage: 'url(' + backgroundImage + ')'
    }
  }
  return (
    <div
      {...props}
      className={classNames(
        s.container,
        { [s.container__fluid]: layout === 'fluid' },
        { [s.container__wide]: layout === 'wide' },
        { [s.container__hasBgImage]: backgroundImage !== undefined},
        { [s.container__flex]: flex === true },
        { [s.container__hasNoPadding]: padding === false },
        s.[`container__${gridCols+gridGutters}`],
        className
      )}
      style={ additionnalStyle }
    >
      {children}
    </div>
  );
};

export default Container;
