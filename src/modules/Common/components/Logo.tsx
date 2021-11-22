import LogoSVGBlack from '../../../../public/images/logo/logo-open-terms-archive-black.svg';
import LogoSVGWhite from '../../../../public/images/logo/logo-open-terms-archive-white.svg';
import React from 'react';
import classNames from 'classnames';
import s from './Logo.module.css';

type LogoProps = {
  className?: string;
  backgroundType?: 'white' | 'black';
  size?: 'small' | 'medium' | 'large' | 'full';
} & React.SVGAttributes<SVGElement>;

const Logo: React.FC<LogoProps> = ({
  children,
  className,
  backgroundType = 'white',
  size = 'medium',
  ...props
}: LogoProps) => {
  return (
    <div
      className={classNames(
        s.logo,
        size === 'small' ? s.logo__small : null,
        size === 'medium' ? s.logo__medium : null,
        size === 'large' ? s.logo__large : null,
        size === 'full' ? s.logo__full : null
      )}
    >
      {backgroundType === 'white' && <LogoSVGBlack {...props} />}
      {backgroundType === 'black' && <LogoSVGWhite {...props} />}
    </div>
  );
};

export default Logo;
