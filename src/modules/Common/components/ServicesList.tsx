import Column from './Column';
import Container from 'modules/Common/containers/Container';
import { FiFileText as IconDocument } from 'react-icons/fi';
import { Link } from 'modules/I18n';
import React from 'react';
import { Services } from 'modules/OTA-api/api';
import s from './ServicesList.module.css';

type ServicesListProps = {
  title: string;
  subtitle: string;
  services: Services;
} & React.HTMLAttributes<HTMLDivElement>;

const ServicesList: React.FC<ServicesListProps> = ({
  children,
  className,
  title,
  subtitle,
  services,
  ...props
}) => {
  return (
    <Container gridCols="12" gridGutters="11" className={s.listServices} {...props}>
      <Column width={100} title={title} subtitle={subtitle}>
        <ul className={s.listServices_items}>
          {Object.keys(services || {}).map((serviceName: string) => {
            const documentTypes = (services || {})[serviceName];
            return (
              <li className={s.listServices_item} key={`service_list_${serviceName}`}>
                <div className={s.listServices_item_service}>{serviceName} :</div>
                <div className={s.listServices_item_docs}>
                  {documentTypes.map((documentType: string) => {
                    const target = `https://github.com/OpenTermsArchive/contrib-versions/blob/master/${serviceName}/${documentType}.md`;
                    return (
                      <div
                        className={s.listServices_item_doc}
                        key={`service_list_${serviceName}_${documentType}`}
                      >
                        <IconDocument color="#999999" size={14} />
                        <Link href={target}>
                          <a className="a__small" target="_blank" rel="noopener">
                            {documentType}
                          </a>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </Column>
    </Container>
  );
};

export default ServicesList;
