import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';
import s from './Contributors.module.css';
import shuffle from 'lodash/fp/shuffle';

type ContributorsProps = {
  subtitle?: string;
  type?: 'core' | 'alumnis' | 'contributors' | 'all';
  alignX?: 'left' | 'center' | 'right';
  className?: string;
  showInfo?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const contributorsList = [
  {
    html_url: 'https://twitter.com/Elsa_Trujillo_',
    avatar_url: 'https://avatars.githubusercontent.com/u/86837188?v=4',
    login: 'Elsa Trujillo',
    type: 'core',
  },
  {
    html_url: 'https://twitter.com/marineguillaum',
    avatar_url:
      'https://pbs.twimg.com/profile_images/815851313758085121/oNANphLi_reasonably_small.jpg',
    login: 'Marine Guillaume',
    type: 'contributors',
  },
  {
    html_url: 'https://twitter.com/lvdefranssu',
    avatar_url:
      'https://pbs.twimg.com/profile_images/1435510938979942405/GZUnqvtH_reasonably_small.jpg',
    login: 'Louis-Victor de Franssu',
    type: 'contributors',
  },
  {
    html_url: 'https://twitter.com/henriverdier',
    avatar_url:
      'https://pbs.twimg.com/profile_images/1359173368436686848/1GNqcMOf_reasonably_small.jpg',
    login: 'Henri Verdier',
    type: 'contributors',
  },
  {
    html_url: 'https://twitter.com/hureaux',
    avatar_url:
      'https://pbs.twimg.com/profile_images/1784831840/politique-twitter_reasonably_small.jpg',
    login: 'Jeremy Hureaux',
    type: 'contributors',
  },
  {
    login: 'Nicolas Dupont',
    type: 'core',
    avatar_url: 'https://avatars.githubusercontent.com/u/1098708?v=4',
    html_url: 'https://github.com/Ndpnt',
  },
  {
    login: 'Martin Ratinaud',
    type: 'core',
    avatar_url: 'https://avatars.githubusercontent.com/u/4191809?v=4',
    html_url: 'https://github.com/martinratinaud',
  },
  {
    login: 'Clément Biron',
    type: 'core',
    avatar_url: 'https://avatars.githubusercontent.com/u/364319?v=4',
    html_url: 'https://github.com/clementbiron',
  },
  {
    login: 'Matti Schneider',
    type: 'core',
    avatar_url: 'https://avatars.githubusercontent.com/u/222463?v=4',
    html_url: 'https://github.com/MattiSG',
  },
  {
    login: 'Adrien Fines',
    type: 'contributors',
    avatar_url: 'https://avatars.githubusercontent.com/u/41912392?v=4',
    html_url: 'https://github.com/AdrienFines',
  },
  {
    login: 'Lucas Verney',
    type: 'contributors',
    avtar_url: 'https://avatars.githubusercontent.com/u/58298410?v=4',
    html_url: 'https://github.com/LVerneyPEReN',
  },
  {
    login: 'Vincent Viers',
    type: 'contributors',
    avatar_url: 'https://avatars.githubusercontent.com/u/30295971?v=4',
    html_url: 'https://github.com/vviers',
  },
  {
    login: 'Tom Houriez',
    type: 'contributors',
    avatar_url: 'https://avatars.githubusercontent.com/u/70654947?v=4',
    html_url: 'https://github.com/THouriezPEReN',
  },
  {
    login: 'Aaronj Sugarman',
    type: 'contributors',
    avatar_url: 'https://avatars.githubusercontent.com/u/82889095?v=4',
    html_url: 'https://github.com/AaronjSugarman',
  },
  {
    login: 'GatienH',
    type: 'contributors',
    avatar_url: 'https://avatars.githubusercontent.com/u/6501059?v=4',
    html_url: 'https://github.com/GatienH',
  },
  {
    login: 'Michiel de Jong',
    type: 'contributors',
    avatar_url: 'https://avatars.githubusercontent.com/u/408412?v=4',
    html_url: 'https://github.com/michielbdejong',
  },
  {
    login: 'Siegrid Henry',
    type: 'alumnis',
    avatar_url: 'https://avatars.githubusercontent.com/u/49791551?v=4',
    html_url: 'https://github.com/SiegridHenry',
  },
  {
    login: 'Chirsitan Quest',
    type: 'contributors',
    avatar_url: 'https://avatars.githubusercontent.com/u/1202668?v=4',
    html_url: 'https://github.com/cquest',
  },
  {
    login: 'Marius Karnauskas',
    type: 'contributors',
    avatar_url: 'https://avatars.githubusercontent.com/u/1094012?v=4',
    html_url: 'https://github.com/karnauskas',
  },
  {
    login: 'TOSDR',
    type: 'contributors',
    avatar_url: 'https://avatars.githubusercontent.com/u/3402969?s=200&v=4',
    html_url: 'https://github.com/tosdr',
  },
  {
    login: 'Antoine Vernois',
    type: 'contributors',
    avatar_url: 'https://avatars.githubusercontent.com/u/765477?v=4',
    html_url: 'https://github.com/avernois',
  },
];

const getContributorsByType = (type: ContributorsProps['type']) => {
  return contributorsList.filter(({ type: contributorType }) => {
    return contributorType === type;
  });
};

const Contributors: React.FC<ContributorsProps> = React.memo(
  ({ subtitle, type = 'all', alignX = 'center', showInfo = false, className, ...props }) => {
    const contributors = type !== 'all' ? getContributorsByType(type) : contributorsList;
    shuffle(contributors);

    return (
      <div
        className={classNames(
          s.contributors,
          s[`contributors__alignX${alignX}`],
          showInfo ? s.contributors__showInfos : null,
          className
        )}
        {...props}
      >
        {subtitle && <h4 className={classNames(s.contributors_subtitle)}>{subtitle}</h4>}
        <div className={s.contributors_items}>
          {contributors.map(({ login, avatar_url, html_url }) => {
            return (
              <div className={s.contributor} key={`${login}${Date.now()}`}>
                <Link href={html_url}>
                  <a target="_blank" rel="nofollow" className={s.contributor_link} title={login}>
                    <img
                      className={s.contributor_image}
                      src={avatar_url}
                      alt={login}
                      width={64}
                      height={64}
                    />
                    {showInfo && <div className={s.contributor_info}>{login}</div>}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default Contributors;
