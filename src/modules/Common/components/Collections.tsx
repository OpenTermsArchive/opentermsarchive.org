import Button from 'modules/Common/components/Button';
import Card from 'modules/Common/components/Card';
import CardList, { CardListProps } from 'modules/Common/components/CardList';
import CardTable from 'modules/Common/components/CardTable';
import CardTableItem from 'modules/Common/components/CardTableItem';
import { FiSearch as IconSearch } from 'react-icons/fi';
import { FiDownload as IconDownload } from 'react-icons/fi';
import { Link } from 'modules/I18n';
import LinkIcon from 'modules/Common/components/LinkIcon';
import React from 'react';
import collectionsData from '../../../../public/collections.json';
import slugify from 'slugify';
import { useRouter } from 'next/router';
import { useTranslation } from 'modules/I18n';

type CollectionsProps = {
  ids?: Array<string>;
  withPlaceholder?: Boolean;
  cardLink?: 'versions' | 'datasets';
} & CardListProps &
  React.HTMLAttributes<HTMLDivElement>;

interface Maintainer {
  name: string;
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

const Collections: React.FC<CollectionsProps> = ({
  ids,
  title,
  titleLevel,
  centerTitle = true,
  subtitle,
  subtitleLevel = 'h5',
  small,
  big,
  children,
  withPlaceholder,
  cardLink = 'versions',
  ...props
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  // See https://github.com/microsoft/TypeScript/issues/41338
  // @ts-ignore
  const languageName = new Intl.DisplayNames(router.locale, { type: 'language' });
  // @ts-ignore
  const countryName = new Intl.DisplayNames(router.locale, { type: 'region' });

  const collections = ids
    ? Object.entries(collectionsData).filter(
        // @ts-ignore
        ([name, collection]) => ids.indexOf(collection.id) > -1
      )
    : Object.entries(collectionsData);

  return (
    <CardList
      title={title}
      titleLevel={titleLevel}
      subtitle={subtitle}
      subtitleLevel={subtitleLevel}
      centerTitle={centerTitle}
      {...props}
    >
      {collections.map(([name, collection]) => {
        const {
          maintainers,
          languages,
          jurisdictions,
          stats,
          subscribeURL,
          industries,
        }: Collection = collection;
        const instanceSlug = slugify(name, { lower: true });
        const author =
          maintainers == undefined ? (
            <img src={`/images/contributors/volunteer-${router?.locale}.png`} alt="" />
          ) : (
            <>
              {maintainers.map((maintainer) => (
                <img
                  key={`maintainer_${slugify(maintainer.name)}`}
                  src={`/images/contributors/${slugify(maintainer.name, { lower: true })}.png`}
                  alt={maintainer.name}
                />
              ))}
            </>
          );

        const languagesList = languages
          .map((languageCode) => {
            if (languageCode === '*') {
              return t('collections:language.various');
            } else if (languageCode === '*eu') {
              return t('collections:language.europe');
            } else {
              return languageName.of(languageCode);
            }
          })
          .join(', ');

        return (
          <Card
            key={`collections_${instanceSlug}`}
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
              {cardLink == 'versions' && (
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
              )}
              {cardLink == 'datasets' && (
                <Link
                  href={`https://github.com/openTermsArchive/${collection.id}-versions/releases/latest`}
                  target="_blank"
                  rel="noopener"
                >
                  <Button type="secondary">
                    <IconDownload className="mr__2XS" />
                    {t('collections:cta.download-dataset')}
                  </Button>
                </Link>
              )}
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
      {withPlaceholder && (
        <Card
          isPlaceholder={true}
          className="card__placeholder text__center"
          subtitle={t('collections:new_collections.title')}
          link="mailto:contact@opentermsarchive.org"
          center={true}
        />
      )}
    </CardList>
  );
};

export default Collections;
