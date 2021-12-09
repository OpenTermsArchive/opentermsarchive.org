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
  return (
    <article {...props} className={classNames(s.article, className)}>
      <header className={s.article_header}>
        {title && titleLevel === 'h1' ? <h1 className={s.article_title}>{title}</h1> : undefined}
        {title && titleLevel === 'h2' ? <h2 className={s.article_title}>{title}</h2> : undefined}
        {title && titleLevel === 'h3' ? <h3 className={s.article_title}>{title}</h3> : undefined}
        {subtitle ? (
          <h4 className={classNames(s.article_subtitle, 'h4__light')}>{subtitle}</h4>
        ) : undefined}
      </header>
      <div className={s.article_content}>{children}</div>
    </article>
  );
};

export default Article;
