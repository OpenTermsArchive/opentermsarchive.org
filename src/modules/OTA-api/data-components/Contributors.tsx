import React from 'react';
import classNames from 'classnames';
import contributorsData from '../../../../public/contributors.json';
import s from './Contributors.module.css';
import slugify from 'slugify';

type ContributorsProps = {
  subtitle?: string;
  type?: 'core' | 'alumnis' | 'contributors' | 'communityManager' | 'all';
  alignX?: 'left' | 'center' | 'right';
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  showInfo?: boolean;
  marginTop?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const getContributorsByType = (type: ContributorsProps['type']) => {
  switch (type) {
    case 'core':
      return contributorsData.core;
    case 'alumnis':
      return contributorsData.alumnis;
    case 'contributors':
      return contributorsData.contributors;
    case 'communityManager':
      return contributorsData.communityManager;
    case 'all':
    default:
      return contributorsData;
  }
};

const Contributors: React.FC<ContributorsProps> = React.memo(
  ({
    subtitle,
    type = 'all',
    alignX = 'center',
    showInfo = false,
    thumbnailWidth = 64,
    thumbnailHeight = 64,
    marginTop = true,
    className,
    ...props
  }) => {
    const contributors = getContributorsByType(type);

    return (
      <div
        className={classNames(
          s.contributors,
          {
            [s.contributors__hasNoMarginTop]: marginTop === false,
          },
          s[`contributors__alignX${alignX}`],
          showInfo ? s.contributors__showInfos : null,
          className
        )}
        {...props}
      >
        {subtitle && <h4 className={classNames(s.contributors_subtitle)}>{subtitle}</h4>}
        <div className={s.contributors_items}>
          {Object.entries(contributors).map(([name, url]) => {
            return (
              <div className={s.contributor} key={`${name}`}>
                <a
                  target="_blank"
                  rel="nofollow noopener"
                  className={s.contributor_link}
                  title={url}
                  key={`${url}_link`}
                  href={url}
                >
                  <img
                    className={s.contributor_image}
                    src={`/images/contributors/${slugify(name, { lower: true })}.jpg`}
                    alt={name}
                    width={thumbnailWidth}
                    height={thumbnailHeight}
                  />
                  {showInfo && <div className={s.contributor_info}>{name}</div>}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default Contributors;
