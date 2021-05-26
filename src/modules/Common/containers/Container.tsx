import React from 'react';
import classNames from 'classnames';
import s from './Container.module.css';

type ContainerProps = {
  className?: string;
  layout?: 'boxed' | 'fluid' | 'wide';
  flex?: boolean;
  dark?: boolean;
  gray?: boolean;
  bgColor?: string;
  paddingX?: boolean;
  paddingY?: boolean;
  paddingYSmall?: boolean;
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
  paddingYSmall = false,
  dark = false,
  gray = false,
  bgColor,
  gridCols = '12',
  gridGutters = '11',
  backgroundImage,
  ...props
}: ContainerProps) => {
  let additionnalStyle: any = {};
  if (backgroundImage) {
    additionnalStyle.backgroundImage = `url(${backgroundImage})`;
  }
  if (bgColor) {
    additionnalStyle.backgroundColor = bgColor;
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
        { [s.container__isGray]: !!gray },
        { [s.container__hasNoPaddingX]: paddingX === false },
        { [s.container__hasNoPaddingY]: paddingY === false },
        { [s.container__hasPaddingYSmall]: paddingYSmall === true },
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
