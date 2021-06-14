import * as React from 'react';

import classnames from 'classnames';
import s from './FullPageLayout.module.css';

const FullPageLayout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={classnames(s.wrapper, className)} {...props}>
    {children}
  </div>
);
const Header: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <header className={classnames(s.header, className)} {...props}>
    {children}
  </header>
);
const Main: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <main className={classnames(s.main, className)} {...props}>
    {children}
  </main>
);
const Footer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <footer className={classnames(s.footer, className)} {...props}>
    {children}
  </footer>
);

const FullPageLayoutWrapper = (props: { children: any }) => (
  <FullPageLayout>{props.children}</FullPageLayout>
);

FullPageLayoutWrapper.Header = Header;
FullPageLayoutWrapper.Main = Main;
FullPageLayoutWrapper.Footer = Footer;

export default FullPageLayoutWrapper;
