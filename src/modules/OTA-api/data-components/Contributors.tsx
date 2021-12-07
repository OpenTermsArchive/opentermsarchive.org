import { Contributor } from 'modules/Github/api';
import Link from 'next/link';
import Loading from 'components/Loading';
import React from 'react';
import s from './Contributors.module.css';
import shuffle from 'lodash/fp/shuffle';
import useSWR from 'swr';

type ContributorsProps = {
  subtitle: string;
} & React.HTMLAttributes<HTMLDivElement>;

const outsideContributors = [
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
];

const Contributors: React.FC<ContributorsProps> = React.memo(({ subtitle }) => {
  const { data } = useSWR('/api/ota/contributors/all', {
    revalidateOnMount: true,
  });

  const loading = !data;

  if (loading) {
    return <Loading />;
  }

  const contributors = shuffle([...outsideContributors, ...data]);

  return (
    <div className={s.contributors}>
      <h4 className="text__center">{subtitle}</h4>
      <div className={s.contributors_items}>
        {contributors.map((contributor: Contributor) => {
          if (contributor.type !== 'Bot') {
            return (
              <div className={s.contributor}>
                <Link href={contributor.html_url}>
                  <a
                    target="_blank"
                    rel="nofollow"
                    className={s.contributor_link}
                    title={contributor.login}
                  >
                    <img
                      className={s.contributor_image}
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      width="64"
                      height="64"
                    />
                  </a>
                </Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
});

export default Contributors;
