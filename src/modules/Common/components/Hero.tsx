import React from 'react';
import s from './Hero.module.css';
import classNames from 'classnames';

type HeroProps = {
  className?: string;
  title?: string;
  subTitle?: string;
  isDark?: false | true;
} & React.HTMLAttributes<HTMLDivElement>;

const Hero: React.FC<HeroProps> = ({
  children,
  className,
  title,
  subTitle,
  isDark = true,
  ...props
}) => {
  return (
    <div
      className={classNames(s.hero, { [s.hero__isDark]: isDark === true }, className)}
      {...props}
    >
      {title ? <h1 className={s.hero_title}>{title}</h1> : undefined}
      {subTitle ? (
        <div className={classNames(s.hero_subtitle, 'text__subtitle')}>{subTitle}</div>
      ) : undefined}

      {children}
    </div>
  );
};

export default Hero;
