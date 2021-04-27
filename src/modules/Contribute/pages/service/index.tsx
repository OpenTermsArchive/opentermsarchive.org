import Drawer from 'components/Drawer';
import { GetContributeServiceResponse } from '../../interfaces';
import IframeSelector from 'components/IframeSelector';
import Link from 'next/link';
import Loading from 'components/Loading';
import React from 'react';
import s from './service.module.scss';
import useSWR from 'swr';
import { useToggle } from 'react-use';
import useUrl from 'hooks/useUrl';

const ServicePage = ({}: {}) => {
  const {
    queryParams: {
      url,
      step: initialStep,
      selectedCss: initialSelectedCss,
      removedCss: initialRemovedCss,
    },
    pushQueryParam,
  } = useUrl();

  const [selectedCss, setSelectedCss] = React.useState<string[]>([]);
  const [removedCss, setRemovedCss] = React.useState<string[]>([]);
  const [selectable, toggleSelectable] = React.useState('');
  const [iframeReady, toggleIframeReady] = useToggle(false);
  const [step, setStep] = React.useState<number>(initialStep ? +initialStep : 1);

  // const data = { url: 'http://localhost:3000/contribute' };
  const { data } = useSWR<GetContributeServiceResponse>(`/api/contribute/services?url=${url}`, {
    initialData: {
      status: 'ko',
      message: '',
      url: '',
    },
  });

  const passToStep = (newStep: number) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    pushQueryParam('step')(newStep);
    setStep(newStep);
  };

  const selectInIframe = (queryparam: 'selectedCss' | 'removedCss') => () => {
    toggleSelectable(queryparam);
  };

  const onSelect = React.useCallback(
    (cssPath: string) => {
      const cssRules = selectable === 'selectedCss' ? selectedCss : removedCss;

      if (!cssRules.includes(cssPath)) {
        pushQueryParam(selectable)([...cssRules, cssPath]);
      }
      toggleSelectable('');
    },
    [removedCss, selectedCss, pushQueryParam, selectable, toggleSelectable]
  );

  const onRemoveSelected = (index: number) => () => {
    const newSelectedCss = [...selectedCss];
    delete newSelectedCss[index];
    pushQueryParam('selectedCss')(newSelectedCss);
  };

  const onRemoveRemoved = (index: number) => () => {
    const newRemovedCss = [...removedCss];
    delete newRemovedCss[index];
    pushQueryParam('removedCss')(newRemovedCss);
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

  React.useEffect(() => {
    const newRemovedCss = !initialRemovedCss
      ? []
      : Array.isArray(initialRemovedCss)
      ? initialRemovedCss
      : [initialRemovedCss];

    if (newRemovedCss.length === removedCss.length) {
      return;
    }
    setRemovedCss(newRemovedCss);
  }, [initialRemovedCss, removedCss]);

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
              <h2>What is expected of you</h2>
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
              <h2>Step 2: selecting significant part of the document</h2>
              <form>
                <div>
                  <h3>Significant part(s)</h3>
                  {selectedCss.map((selected, i) => (
                    <div key={selected} className={s.selectionItem}>
                      <input defaultValue={selected} className="rf-input" />
                      <button
                        type="button"
                        className="rf-btn rf-fi-delete-fill"
                        onClick={onRemoveSelected(i)}
                      ></button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="rf-btn rf-btn--secondary"
                    onClick={selectInIframe('selectedCss')}
                    disabled={!!selectable || !iframeReady}
                  >
                    Add part
                  </button>
                </div>
                <div>
                  <h3>Insignificant part(s)</h3>
                  {removedCss.map((selected, i) => (
                    <div key={selected} className={s.selectionItem}>
                      <input defaultValue={selected} className="rf-input" />
                      <button
                        type="button"
                        className="rf-btn rf-fi-delete-fill"
                        onClick={onRemoveRemoved(i)}
                      ></button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="rf-btn rf-btn--secondary"
                    onClick={selectInIframe('removedCss')}
                    disabled={!!selectable || !iframeReady}
                  >
                    Remove part
                  </button>
                </div>
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
      {data?.url ? (
        <IframeSelector
          selectable={!!selectable}
          url={data.url}
          selected={selectedCss}
          removed={removedCss}
          onSelect={onSelect}
          onReady={toggleIframeReady}
        />
      ) : (
        <div className={s.fullPage}>
          <h1>We're preparing the website</h1>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ServicePage;
