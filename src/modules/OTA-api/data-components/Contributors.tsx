import React from 'react';
import classNames from 'classnames';
import staffData from '../../../../public/staff.json';
//@ts-ignore
import allContributorsData from '../../../../.all-contributorsrc';
import s from './Contributors.module.css';
import slugify from 'slugify';

type ContributorsProps = {
  subtitle?: string;
  type?: 'core' | 'alumnis' | 'contributors' | 'communityManagers' | 'all';
  alignX?: 'left' | 'center' | 'right';
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  showInfo?: boolean;
  marginTop?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const mapAllContributorsData = (
  allContributors: {
    name: string;
    profile: string;
    avatar_url: string;
  }[]
) => {
  const contributorsShemed: {
    [name: string]: {
      website: string;
      picture?: string;
    };
  } = {};
  Object.values(allContributors).map((contributor: any) => {
    contributorsShemed[contributor.name] = {
      website: contributor.profile,
    };
    if (contributor.avatar_url != '') {
      contributorsShemed[contributor.name].picture = contributor.avatar_url;
    }
  });
  return contributorsShemed;
};

const getContributorsByType = (type: ContributorsProps['type']) => {
  switch (type) {
    case 'core':
      return staffData.core;
    case 'alumnis':
      return staffData.alumnis;
    case 'communityManagers':
      return staffData.communityManagers;
    case 'contributors':
      return mapAllContributorsData(allContributorsData.contributors);
    case 'all':
    default:
      return staffData;
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
          {Object.entries(contributors).map(([name, value]) => {
            const website = typeof value === 'object' ? value.website : value;
            const imgSrc =
              typeof value === 'object' && value.picture != null
                ? value.picture
                : `/images/contributors/${slugify(name, { lower: true })}.jpg`;
            return (
              <div className={s.contributor} key={`${name}`}>
                <a
                  target="_blank"
                  rel="nofollow noopener"
                  className={s.contributor_link}
                  title={website}
                  key={`${name}_link`}
                  href={website}
                >
                  <img
                    className={s.contributor_image}
                    src={imgSrc}
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
