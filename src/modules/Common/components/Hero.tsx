import React from 'react';
import s from './Hero.module.css';
import classNames from 'classnames';

type HeroProps = {
  title?: string;
  desc?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Hero: React.FC<HeroProps> = ({ children, className, ...props }) => {
  return (
    <div className={classNames(s.hero, className)} {...props}>
      {children}
    </div>
  );
};

export default Hero;
