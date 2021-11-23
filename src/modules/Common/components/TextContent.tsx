import React from 'react';
import classNames from 'classnames';
import s from './TextContent.module.css';

type TextContentProps = {
  className?: string;
  marginTopLarge?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const TextContent: React.FC<TextContentProps> = ({
  marginTopLarge = false,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(
        s.textContent,
        { [s.textContent__marginTopLarge]: !!marginTopLarge },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default TextContent;
