import Breadcrumb from 'components/BreadCrumb';
import Layout from 'modules/Embassy/components/Layout';
import Link from 'next/link';
import React from 'react';
import s from './thanks.module.scss';

const ThanksPage = () => {
  return (
    <Layout title="Contributing to Open Terms Archive">
      <div className="rf-container rf-mb-12w">
        <div className="rf-grid-row">
          <div className={`rf-col ${s.wrapper}`}>
            <h1 className="text-center rf-mb-1w">
              Contributing to Open Terms Archive
              <sup>
                <span
                  style={{
                    background: 'var(--rm500)',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  className="rf-tag rf-tag--sm"
                >
                  BETA
                </span>
              </sup>
            </h1>
            <Breadcrumb
              className={s.breadcrumb}
              items={[
                { name: 'Open Terms Archive', url: 'https://www.opentermsarchive.org' },
                { name: 'Add a document', url: '/open-terms-archive/contribute' },
                { name: 'Thanks' },
              ]}
            />
            <h2>Thanks for your contribution</h2>
            <p>
              You only need to send us the email (a popup should have opened) and we will let you
              know as soon as the service is integrated in the system
            </p>

            <Link href="/open-terms-archive/contribute">
              <a className="rf-btn">Add another document</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThanksPage;
