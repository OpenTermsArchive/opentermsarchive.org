import React from 'react';
import classNames from 'classnames';
import s from './Container.module.css';

type ContainerProps = {
  className?: string;
  layout?: 'boxed' | 'fluid' | 'wide';
  flex?: true | false;
  dark?: boolean;
  paddingX?: true | false;
  paddingY?: true | false;
  gridCols?: string;
  gridGutters?: string;
  backgroundImage?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  layout = 'boxed',
  flex = false,
  paddingX = true,
  paddingY = true,
  dark = false,
  gridCols = '12',
  gridGutters = '11',
  backgroundImage,
  ...props
}: ContainerProps) => {
  let additionnalStyle: any = {};
  if (backgroundImage !== undefined) {
    additionnalStyle = {
      backgroundImage: `url(${backgroundImage})`,
    };
  }

  return (
    <div
      {...props}
      className={classNames(
        s.container,
        { [s.container__fluid]: layout === 'fluid' },
        { [s.container__wide]: layout === 'wide' },
        { [s.container__hasBgImage]: backgroundImage !== undefined },
        { [s.container__flex]: flex === true },
        { [s.container__isDark]: dark === true },
        { [s.container__hasNoPaddingX]: paddingX === false },
        { [s.container__hasNoPaddingY]: paddingY === false },
        s[`container__${gridCols}${gridGutters}`],
        className
      )}
      style={additionnalStyle}
    >
      {children}
    </div>
  );
};

export default Container;
