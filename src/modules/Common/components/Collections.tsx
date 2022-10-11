import Button from 'modules/Common/components/Button';
import Card from 'modules/Common/components/Card';
import CardList from 'modules/Common/components/CardList';
import CardTable from 'modules/Common/components/CardTable';
import CardTableItem from 'modules/Common/components/CardTableItem';
import { FiSearch as IconSearch } from 'react-icons/fi';
import { Link } from 'modules/I18n';
import LinkIcon from 'modules/Common/components/LinkIcon';
import React from 'react';
import collectionsData from '../../../../public/collections.json';
import { kebabCase } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'modules/I18n';

type CollectionsProps = {} & React.HTMLAttributes<HTMLDivElement>;

interface Maintainer {
  name: string;
  logo: string;
  url: string;
}

interface Stats {
  services: string;
  documents: string;
}

interface Industries {
  fr: string;
  en: string;
}

interface Collection {
  id: string;
  maintainers?: Array<Maintainer>;
  languages: Array<string>;
  jurisdictions: Array<string>;
  stats: Stats;
  subscribeURL?: string;
  industries?: Industries;
}

const Collections: React.FC<CollectionsProps> = ({ children, ...props }) => {
  const { t } = useTranslation();
  const router = useRouter();

  // See https://github.com/microsoft/TypeScript/issues/41338
  // @ts-ignore
  const languageName = new Intl.DisplayNames(router.locale, { type: 'language' });
  // @ts-ignore
  const countryName = new Intl.DisplayNames(router.locale, { type: 'region' });

  return (
    <CardList
      title={t('collections:title')}
      subtitle={t('collections:subtitle', { contactEmail: 'contact@opentermsarchive.org' })}
      subtitleLevel="h5"
      centerTitle={true}
      {...props}
    >
      {Object.entries(collectionsData).map(([name, collection]) => {
        const {
          maintainers,
          languages,
          jurisdictions,
          stats,
          subscribeURL,
          industries,
        }: Collection = collection;
        const author =
          maintainers == undefined ? (
            <img src={`/images/contributors/volunteer-${router?.locale}.png`} alt="" />
          ) : (
            <>
              {maintainers.map((maintainer) => (
                <img
                  key={`maintainer_${kebabCase(maintainer.name)}`}
                  src={maintainer.logo}
                  alt={maintainer.name}
                />
              ))}
            </>
          );

        const languagesList = languages
          .map((languageCode) => {
            if (languageCode === '*') {
              return t('instances:language.various');
            } else {
              return languageName.of(languageCode);
            }
          })
          .join(', ');

        return (
          <Card
            key={`collection_${collection.id}`}
            title={name}
            subtitle={!!industries ? industries[router?.locale as keyof Industries] : ''}
            author={author}
            image={`/images/collections/${collection.id}.png`}
            center={true}
            authorCenter={true}
            white={true}
            hasAuthorIcon={false}
          >
            <CardTable>
              <CardTableItem
                title={t('collections:services')}
                iconName="FiFolder"
                desc={stats.services}
              />
              <CardTableItem
                title={t('collections:documents')}
                iconName="FiFile"
                desc={stats.documents}
              />
              <CardTableItem
                title={t('collections:language', {
                  count: languages[0] === '*' ? 2 : languages.length,
                })}
                iconName="FiMessageCircle"
                desc={languagesList}
              />
              <CardTableItem
                title={t('collections:country', { count: jurisdictions.length })}
                iconName="FiMap"
                desc={jurisdictions.map((regionCode) => countryName.of(regionCode)).join(', ')}
              />
            </CardTable>
            <div className="mt__XL text__center">
              <Link
                href={`https://github.com/openTermsArchive/${collection.id}-versions`}
                target="_blank"
                rel="noopener"
              >
                <Button type="secondary">
                  <IconSearch className="mr__2XS" />
                  {t('collections:cta.versions')}
                </Button>
              </Link>
            </div>
            <div className="mt__M text__center">
              <LinkIcon
                iconName="FiDownload"
                iconColor="var(--colorBlack400)"
                href={`https://github.com/openTermsArchive/${collection.id}-versions/releases`}
                target="_blank"
                rel="noopener"
              >
                {t('collections:cta.download-dataset')}
              </LinkIcon>
            </div>
            {subscribeURL && (
              <div className="mt__2XS text__center">
                <LinkIcon iconColor="var(--colorBlack400)" iconName="FiMail" href="/subscribe">
                  {t('collections:cta.email')}
                </LinkIcon>
              </div>
            )}
          </Card>
        );
      })}
    </CardList>
  );
};

export default Collections;
