import Link from 'next/link';
import React from 'react';

interface CardProps {
  image?: string;
  imageAlt?: string;
  title: React.ReactNode;
  detail?: React.ReactNode;
  description?: React.ReactNode;
  href?: string;
  horizontal?: boolean;
  noArrow?: boolean;
  loading?: boolean;
}

const Card = ({
  loading,
  image,
  imageAlt,
  detail,
  title,
  href,
  description,
  className,
  horizontal,
  noArrow,
}: WithClassname<CardProps>) => {
  if (loading) {
    return (
      <div
        className={`rf-card ${className || ''} ${
          horizontal ? 'rf-card--horizontal' : ''
        } rf-card--no-arrow`}
      >
        <div className="rf-card__body">
          <p className="rf-card__detail"> </p>

          <h4 className="rf-card__title"> </h4>
          <p className="rf-card__desc"> </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rf-card ${className || ''} ${horizontal ? 'rf-card--horizontal' : ''} ${
        noArrow ? 'rf-card--no-arrow' : ''
      }`}
    >
      {image && (
        <div className="rf-card__img">
          <img src={image} alt={imageAlt} />
        </div>
      )}
      <div className="rf-card__body">
        {detail && <p className="rf-card__detail">{detail}</p>}

        <h4 className="rf-card__title">
          {href && !href.startsWith('http') && (
            <Link href={href}>
              <a className="rf-card__link">{title}</a>
            </Link>
          )}
          {href && href.startsWith('http') && (
            <a href={href} target="_blank" rel="noreferrer noopener" className="rf-card__link">
              {title}
            </a>
          )}
          {!href && title}
        </h4>
        {description && <p className="rf-card__desc">{description}</p>}
      </div>
    </div>
  );
};

export default Card;
