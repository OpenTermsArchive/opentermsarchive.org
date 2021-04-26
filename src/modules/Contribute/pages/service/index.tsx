import Drawer from 'components/Drawer';
// import { GetContributeServiceResponse } from '../../interfaces';
import { MdCancel as IconRemove } from 'react-icons/md';
import IframeSelector from 'components/IframeSelector';
import Layout from 'modules/Embassy/components/Layout';
import Link from 'next/link';
import Loading from 'components/Loading';
import React from 'react';
import s from './service.module.scss';
// import useSWR from 'swr';
import { useToggle } from 'react-use';
import useUrl from 'hooks/useUrl';

const TermPage = ({}: {}) => {
  const {
    queryParams: { url, step: initialStep, selectedCss: initialSelectedCss },
    pushQueryParam,
  } = useUrl();

  const [selectedCss, setSelectedCss] = React.useState<string[]>([]);
  const [selectable, toggleSelectable] = useToggle(false);
  const [step, setStep] = React.useState<number>(initialStep ? +initialStep : 1);

  const data = { url: 'http://localhost:3000/contribute' };
  // const { data } = useSWR<GetContributeServiceResponse>(`/api/contribute/services?url=${url}`, {
  //   initialData: {
  //     status: 'ko',
  //     message: '',
  //     url: '',
  //   },
  // });

  const passToStep = (newStep: number) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    pushQueryParam('step')(newStep);
    setStep(newStep);
  };

  const onSelect = React.useCallback(
    (cssPath: string) => {
      if (!selectedCss.includes(cssPath)) {
        pushQueryParam('selectedCss')([...selectedCss, cssPath]);
      }
      toggleSelectable(false);
    },
    [selectedCss, pushQueryParam, toggleSelectable]
  );

  const onRemove = (index: number) => () => {
    const newSelectedCss = [...selectedCss];
    delete newSelectedCss[index];
    pushQueryParam('selectedCss')(newSelectedCss);
  };

  React.useEffect(() => {
    const newSelectedCss = !initialSelectedCss
      ? []
      : Array.isArray(initialSelectedCss)
      ? initialSelectedCss
      : [initialSelectedCss];

    if (newSelectedCss.length === selectedCss.length) {
      return;
    }
    setSelectedCss(newSelectedCss);
  }, [initialSelectedCss, selectedCss]);

  if (!data?.url) {
    return (
      <Layout title="Contributing to Open Terms Archive">
        <div className="rf-container rf-mb-12w">
          <div className="rf-grid-row">
            <div className="rf-col">
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
              <p
                className="rf-text--lg text-center rf-mb-7w"
                style={{ maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}
              >
                We're loading the page
              </p>
              <Loading />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div>
      <Drawer className={s.wrapper}>
        {step === 1 && (
          <>
            <nav>
              <Link href="/contribute">
                <a className={s.backButton}>Go back</a>
              </Link>
            </nav>
            <div>
              <h1>What is expected of you</h1>
              <p>
                Most of the time, contractual documents contains a header, a footer, navigation
                menus, possibly ads… We aim at tracking only{' '}
                <strong>the significant parts of the document</strong>
              </p>
              <p>
                In order to achieve that, you will have to select the part of the documents that
                contains the relevant part and remove the insignificant parts.
              </p>
            </div>
            <nav>
              <button type="button" className="rf-btn" onClick={passToStep(2)}>
                OK
              </button>
            </nav>
          </>
        )}
        {step === 2 && (
          <>
            <nav>
              <a className={s.backButton} onClick={passToStep(1)}>
                Go back
              </a>
            </nav>
            <div>
              <h1>Step 2: selecting significant part of the document</h1>
              <form>
                {selectedCss.map((selected, i) => (
                  <div key={selected} className={s.selectionItem}>
                    <input defaultValue={selected} className="rf-input" />
                    <button
                      type="button"
                      className="rf-btn rf-fi-delete-fill"
                      onClick={onRemove(i)}
                    ></button>
                  </div>
                ))}
                <button
                  type="button"
                  className="rf-btn rf-btn--secondary"
                  onClick={toggleSelectable}
                  disabled={selectable}
                >
                  Add
                </button>
              </form>
            </div>
            <nav>
              <a onClick={passToStep(1)}>Need help?</a>
              <button type="button" className="rf-btn">
                Validate
              </button>
            </nav>
          </>
        )}
      </Drawer>
      <IframeSelector
        selectable={selectable}
        url={data.url}
        selected={selectedCss}
        onSelect={onSelect}
      />
    </div>
  );
};

export default TermPage;
