import Link from 'next/link';
import React from 'react';
import s from './LanguageSwitcher.module.css';
import { useRouter } from 'next/router';

interface LanguageSwitcherProps {
  // TODO
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const router = useRouter();

  return (
    <div className={s.wrapper} {...props}>
      {router.locales
        // https://github.com/vercel/next.js/discussions/18419
        // TO BE REMOVED alog with catchAll when this feature request is done
        ?.filter((locale) => locale !== 'catchAll')
        ?.map((locale) => (
          <React.Fragment key={locale}>
            {locale === router.locale ? (
              locale
            ) : (
              <Link href={router.pathname} locale={locale}>
                {locale}
              </Link>
            )}{' '}
          </React.Fragment>
        ))}
      {children}
    </div>
  );
};

export default LanguageSwitcher;
