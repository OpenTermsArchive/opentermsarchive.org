import { GetContributeServiceResponse } from '../../interfaces';
import Layout from 'modules/Embassy/components/Layout';
import Loading from 'components/Loading';
import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
// var iframeDocument = document.getElementsByTagName("iframe")[0].contentDocument;
//
// var style = document.createElement('style');
// style.textContent = `
//   div:hover,article:hover {
//     border: 1px solid red;
//     opacity:0.8;
//   }
// `;
// iframeDocument.head.appendChild(style);

const TermPage = ({}: {}) => {
  const router = useRouter();
  const { url } = router.query;

  const { data } = useSWR<GetContributeServiceResponse>(`/api/contribute/services?url=${url}`, {
    initialData: {
      status: 'ko',
      message: '',
      url: '',
    },
  });

  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const onIframeLoad = () => {
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

    window.document.addEventListener(
      'myCustomEvent',
      (data: any) => {
        console.log(''); // eslint-disable-line
        console.log('╔════START══data══════════════════════════════════════════════════'); // eslint-disable-line
        console.log(data.detail?.cssPath); // eslint-disable-line
        console.log('╚════END════data══════════════════════════════════════════════════'); // eslint-disable-line
      },
      false
    );

    const style = document.createElement('style');
    style.textContent = `
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
    iframeDocument.body.appendChild(style);

    const script = document.createElement('script');
    script.textContent = `
    const highlight = document.getElementById('highlight');
    const body = document.body;
    let currentlyHighlightedItem = null;

    // window.onbeforeunload = function() {
    //   // Cancel the event as stated by the standard.
    //   event.preventDefault();
    //   // Chrome requires returnValue to be set.
    //   event.returnValue = '';
    //   return "";
    // }

    body.addEventListener('click', function (e) {
      var target = e.target;
      var cssPath = getCssPath(e.target);
      var event = new CustomEvent('myCustomEvent', {detail:{ cssPath }});
      window.parent.document.dispatchEvent(event);
    });

    function getCssPath(originalEl) {
      // Build a CSS path for the clicked element
      var el = originalEl;
      if (el instanceof Node) {
        // Build the list of elements along the path
        var elList = [];
        do {
          if (el instanceof Element) {

            var classString = el.classList ? [].slice.call(el.classList).join('.') : '';
            var elementName =
              (el.tagName ? el.tagName.toLowerCase() : '') +
              (classString ? '.' + classString : '') +
              (el.id ? '#' + el.id : '');
            if (elementName && el.tagName !=="HTML") elList.unshift(elementName);
          }
          el = el.parentNode;
        } while (el != null);
        // Get the stringified element object name
        var objString = originalEl.toString().match(/\[object (\w+)\]/);
        var elementType = objString ? objString[1] : originalEl.toString();
        console.log('elementType',elementType)
        var cssString = elList.join(' > ');
        // Return the CSS path as a string, prefixed with the element object name
        return cssString ? cssString : elementType;
      }
    }

    function highlightElement(element) {
      if (currentlyHighlightedItem == element) return;

      let rect = element.getBoundingClientRect();

      highlight.style.left = rect.x + 'px';
      highlight.style.top = rect.y + 'px';
      highlight.style.width = rect.width + 'px';
      highlight.style.height = rect.height + 'px';
      body.appendChild(highlight);

      currentlyHighlightedItem = element;
    }

    // on the body itself

    body.addEventListener(
      'mousemove',
      function (e) {
        let target = e.target;
        e.preventDefault();
        e.stopPropagation();

        // prevent navigating out
        e.target.onclick = () => {};
        if (e.target.href) {
          e.target.href = '#';
        }

        highlightElement(target);
      },
      true
    );

    body.addEventListener('mouseleave', function (e) {
      e.preventDefault();
      e.stopPropagation();
      highlight.remove();
      currentlyHighlightedItem = null;
    });

    `;
    iframeDocument.head.appendChild(script);
  };

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
      <iframe
        ref={iframeRef}
        src={data.url}
        width="100%"
        style={{ height: '10000px' }}
        onLoad={onIframeLoad}
      />
    </div>
  );
};

export default TermPage;
