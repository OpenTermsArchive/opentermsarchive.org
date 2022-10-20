import { FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';
import s from './LanguageSwitcher.module.css';
import { useRouter } from 'next/router';
import { useToggle } from 'react-use';

interface LanguageSwitcherProps {
  // TODO
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const router = useRouter();
  const [open, toggleExtended] = useToggle(false);

  return (
    <div
      className={classNames(s.languageSwitcher, {
        [s.languageSwitcher__isOpen]: open,
      })}
      {...props}
    >
      <button className={s.languageSwitcher_current} onClick={toggleExtended}>
        {router?.locale?.toUpperCase()}
        <FiChevronDown color="#999999" />
      </button>

      <div className={s.languageSwitcher_items}>
        {router.locales
          // https://github.com/vercel/next.js/discussions/18419
          // TO BE REMOVED alog with default when this feature request is done
          ?.filter((locale) => locale !== 'default' && locale !== router.locale)
          ?.map((locale) => (
            <React.Fragment key={locale}>
              <div className={s.languageSwitcher_item} onClick={toggleExtended}>
                {router.asPath.includes('#') ? (
                  <>
                    {/* A bug in nextjs prevents urls with # from refreshing the page */}
                    <a href={`/${locale}${router.asPath}`}>{locale.toUpperCase()}</a>
                  </>
                ) : (
                  <Link href={router.asPath} locale={locale} passHref={true}>
                    <a>{locale.toUpperCase()}</a>
                  </Link>
                )}
              </div>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
