import { useLockBodyScroll, useToggle } from 'react-use';

import { FiX } from 'react-icons/fi';
import Link from 'next/link';
import Logo from 'modules/Common/components/Logo';
import React from 'react';
import classNames from 'classnames';
import s from './Header.module.css';

type HeaderProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Header: React.FC<HeaderProps> = ({ children, className, ...props }) => {
  const [open, toggleExtended] = useToggle(false);
  useLockBodyScroll(open);

  return (
    <header className={classNames(s.header, { [s.header__isOpen]: open })}>
      <div className={s.header_logo}>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className={classNames(s.header_menus)}>{children}</div>

      <button type="button" className={classNames(s.header_openLink)} onClick={toggleExtended}>
        Menu
      </button>
      <button type="button" className={classNames(s.header_closeLink)} onClick={toggleExtended}>
        Close
        <FiX color="#fefffd" />
      </button>
    </header>
  );
};

export default Header;
