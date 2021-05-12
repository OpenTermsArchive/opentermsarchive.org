import classNames from 'classnames';
import React from 'react';
import s from './Article.module.css';

type ArticleProps = {
  className?: string;
  subtitle?: string;
  title: string;
  titleLevel?: 'h1' | 'h2';
} & React.HTMLAttributes<HTMLDivElement>;

const Article: React.FC<ArticleProps> = ({
  children,
  className,
  subtitle,
  title,
  titleLevel = 'h2',
  ...props
}: ArticleProps) => {
  let renderTitle;
  if (titleLevel === 'h1') {
    renderTitle = <h1 className={s.article_title}>{title}</h1>;
  } else {
    renderTitle = <h2 className={s.article_title}>{title}</h2>;
  }

  return (
    <article {...props} className={classNames(s.article, className)}>
      <header className={s.article_header}>
        <div className={classNames('text__smallcaps', s.article_subtitle)}>{subtitle}</div>
        {renderTitle}
      </header>
      <div className={s.article_content}>{children}</div>
    </article>
  );
};

export default Article;
