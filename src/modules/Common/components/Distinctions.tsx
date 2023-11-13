import React from 'react';
import classNames from 'classnames';
import s from './Distinctions.module.css';
import distinctionsData from '../../../../public/distinctions.json';
import slugify from 'slugify';
import { useRouter } from 'next/router';

type DistinctionsProps = React.HTMLAttributes<HTMLDivElement>;

const Distinctions: React.FC<DistinctionsProps> = ({ children, className, ...props }) => {
  const router = useRouter();
  router.locale = typeof router.locale === 'undefined' ? 'en' : router.locale;

  return (
    <div className={classNames(s.distinctions, className)} {...props}>
      {Object.entries(distinctionsData).map(([name, data]) => {
        return (
          <a href={data.link} target="_blank" rel="noopener" className={s.discintion}>
            <div className={s.discintion_img}>
              <img src={`/images/distinctions/${slugify(name, { lower: true })}.png`} alt="" />
            </div>
            <div className={s.discintion_desc}>
              {
                // @ts-ignore
                data.description[router.locale]
              }
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default Distinctions;
