import React from 'react';
import classNames from 'classnames';
import s from './Article.module.css';

type ArticleProps = {
  className?: string;
  subtitle?: string;
  title?: string;
  titleLevel?: 'h1' | 'h2' | 'h3';
} & React.HTMLAttributes<HTMLDivElement>;

const Article: React.FC<ArticleProps> = ({
  children,
  className,
  subtitle,
  title,
  titleLevel = 'h2',
  ...props
}: ArticleProps) => {
  const TitleComponent = titleLevel;

  return (
    <article {...props} className={classNames(s.article, className)}>
      <header className={s.article_header}>
        {title && <TitleComponent className={s.article_title}>{title}</TitleComponent>}
        {subtitle && <h4 className={classNames(s.article_subtitle, 'h4__light')}>{subtitle}</h4>}
      </header>
      <div className={s.article_content}>{children}</div>
    </article>
  );
};

export default Article;
