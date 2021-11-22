import LogoSVGBlack from '../../../../public/images/logo/logo-open-terms-archive-black.svg';
import React from 'react';
import s from './Logo.module.css';

type LogoProps = {
  fill?: string;
  className?: string;
} & React.SVGAttributes<SVGElement>;

const Logo: React.FC<LogoProps> = ({ children, className, fill, ...props }: LogoProps) => {
  return (
    <div className={s.logo}>
      <LogoSVGBlack {...props} />
    </div>
  );
};

export default Logo;
