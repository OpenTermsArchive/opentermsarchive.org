import React from 'react';
import l from './Layout.module.css';
import s from './Header.module.css';

const Header = () => {
  return <>
    <div className={`${l.container} ${s.header}`}>
      <div className={`${l.wrapper} ${s.header_content}`}>Header</div>
    </div>
  </>;
};

export default Header;
