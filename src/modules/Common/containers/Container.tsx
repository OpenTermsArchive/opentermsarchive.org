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
  paddingLeft?: boolean;
  paddingRight?: boolean;
  paddingY?: boolean;
  paddingTop?: boolean;
  paddingBottom?: boolean;
  paddingYSmall?: boolean;
  gridCols?: string;
  gridGutters?: string;
  backgroundImage?: string;
  alignX?: 'left' | 'center' | 'right';
} & React.HTMLAttributes<HTMLDivElement>;

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  layout = 'boxed',
  flex = false,
  paddingX = true,
  paddingLeft = true,
  paddingRight = true,
  paddingY = true,
  paddingTop = true,
  paddingBottom = true,
  paddingYSmall = false,
  dark = false,
  gray = false,
  bgColor,
  gridCols = '12',
  gridGutters = '11',
  backgroundImage,
  alignX = 'center',
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
        { [s.container__hasNoPaddingLeft]: paddingLeft === false },
        { [s.container__hasNoPaddingRight]: paddingRight === false },
        { [s.container__hasNoPaddingY]: paddingY === false },
        { [s.container__hasNoPaddingTop]: paddingTop === false },
        { [s.container__hasNoPaddingBottom]: paddingBottom === false },
        { [s.container__hasPaddingYSmall]: paddingYSmall === true },
        s[`container__${gridCols}${gridGutters}`],
        s[`container__alignX${alignX}`],
        className
      )}
      style={additionnalStyle}
    >
      {children}
    </div>
  );
};

export default Container;
