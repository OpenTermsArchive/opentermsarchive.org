import React from 'react';
import classNames from 'classnames';
import s from './Article.module.css';

type ArticleProps = {
  className?: string;
  subtitle?: string;
  title: string;
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
        {subtitle ? (
          <div className={classNames('text__smallcaps', s.article_subtitle)}>{subtitle}</div>
        ) : undefined}
        {titleLevel === 'h1' ? <h1 className={s.article_title}>{title}</h1> : undefined}
        {titleLevel === 'h2' ? <h2 className={s.article_title}>{title}</h2> : undefined}
        {titleLevel === 'h3' ? <h3 className={s.article_title}>{title}</h3> : undefined}
      </header>
      <div className={s.article_content}>{children}</div>
    </article>
  );
};

export default Article;
