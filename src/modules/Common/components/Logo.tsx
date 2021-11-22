import LogoSVGBlack from '../../../../public/images/logo/logo-open-terms-archive-black.svg';
import LogoSVGWhite from '../../../../public/images/logo/logo-open-terms-archive-white.svg';
import React from 'react';
import s from './Logo.module.css';

type LogoProps = {
  fill?: string;
  className?: string;
  backgroundType?: 'white' | 'black';
} & React.SVGAttributes<SVGElement>;

const Logo: React.FC<LogoProps> = ({
  children,
  className,
  fill,
  backgroundType = 'white',
  ...props
}: LogoProps) => {
  return (
    <div className={s.logo}>
      {backgroundType === 'white' && <LogoSVGBlack {...props} />}
      {backgroundType === 'black' && <LogoSVGWhite {...props} />}
    </div>
  );
};

export default Logo;
