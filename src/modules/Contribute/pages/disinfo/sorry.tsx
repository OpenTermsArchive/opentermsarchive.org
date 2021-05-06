import Breadcrumb from 'components/BreadCrumb';
import Layout from 'modules/Embassy/components/Layout';
import React from 'react';
import s from './thanks.module.scss';
const EMAIL_SUPPORT = 'contribute@disinfo.beta.gouv.fr';

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
                { name: 'Sorry' },
              ]}
            />
            <h2>We need you on a real computer</h2>
            <p>
              Because we use the "hover" functionnality to highlight the parts of the document we
              want to track, we need you to have a computer and a mouse.
            </p>
            <br />
            <p>
              Contact us for any question <a href={`mailto:${EMAIL_SUPPORT}`}>{EMAIL_SUPPORT}</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThanksPage;
