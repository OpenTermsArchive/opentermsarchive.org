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

const CUSTOM_STYLE_TAG_ID = 'ota-custom-style';
const STYLE_TAG_ID = 'ota-style';

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
    if (!iframeDocument) {
      return;
    }

    // @ts-ignore
    iframeDocument.querySelector(`#${CUSTOM_STYLE_TAG_ID}`).innerHTML = `
      ${selected.length ? `${selected.join(',')} {background: #169b62EE;}` : ''}
      ${removed.length ? `${removed.join(',')} {background: #e10600EE;}` : ''}
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
    window.document.addEventListener('myCustomEvent', onSelectInIframe, false);
    return () => {
      window.document.removeEventListener('myCustomEvent', onSelectInIframe);
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
    highlight.id = 'highlight';
    iframeDocument.body.appendChild(highlight);

    // Add a custom style we will populate after
    const customStyle = document.createElement('style');
    customStyle.id = CUSTOM_STYLE_TAG_ID;
    customStyle.textContent = ``;
    iframeDocument.body.appendChild(customStyle);

    // Add special style for highlighting part of the document
    const pickEnabledCss = `
      #highlight {
        position: absolute;
        background-color: blue;
        opacity: 0.4;
        text-align: center;
        border: 1px solid red;
        box-sizing: border-box;
        pointer-events: none;
      }
    `;
    const pickDisabledCss = `
    * {
      cursor: not-allowed;
      pointer-events: none;
    }
    `;

    const style = document.createElement('style');
    style.id = STYLE_TAG_ID;
    style.textContent = selectable ? pickEnabledCss : pickDisabledCss;
    iframeDocument.body.appendChild(style);

    const script = document.createElement('script');
    script.textContent = `
    const highlight = document.getElementById('highlight');
    const body = document.body;
    let currentlyHighlightedItem = null;
    let pickerEnabled = false;

    // window.onbeforeunload = function() {
    //   // Cancel the event as stated by the standard.
    //   event.preventDefault();
    //   // Chrome requires returnValue to be set.
    //   event.returnValue = '';
    //   return "";
    // }

    function enablePicker() {
      pickerEnabled = true;
      document.querySelector("#${STYLE_TAG_ID}").innerHTML = \`
      ${pickEnabledCss}
      \`;
      body.addEventListener('click', onClick);
      body.addEventListener('mousemove', onMouseMove, true);
      body.addEventListener('mouseleave', onMouseLeave);
    }

    function disablePicker() {
      pickerEnabled = false;
      document.querySelector("#${STYLE_TAG_ID}").innerHTML = \`
      ${pickDisabledCss}
      \`;
      highlight.remove();
      currentlyHighlightedItem = null;
      body.removeEventListener('click', onClick);
      body.removeEventListener('mousemove', onMouseMove);
      body.removeEventListener('mouseleave', onMouseLeave);
    }

    function getCssPath(originalEl) {
      // Build a CSS path for the clicked element
      var el = originalEl;
      if (el instanceof Node) {
        // Build the list of elements along the path
        var elList = [];
        do {
          if (el instanceof Element) {
            var classString = el.classList ? [].slice.call(el.classList).join('.') : '';
            var elementName = el.id ? '#' + el.id :
              (el.tagName ? el.tagName.toLowerCase() : '') +
              (classString ? '.' + classString : '');
            if (elementName && el.tagName !=="HTML") elList.unshift(elementName);
          }
          el = el.parentNode;
        } while (el != null);
        // Get the stringified element object name
        var objString = originalEl.toString().match(/\[object (\w+)\]/);
        var elementType = objString ? objString[1] : originalEl.toString();
        var cssString = elList.join(' > ');

        // Return the CSS path as a string, prefixed with the element object name
        return cssString ? cssString : elementType;
      }
    }

    function highlightElement(element) {
      if (currentlyHighlightedItem === element) return;

      let rect = element.getBoundingClientRect();

      highlight.style.left = rect.x + 'px';
      highlight.style.top = rect.y + 'px';
      highlight.style.width = rect.width + 'px';
      highlight.style.height = rect.height + 'px';
      body.appendChild(highlight);

      currentlyHighlightedItem = element;
    }

    function onMouseMove(e) {
      let target = e.target;
      e.preventDefault();
      e.stopPropagation();

      // prevent navigating out
      e.target.onclick = () => {};
      if (e.target.href) {
        e.target.href = '#';
      }

      highlightElement(target);
    }

    function onMouseLeave(e) {
      e.preventDefault();
      e.stopPropagation();
      highlight.remove();
      currentlyHighlightedItem = null;
    }

    function onClick(e) {
      var target = e.target;
      var cssPath = getCssPath(e.target);
      var event = new CustomEvent('myCustomEvent', { detail: { cssPath } });
      window.parent.document.dispatchEvent(event);
      disablePicker();
    }

    window.onmessage = function(e) {
      if (e.data) {
        enablePicker();
      } else {
        disablePicker();
      }
    };


    `;
    iframeDocument.head.appendChild(script);

    hightlightSelected();
    toggleInitDone(true);
    onReady();
  }, [iframeLoaded]);

  return (
    <div>
      <iframe
        ref={iframeRef}
        src={url}
        width="100%"
        style={{ height: '10000px', opacity: initDone ? 1 : 0.4 }}
        onLoad={toggleIframeLoaded}
      />
    </div>
  );
};

export default IframeSelector;
