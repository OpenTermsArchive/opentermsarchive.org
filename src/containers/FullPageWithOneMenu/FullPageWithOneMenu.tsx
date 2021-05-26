import React, { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Menu from './Menu';
import classNames from 'classnames';
import s from './FullPageWithOneMenu.module.scss';

export type TypeBreakpoint =
  | 'smallMobile'
  | 'mobile'
  | 'tablet'
  | 'tabletOnly'
  | 'touch'
  | 'desktop'
  | 'desktopOnly'
  | 'widescreen'
  | 'widescreenOnly'
  | 'fullhd';
export type TypeTransition = string;

export interface InterfaceProps {
  children: React.ReactNode;
}

export interface InterfaceComponent extends React.FC<InterfaceProps> {
  Header: typeof Header;
  Menu: typeof Menu;
  Main: typeof Main;
}

export interface InterfaceContext {
  menuVisible: boolean;
  setMenuVisible: (bool: boolean) => void;
  toggleMenu: () => void;
}

const initialContext: InterfaceContext = {
  menuVisible: false,
  /* tslint:disable:no-empty */
  setMenuVisible: () => {},
  toggleMenu: () => {},
  /* tslint:enable:no-empty */
};

export const Context = React.createContext(initialContext);

const FullPageWithOneMenu: InterfaceComponent = ({ children }: InterfaceProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);
  const hideMenu = () => {
    setMenuVisible(false);
  };

  return (
    <Context.Provider
      value={{
        menuVisible,
        toggleMenu,
        setMenuVisible,
      }}
    >
      <section
        className={classNames(s.overlay, { [s['overlay--visible']]: menuVisible })}
        onClick={hideMenu}
      />
      {children}
    </Context.Provider>
  );
};

FullPageWithOneMenu.Header = Header;
FullPageWithOneMenu.Menu = Menu;
FullPageWithOneMenu.Main = Main;

export default FullPageWithOneMenu;
