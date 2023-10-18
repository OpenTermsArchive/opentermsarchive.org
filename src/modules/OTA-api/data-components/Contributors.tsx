import React from 'react';
import classNames from 'classnames';
import staffData from '../../../../public/staff.json';
//@ts-ignore
import allContributorsData from '../../../../.all-contributorsrc';
import s from './Contributors.module.css';

type ContributorsProps = {
  subtitle?: string;
  type?: 'core' | 'alumnis' | 'all' | 'communityManagers';
  alignX?: 'left' | 'center' | 'right';
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  showInfo?: boolean;
  marginTop?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

type StaffDataKey = keyof typeof staffData;

const getContributorsByType = (type: ContributorsProps['type'] = 'all') => {
  if (!Object.hasOwn(staffData, type)) {
    return allContributorsData.contributors;
  }
  return allContributorsData.contributors.filter((contributor: any) => {
    return staffData[type as StaffDataKey].includes(contributor.name);
  });
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
          {contributors.map((contributor: any) => {
            return (
              <div className={s.contributor} key={`${contributor.name}`}>
                <a
                  target="_blank"
                  rel="nofollow noopener"
                  className={s.contributor_link}
                  key={`${contributor.name}_link`}
                  href={contributor.profile}
                >
                  <img
                    className={s.contributor_image}
                    src={contributor.avatar_url}
                    alt={contributor.name}
                    width={thumbnailWidth}
                    height={thumbnailHeight}
                  />
                  {showInfo && <div className={s.contributor_info}>{contributor.name}</div>}
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
