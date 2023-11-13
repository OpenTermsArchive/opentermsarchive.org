import React from 'react';
import classNames from 'classnames';
import s from './Hero.module.css';

type HeroProps = {
  className?: string;
  title?: string;
  subtitle?: string;
  marginBottom?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Hero: React.FC<HeroProps> = ({
  children,
  className,
  title,
  subtitle,
  marginBottom = true,
  ...props
}) => {
  return (
    <div
      className={classNames(
        s.hero,
        { [s.hero__hasNoMarginBottom]: marginBottom === false },
        className
      )}
      {...props}
    >
      {title && <h1 className={s.hero_title} dangerouslySetInnerHTML={{ __html: title }}></h1>}
      {subtitle && (
        <h2 className={classNames(s.hero_subtitle, 'h2__thin')}>
          {subtitle} {children}
        </h2>
      )}
    </div>
  );
};

export default Hero;
