import React from 'react';
import l from './Layout.module.css';
import s from './Footer.module.css';

const Footer = () => {
  return <>
    <div className={`${l.container} ${s.footer}`}>
      <div className={`${l.wrapper} ${s.footer_content}`}>Footer</div>
    </div>
  </>;
};

export default Footer;
