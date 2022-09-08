import React from 'react';
import Link from 'next/link';
import Button from 'modules/Common/components/Button';
import CardTable from 'modules/Common/components/CardTable';
import CardTableItem from 'modules/Common/components/CardTableItem';
import CardList from 'modules/Common/components/CardList';
import LinkIcon from 'modules/Common/components/LinkIcon';
import instancesData from '../../../../public/instances.json';
import { kebabCase } from 'lodash';
import { uniqueId } from 'lodash';
import Card from 'modules/Common/components/Card';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

type InstancesProps = {} & React.HTMLAttributes<HTMLDivElement>;

const Instances: React.FC<InstancesProps> = ({ children, ...props }) => {
  const { t } = useTranslation();
  const router = useRouter();

  // @ts-ignore
  // See https://github.com/microsoft/TypeScript/issues/41338
  const languageName = new Intl.DisplayNames(router.locale, { type: 'language' });
  // @ts-ignore
  const countryName = new Intl.DisplayNames(router.locale, { type: 'region' });

  return (
    <CardList title={t('instances:title')} centerTitle={true} big={true} {...props}>
      {instancesData.instances.map((instance: any) => {
        const slug = kebabCase(instance.name);
        return (
          <Card
            key={uniqueId('instance_')}
            title={instance.name}
            subtitle={t(`instances:${slug}.desc`)}
            author={
              instance.maintainers.length == 0 ? (
                <img src={`/images/contributors/volunteer-${router?.locale}.png`}></img>
              ) : (
                instance.maintainers.map((maintener: any) => {
                  return (
                    <img key={uniqueId('maintener_')} src={maintener.logo} alt={maintener.name} />
                  );
                })
              )
            }
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
              ></CardTableItem>
              <CardTableItem
                title={t('instances:documents')}
                iconName="FiFile"
                desc={instance.stats.documents}
              ></CardTableItem>
              <CardTableItem
                title={t('instances:language', { count: instance.languages.length })}
                iconName="FiFlag"
                desc={instance.languages
                  .map((languageCode) => languageName.of(languageCode))
                  .join(', ')}
              ></CardTableItem>
              <CardTableItem
                title={t('instances:country', { count: instance.countries.length })}
                iconName="FiBox"
                desc={instance.countries.map((regionCode) => countryName.of(regionCode)).join(', ')}
              ></CardTableItem>
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
