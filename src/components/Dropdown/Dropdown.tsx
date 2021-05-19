import React from 'react';
import classNames from 'classnames';
import s from './Dropdown.module.css';

export const DropdownContext = React.createContext({});

export type DropdownProps = {
  title: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Dropdown: React.FC<DropdownProps> = ({ children, className, title, ...props }) => {
  const [id] = React.useState(`dropdown_${Math.random()}`);
  const [visible, setVisible] = React.useState(false);

  return (
    <div className={classNames(s.dropdown, className)} {...props}>
      <input
        id={id}
        type="checkbox"
        onChange={(e) => {
          setVisible(e?.target?.checked);
        }}
        checked={visible}
      />
      <label htmlFor={id}>{title}</label>
      <ul>{children}</ul>
    </div>
  );
};

export type DropdownItemProps = {} & React.HTMLAttributes<HTMLLIElement>;

const DropdownItem: React.FC<DropdownItemProps> = ({ children, ...props }) => {
  return <li {...props}>{children}</li>;
};

export { Dropdown, DropdownItem };
