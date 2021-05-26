import React from 'react';
import classNames from 'classnames';
import s from './TextContent.module.css';

type TextContentProps = { className?: string } & React.HTMLAttributes<HTMLDivElement>;

const TextContent: React.FC<TextContentProps> = ({ children, className, ...props }) => {
  return (
    <div className={classNames(s.textContent, className)} {...props}>
      {children}
    </div>
  );
};

export default TextContent;
