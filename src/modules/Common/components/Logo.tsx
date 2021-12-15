import LogoSVGBlack from '../../../../public/images/logo/logo-open-terms-archive-black.svg';
import LogoSVGBlackAlternative from '../../../../public/images/logo/logo-open-terms-archive-black-alternative.svg';
import LogoSVGWhite from '../../../../public/images/logo/logo-open-terms-archive-white.svg';
import LogoSVGWhiteAlternative from '../../../../public/images/logo/logo-open-terms-archive-white-alternative.svg';
import React from 'react';
import classNames from 'classnames';
import s from './Logo.module.css';

type LogoProps = {
  backgroundType?: 'white' | 'black';
  size?: 'small' | 'medium' | 'large' | 'full';
  type?: 'normal' | 'alternative';
} & React.SVGAttributes<SVGElement>;

const Logo: React.FC<LogoProps> = ({
  children,
  className,
  backgroundType = 'white',
  size = 'medium',
  type = 'normal',
  ...props
}: LogoProps) => {
  return (
    <div className={classNames(s.logo, s[`logo__${size}`], s[`logo__${type}`], className)}>
      {backgroundType === 'white' && type === 'normal' && <LogoSVGBlack {...props} />}
      {backgroundType === 'white' && type === 'alternative' && (
        <LogoSVGBlackAlternative {...props} />
      )}
      {backgroundType === 'black' && type === 'normal' && <LogoSVGWhite {...props} />}
      {backgroundType === 'black' && type === 'alternative' && (
        <LogoSVGWhiteAlternative {...props} />
      )}
    </div>
  );
};

export default Logo;
