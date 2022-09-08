import React from 'react';
import Link from 'next/link';
import Button from 'modules/Common/components/Button';
import CardTable from 'modules/Common/components/CardTable';
import CardTableItem from 'modules/Common/components/CardTableItem';
import CardList from 'modules/Common/components/CardList';
import LinkIcon from 'modules/Common/components/LinkIcon';
import instancesData from '../../../../public/instances.json';
import { kebabCase } from 'lodash';
import Card from 'modules/Common/components/Card';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

type InstancesProps = {} & React.HTMLAttributes<HTMLDivElement>;

const Instances: React.FC<InstancesProps> = ({ children, ...props }) => {
  const { t } = useTranslation();
  const router = useRouter();

  // See https://github.com/microsoft/TypeScript/issues/41338
  // @ts-ignore
  const languageName = new Intl.DisplayNames(router.locale, { type: 'language' });
  // @ts-ignore
  const countryName = new Intl.DisplayNames(router.locale, { type: 'region' });

  return (
    <CardList title={t('instances:title')} centerTitle={true} big={true} {...props}>
      {instancesData.instances.map((instance) => {
        const slug = kebabCase(instance.name);
        const author =
          instance.maintainers.length == 0 ? (
            <img src={`/images/contributors/volunteer-${router?.locale}.png`} />
          ) : (
            <>
              {instance.maintainers.map((maintainer) => (
                <img
                  key={`maintainer_${kebabCase(maintainer.name)}`}
                  src={maintainer.logo}
                  alt={maintainer.name}
                />
              ))}
            </>
          );
        return (
          <Card
            key={`instance_${slug}`}
            title={instance.name}
            subtitle={t(`instances:${slug}.desc`)}
            author={author}
            image={instance.image}
            center={true}
            big={true}
            authorCenter={true}
            white={true}
            authorIcon={false}
          >
            <CardTable>
              <CardTableItem
                title={t('instances:services')}
                iconName="FiGlobe"
                desc={instance.stats.services}
              />
              <CardTableItem
                title={t('instances:documents')}
                iconName="FiFile"
                desc={instance.stats.documents}
              />
              <CardTableItem
                title={t('instances:language', { count: instance.languages.length })}
                iconName="FiFlag"
                desc={instance.languages
                  .map((languageCode) => languageName.of(languageCode))
                  .join(', ')}
              />
              <CardTableItem
                title={t('instances:country', { count: instance.countries.length })}
                iconName="FiBox"
                desc={instance.countries.map((regionCode) => countryName.of(regionCode)).join(', ')}
              />
            </CardTable>
            <div className="mt__XL text__center">
              <Link href={`https://github.com/openTermsArchive/${slug}-versions`}>
                <a target="_blank" rel="noopener">
                  <Button>{t('instances:cta.versions')}</Button>
                </a>
              </Link>
            </div>
            <div className="mt__M text__center">
              <LinkIcon
                iconColor="var(--colorBlack400)"
                href={`https://github.com/openTermsArchive/${slug}-versions/releases`}
                target="_blank"
                rel="noopener"
              >
                {t('instances:cta.download-dataset')}
              </LinkIcon>
            </div>
            {instance.subscribeURL && (
              <div className="text__center">
                <LinkIcon iconColor="var(--colorBlack400)" href="/subscribe">
                  {t('instances:cta.email')}
                </LinkIcon>
              </div>
            )}
          </Card>
        );
      })}
    </CardList>
  );
};

export default Instances;
