import React from 'react';
import classNames from 'classnames';
import s from './Hero.module.css';

type HeroProps = {
  className?: string;
  title?: string;
  subtitle?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Hero: React.FC<HeroProps> = ({ children, className, title, subtitle, ...props }) => {
  return (
    <div className={classNames(s.hero, className)} {...props}>
      {title && <h1 className={s.hero_title}>{title}</h1>}
      {subtitle && <h2 className={classNames(s.hero_subtitle, 'h2__thin')}>{subtitle}</h2>}
      {children}
    </div>
  );
};

export default Hero;
