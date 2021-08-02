import React from 'react';
import { useToggle } from 'react-use';
// import fs from 'fs';

interface IframeSelectorProps {
  url: string;
  selected?: string[];
  removed?: string[];
  selectable: boolean;
  onSelect: (cssPath: string) => any;
  onReady: () => any;
}

// const injectedScript = fs.readFileSync('./_iframeInjectedScript');

const BASE_URL = `${typeof window !== 'undefined' ? window.location.origin : ''}${
  process.env.NEXT_PUBLIC_BASE_PATH || ''
}`;
const CSS_PATH_FINDER_URL = `${BASE_URL}/iframe-selector/css-path-finder.js`;
const INJECTED_SCRIPT_URL = `${BASE_URL}/iframe-selector/injected-script.js`;
const CUSTOM_STYLE_TAG_ID = 'ota-custom-style'; // same as in /public/iframe-selector/injected-script.js
const STYLE_TAG_ID = 'ota-style'; // same as in /public/iframe-selector/injected-script.js
const STYLE_HIGHLIGHT_ID = 'ota-highlight'; // same as in /public/iframe-selector/injected-script.js
const EVENT_NAME = 'ota-event'; // same as in /public/iframe-selector/injected-script.js

const IframeSelector = ({
  url,
  selectable,
  selected = [],
  removed = [],
  onSelect,
  onReady,
}: IframeSelectorProps) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, toggleIframeLoaded] = useToggle(false);
  const [initDone, toggleInitDone] = useToggle(false);

  const onSelectInIframe = React.useCallback(
    (data: any) => {
      const cssPath = data.detail?.cssPath;
      onSelect(cssPath);
    },
    [onSelect]
  );

  const hightlightSelected = React.useCallback(() => {
    const iframeDocument = iframeRef?.current?.contentDocument;
    if (!iframeDocument || !iframeDocument.querySelector(`#${CUSTOM_STYLE_TAG_ID}`)) {
      return;
    }

    const selectedCssSelectors = selected.filter((m) => !!m).join(',');
    const selectedChildrenCssSelectors = selected.map((s) => `${s} *`).join(',');
    const removedCssSelectors = removed.filter((m) => !!m).join(',');
    const removedChildrenCssSelectors = removed.map((s) => `${s} *`).join(',');

    // @ts-ignore
    iframeDocument.querySelector(`#${CUSTOM_STYLE_TAG_ID}`).innerHTML = `
      ${
        selectedCssSelectors
          ? `
          ${selectedCssSelectors} { background: #8acfb1!important; box-shadow: 0 0 0 2px #169b62!important; }
          ${selectedChildrenCssSelectors} { background: #8acfb1!important; }
          `
          : ''
      }
      ${
        removedCssSelectors
          ? `
          ${removedCssSelectors} { background: #e39694!important; box-shadow: 0 0 0 2px #e10600!important; }
          ${removedChildrenCssSelectors} { background: #e39694!important; }`
          : ''
      }
    `;
  }, [selected, removed]);

  React.useEffect(() => {
    if (!initDone) {
      return;
    }
    const iframeWindow = iframeRef?.current?.contentWindow;
    if (iframeWindow && selectable) {
      iframeWindow.postMessage(selectable, '*');
    }
  }, [selectable, initDone]);

  React.useEffect(() => {
    if (!initDone) {
      return;
    }

    hightlightSelected();
  }, [initDone, selected, removed]);

  React.useEffect(() => {
    if (!initDone) {
      return;
    }
    window.document.addEventListener(EVENT_NAME, onSelectInIframe, false);
    return () => {
      window.document.removeEventListener(EVENT_NAME, onSelectInIframe);
    };
  }, [onSelect, initDone]);

  React.useEffect(() => {
    if (!iframeLoaded) {
      return;
    }
    if (!iframeRef.current) {
      return;
    }
    const iframeDocument = iframeRef.current.contentDocument;
    if (!iframeDocument) {
      return;
    }

    const highlight = document.createElement('div');
    highlight.id = STYLE_HIGHLIGHT_ID;
    iframeDocument.body.appendChild(highlight);

    // Add a custom style we will populate after
    const customStyle = document.createElement('style');
    customStyle.id = CUSTOM_STYLE_TAG_ID;
    iframeDocument.body.appendChild(customStyle);

    const style = document.createElement('style');
    style.id = STYLE_TAG_ID;
    iframeDocument.body.appendChild(style);

    const finderScript = document.createElement('script');
    finderScript.src = CSS_PATH_FINDER_URL;
    iframeDocument.body.appendChild(finderScript);

    const script = document.createElement('script');
    script.src = INJECTED_SCRIPT_URL;
    iframeDocument.body.appendChild(script);

    hightlightSelected();
    toggleInitDone(true);
    onReady();
  }, [iframeLoaded]);

  return (
    <div>
      <iframe
        loading="lazy"
        ref={iframeRef}
        src={url}
        width="100%"
        style={{ height: '100vh', opacity: initDone ? 1 : 0.4 }}
        onLoad={toggleIframeLoaded}
      />
    </div>
  );
};

export default IframeSelector;
