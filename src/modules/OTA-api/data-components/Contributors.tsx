import { Contributor } from 'modules/Github/api';
import Link from 'next/link';
import Loading from 'components/Loading';
import React from 'react';
import s from './Contributors.module.css';
import useSWR from 'swr';

type ContributorsProps = {
  subtitle: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Contributors: React.FC<ContributorsProps> = React.memo(({ subtitle }) => {
  const { data } = useSWR('/api/ota/contributors', {
    revalidateOnMount: true,
  });

  const loading = !data;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={s.contributors}>
      <div className="text__smallcaps text__center">{subtitle}</div>
      <div className={s.contributors_items}>
        {data.map((contributor: Contributor) => {
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
