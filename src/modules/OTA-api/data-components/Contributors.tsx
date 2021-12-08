import Link from 'next/link';
import React from 'react';
import s from './Contributors.module.css';
import shuffle from 'lodash/fp/shuffle';

type ContributorsProps = {
  subtitle?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const contributorsList = [
  {
    html_url: 'https://twitter.com/Elsa_Trujillo_',
    avatar_url: 'https://avatars.githubusercontent.com/u/86837188?v=4',
    login: 'Elsa Trujillo',
  },
  {
    html_url: 'https://twitter.com/marineguillaum',
    avatar_url:
      'https://pbs.twimg.com/profile_images/815851313758085121/oNANphLi_reasonably_small.jpg',
    login: 'Marine Guillaume',
  },
  {
    html_url: 'https://twitter.com/lvdefranssu',
    avatar_url:
      'https://pbs.twimg.com/profile_images/1435510938979942405/GZUnqvtH_reasonably_small.jpg',
    login: 'Louis-Victor de Franssu',
  },
  {
    html_url: 'https://twitter.com/henriverdier',
    avatar_url:
      'https://pbs.twimg.com/profile_images/1359173368436686848/1GNqcMOf_reasonably_small.jpg',
    login: 'Henri Verdier',
  },
  {
    html_url: 'https://twitter.com/hureaux',
    avatar_url:
      'https://pbs.twimg.com/profile_images/1784831840/politique-twitter_reasonably_small.jpg',
    login: 'Jeremy Hureaux',
  },
  {
    login: 'Ndpnt',
    avatar_url: 'https://avatars.githubusercontent.com/u/1098708?v=4',
    html_url: 'https://github.com/Ndpnt',
  },
  {
    login: 'martinratinaud',
    avatar_url: 'https://avatars.githubusercontent.com/u/4191809?v=4',
    html_url: 'https://github.com/martinratinaud',
  },
  {
    login: 'clementbiron',
    avatar_url: 'https://avatars.githubusercontent.com/u/364319?v=4',
    html_url: 'https://github.com/clementbiron',
  },
  {
    login: 'MattiSG',
    avatar_url: 'https://avatars.githubusercontent.com/u/222463?v=4',
    html_url: 'https://github.com/MattiSG',
  },
  {
    login: 'AdrienFines',
    avatar_url: 'https://avatars.githubusercontent.com/u/41912392?v=4',
    html_url: 'https://github.com/AdrienFines',
  },
  {
    login: 'LVerneyPEReN',
    avtar_url: 'https://avatars.githubusercontent.com/u/58298410?v=4',
    html_url: 'https://github.com/LVerneyPEReN',
  },
  {
    login: 'vviers',
    avatar_url: 'https://avatars.githubusercontent.com/u/30295971?v=4',
    html_url: 'https://github.com/vviers',
  },
  {
    login: 'THouriezPEReN',
    avatar_url: 'https://avatars.githubusercontent.com/u/70654947?v=4',
    html_url: 'https://github.com/THouriezPEReN',
  },
  {
    login: 'AaronjSugarman',
    avatar_url: 'https://avatars.githubusercontent.com/u/82889095?v=4',
    html_url: 'https://github.com/AaronjSugarman',
  },
  {
    login: 'GatienH',
    avatar_url: 'https://avatars.githubusercontent.com/u/6501059?v=4',
    html_url: 'https://github.com/GatienH',
  },
  {
    login: 'michielbdejong',
    avatar_url: 'https://avatars.githubusercontent.com/u/408412?v=4',
    html_url: 'https://github.com/michielbdejong',
  },
  {
    login: 'SiegridHenry',
    avatar_url: 'https://avatars.githubusercontent.com/u/49791551?v=4',
    html_url: 'https://github.com/SiegridHenry',
  },
  {
    login: 'cquest',
    avatar_url: 'https://avatars.githubusercontent.com/u/1202668?v=4',
    html_url: 'https://github.com/cquest',
  },
  {
    login: 'karnauskas',
    avatar_url: 'https://avatars.githubusercontent.com/u/1094012?v=4',
    html_url: 'https://github.com/karnauskas',
  },
];

const Contributors: React.FC<ContributorsProps> = React.memo(({ subtitle }) => {
  const contributors = shuffle(contributorsList);

  return (
    <div className={s.contributors}>
      {subtitle && <h4 className="text__center">{subtitle}</h4>}
      <div className={s.contributors_items}>
        {contributors.map(({ login, avatar_url, html_url }) => {
          return (
            <div className={s.contributor}>
              <Link href={html_url}>
                <a target="_blank" rel="nofollow" className={s.contributor_link} title={login}>
                  <img
                    className={s.contributor_image}
                    src={avatar_url}
                    alt={login}
                    width={64}
                    height={64}
                  />
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Contributors;
