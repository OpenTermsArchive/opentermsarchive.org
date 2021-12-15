import { FiChevronDown, FiExternalLink, FiTrash2 } from 'react-icons/fi';
import { GetContributeServiceResponse, PostContributeServiceResponse } from '../interfaces';

import Button from 'modules/Common/components/Button';
import Drawer from 'components/Drawer';
import IframeSelector from 'components/IframeSelector';
import LinkIcon from 'modules/Common/components/LinkIcon';
import Loading from 'components/Loading';
import React from 'react';
import { Trans } from 'react-i18next';
import api from 'utils/api';
import classNames from 'classnames';
import s from './service.module.css';
import { useEvent } from 'react-use';
import useNotifier from 'hooks/useNotifier';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useToggle } from 'react-use';
import { useTranslation } from 'next-i18next';
import useUrl from 'hooks/useUrl';

const EMAIL_SUPPORT = 'contribute@opentermsarchive.org';

const ServicePage = ({ documentTypes }: { documentTypes: string[] }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { notify } = useNotifier();
  useEvent('touchstart', () => {
    router.push('/contribute/sorry');
  });
  const {
    queryParams: {
      url,
      step: initialStep,
      selectedCss: initialSelectedCss,
      removedCss: initialRemovedCss,
      documentType: initialDocumentType,
      name: initialName,
      expertMode,
    },
    pushQueryParam,
  } = useUrl();

  const json = {
    name: initialName || '???',
    documents: {
      [initialDocumentType || '???']: {
        fetch: url,
        select: initialSelectedCss,
        remove: initialRemovedCss,
      },
    },
  };

  const [isPdf, toggleIsPdf] = useToggle(/\.pdf$/gi.test(url));

  const [selectable, toggleSelectable] = React.useState('');
  const [iframeReady, toggleIframeReady] = useToggle(false);
  const [loading, toggleLoading] = useToggle(false);
  const [step, setStep] = React.useState<number>(initialStep ? +initialStep : 1);

  const selectedCss = !initialSelectedCss
    ? []
    : Array.isArray(initialSelectedCss)
    ? initialSelectedCss
    : [initialSelectedCss];

  const removedCss = !initialRemovedCss
    ? []
    : Array.isArray(initialRemovedCss)
    ? initialRemovedCss
    : [initialRemovedCss];

  // const data = { url: 'http://localhost:3000/contribute' };
  const { data } = useSWR<GetContributeServiceResponse>(
    isPdf ? null : `/api/contribute/services?url=${encodeURIComponent(url)}`,
    {
      initialData: {
        status: 'ko',
        message: '',
        url: '',
        error: '',
      },
      revalidateOnMount: true,
    }
  );

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

  const onChangeCssRule = (queryparam: 'selectedCss' | 'removedCss', index: number) => (e: any) => {
    const value = e.target?.value;
    if (!value) {
      onRemoveCssRule(queryparam, index)();
      return;
    }
    const cssRules = queryparam === 'selectedCss' ? selectedCss : removedCss;
    const newCss = [...cssRules];
    newCss[index] = value;
    pushQueryParam(queryparam)(newCss);
  };

  const onRemoveCssRule = (queryparam: 'selectedCss' | 'removedCss', index: number) => () => {
    const cssRules = queryparam === 'selectedCss' ? selectedCss : removedCss;
    const newCss = [...cssRules];
    delete newCss[index];
    pushQueryParam(queryparam)(newCss);
  };

  const onInputChange = (fieldName: string) => (event: any) => {
    pushQueryParam(fieldName)(event.target.value);
  };

  const toggleExpertMode = () => {
    pushQueryParam('expertMode')(!!expertMode ? '' : 'true');
  };

  const onValidate = async () => {
    toggleLoading(true);
    try {
      const {
        data: { url },
      } = await api.post<PostContributeServiceResponse>('/api/contribute/services', {
        json,
        name: initialName,
        documentType: initialDocumentType,
        url: `${window.location.href}&expertMode=true`,
      });

      if (!url) {
        notify('error', t('contribute/service:could_not_create_issue'));
        const subject = 'Here is a new service to track in Open Terms Archive';
        const body = `Hi,

  I need you to track "${initialDocumentType}" of "${initialName}" for me.

  Here is the url ${window.location.href}&expertMode=true

  Thank you very much`;

        window.open(
          `mailto:${EMAIL_SUPPORT}?subject=${subject}&body=${encodeURIComponent(body)}`,
          '_blank'
        );
        router.push(`/contribute/thanks?email`);
        return;
      }
      router.push(`/contribute/thanks?url=${encodeURIComponent(url)}`);
    } catch (e) {
      notify('error', e.toString());
      toggleLoading(false);
    }
  };

  const onErrorClick = () => {
    const subject = 'I tried to add this service but it did not work';
    const body = `Hi,

I need you to track "${initialDocumentType}" of "${initialName}" for me but I add a failure with.

-----
${data?.error}
-----

Here is the url ${window.location.href}&expertMode=true

Thank you very much`;

    window.open(
      `mailto:${EMAIL_SUPPORT}?subject=${subject}&body=${encodeURIComponent(body)}`,
      '_blank'
    );

    router.push('/contribute/thanks');
  };

  const saveOnLocal = async () => {
    await api.post('/api/contribute/services', {
      path: process.env.NEXT_PUBLIC_OTA_SERVICES_PATH,
      data: JSON.stringify(json),
    });
  };

  const submitDisabled = !initialSelectedCss || !iframeReady || loading;

  React.useEffect(() => {
    if (!!data?.isPdf) {
      toggleIsPdf(true);
    }
  }, [data?.isPdf]);

  return (
    <div className={s.wrapper}>
      <Drawer className={s.drawer}>
        {step === 1 && (
          <>
            <nav>
              <LinkIcon
                className={s.backButton}
                iconColor="var(--colorBlack400)"
                href="/contribute"
                direction="left"
                small={true}
              >
                {t('contribute/service:back')}
              </LinkIcon>
            </nav>
            <div>
              <h2>{t('contribute/service:title')}</h2>
              <p>
                <Trans i18nKey="contribute/service:description1">
                  Most of the time, contractual documents contains a header, a footer, navigation
                  menus, possibly ads… We aim at tracking only{' '}
                  <strong>the significant parts of the document</strong>
                </Trans>
              </p>
              <p>
                <Trans i18nKey="contribute/service:description2">
                  In order to achieve that, you will have to select the part of the documents that
                  contains the relevant part and remove the insignificant parts.
                </Trans>
              </p>
            </div>
            <nav>
              <Button onClick={passToStep(2)}>{t('contribute/service:cta')}</Button>
            </nav>
          </>
        )}
        {step === 2 && (
          <>
            <nav>
              <LinkIcon
                className={s.backButton}
                iconColor="var(--colorBlack400)"
                href="/contribute"
                direction="left"
                small={true}
              >
                {t('contribute/service:back')}
              </LinkIcon>
              <a className="a__small" onClick={passToStep(1)}>
                {t('contribute/service:help')}
              </a>
            </nav>
            <div>
              <form>
                <div>
                  <h3>{t('contribute/service:step2.title')}</h3>
                  <div className={classNames('formfield')}>
                    <label>{t('contribute/service:step2.form.documentType')}</label>
                    <div className={classNames('select')}>
                      <select
                        onChange={onInputChange('documentType')}
                        defaultValue={initialDocumentType}
                      >
                        <option value="">{t('contribute/service:step2.form.select')}</option>
                        {documentTypes.map((documentType) => (
                          <option key={documentType} value={documentType}>
                            {documentType}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown color="333333"></FiChevronDown>
                    </div>
                  </div>

                  <div className={classNames('formfield')}>
                    <label>{t('contribute/service:step2.form.serviceName')}</label>
                    <input defaultValue={initialName} onChange={onInputChange('name')} />
                  </div>
                  {!isPdf && (
                    <>
                      <h3>{t('contribute/service:step3.title')}</h3>

                      <div className={classNames('formfield')}>
                        <label>{t('contribute/service:step3.form.significantPart')}</label>
                        {selectedCss.map((selected, i) => (
                          <div key={selected} className={s.selectionItem}>
                            <input
                              defaultValue={selected}
                              onChange={onChangeCssRule('selectedCss', i)}
                            />

                            <Button
                              onClick={onRemoveCssRule('selectedCss', i)}
                              type="secondary"
                              onlyIcon={true}
                            >
                              <FiTrash2></FiTrash2>
                            </Button>
                          </div>
                        ))}
                        <Button
                          onClick={selectInIframe('selectedCss')}
                          disabled={!!selectable || !iframeReady}
                          type="secondary"
                        >
                          {t('contribute/service:step3.form.significantPart.cta')}
                        </Button>
                      </div>

                      <div className={classNames('formfield')}>
                        <label>{t('contribute/service:step3.form.insignificantPart')}</label>
                        {removedCss.map((selected, i) => (
                          <div key={selected} className={s.selectionItem}>
                            <input
                              defaultValue={selected}
                              onChange={onChangeCssRule('removedCss', i)}
                            />

                            <Button
                              onClick={onRemoveCssRule('removedCss', i)}
                              type="secondary"
                              onlyIcon={true}
                            >
                              <FiTrash2></FiTrash2>
                            </Button>
                          </div>
                        ))}
                        <Button
                          onClick={selectInIframe('removedCss')}
                          disabled={!!selectable || !iframeReady}
                          type="secondary"
                        >
                          {t('contribute/service:step3.form.insignificantPart.cta')}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                {expertMode && (
                  <>
                    <pre className={classNames(s.json)}>{JSON.stringify(json, null, 2)}</pre>
                    <div className={classNames(s.expertButtons)}>
                      {process.env.NEXT_PUBLIC_OTA_SERVICES_PATH && (
                        <Button
                          onClick={saveOnLocal}
                          size="sm"
                          type="secondary"
                          title={`Save on ${process.env.NEXT_PUBLIC_OTA_SERVICES_PATH}`}
                        >
                          {t('contribute/service:expertMode.button.label')}
                        </Button>
                      )}
                      <a href={url} target="_blank" rel="noopener" title={url}>
                        <FiExternalLink />
                      </a>
                    </div>
                  </>
                )}
              </form>
            </div>
            <nav>
              <a className="a__small" onClick={toggleExpertMode}>
                {t('contribute/service:expertMode')}
              </a>
              <Button disabled={submitDisabled} onClick={onValidate}>
                {loading ? '...' : t('contribute/service:submit')}
              </Button>
            </nav>
          </>
        )}
      </Drawer>
      {data?.error && (
        <div className={s.fullPage}>
          <h1>{t('contribute/service:error.title')}</h1>
          <p>{data?.error}</p>
          <Button onClick={onErrorClick}>{t('contribute/service:error.cta')}</Button>
        </div>
      )}
      {!data?.error && (
        <>
          {data?.url || isPdf ? (
            isPdf ? (
              <iframe src={url} width="100%" style={{ height: '100vh' }} />
            ) : (
              <IframeSelector
                selectable={!!selectable}
                url={isPdf ? url : data?.url}
                selected={selectedCss}
                removed={removedCss}
                onSelect={onSelect}
                onReady={toggleIframeReady}
              />
            )
          ) : (
            <div className={s.fullPage}>
              <h1>{t('contribute/service:loading.title')}</h1>
              <p>{t('contribute/service:loading.subtitle')}</p>
              <Loading />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ServicePage;
