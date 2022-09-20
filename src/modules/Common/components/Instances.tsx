import Button from 'modules/Common/components/Button';
import Card from 'modules/Common/components/Card';
import CardList from 'modules/Common/components/CardList';
import CardTable from 'modules/Common/components/CardTable';
import CardTableItem from 'modules/Common/components/CardTableItem';
import { FiSearch as IconSearch } from 'react-icons/fi';
import Link from 'next/link';
import LinkIcon from 'modules/Common/components/LinkIcon';
import React from 'react';
import Image from 'next/image';
import instancesData from '../../../../public/instances.json';
import { kebabCase } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

type InstancesProps = {} & React.HTMLAttributes<HTMLDivElement>;

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

interface Instance {
  maintainers?: Array<Maintainer>;
  languages: Array<string>;
  jurisdictions: Array<string>;
  stats: Stats;
  subscribeURL?: string;
  industries?: Industries;
}

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
      {Object.entries(instancesData).map(([name, instance]) => {
        const { maintainers, languages, jurisdictions, stats, subscribeURL, industries }: Instance =
          instance;
        const instanceId = kebabCase(name);
        const author =
          maintainers == undefined ? (
            <Image
              src={`/images/contributors/volunteer-${router?.locale}.png`}
              width={120}
              height={96}
            />
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

        return (
          <Card
            key={`instance_${instanceId}`}
            title={name}
            subtitle={!!industries ? industries[router?.locale as keyof Industries] : ''}
            author={author}
            image={`/images/instances/${instanceId}.png`}
            center={true}
            big={true}
            authorCenter={true}
            white={true}
            hasAuthorIcon={false}
          >
            <CardTable>
              <CardTableItem
                title={t('instances:services')}
                iconName="FiFolder"
                desc={stats.services}
              />
              <CardTableItem
                title={t('instances:documents')}
                iconName="FiFile"
                desc={stats.documents}
              />
              <CardTableItem
                title={t('instances:language', { count: languages.length })}
                iconName="FiMessageCircle"
                desc={languages.map((languageCode) => languageName.of(languageCode)).join(', ')}
              />
              <CardTableItem
                title={t('instances:country', { count: jurisdictions.length })}
                iconName="FiMap"
                desc={jurisdictions.map((regionCode) => countryName.of(regionCode)).join(', ')}
              />
            </CardTable>
            <div className="mt__XL text__center">
              <Link href={`https://github.com/openTermsArchive/${instanceId}-versions`}>
                <a target="_blank" rel="noopener">
                  <Button type="secondary">
                    <IconSearch className="mr__2XS" />
                    {t('instances:cta.versions')}
                  </Button>
                </a>
              </Link>
            </div>
            <div className="mt__M text__center">
              <LinkIcon
                iconName="FiDownload"
                iconColor="var(--colorBlack400)"
                href={`https://github.com/openTermsArchive/${instanceId}-versions/releases`}
                target="_blank"
                rel="noopener"
              >
                {t('instances:cta.download-dataset')}
              </LinkIcon>
            </div>
            {subscribeURL && (
              <div className="mt__2XS text__center">
                <LinkIcon iconColor="var(--colorBlack400)" iconName="FiMail" href="/subscribe">
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
