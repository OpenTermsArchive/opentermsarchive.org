const CUSTOM_STYLE_TAG_ID = 'ota-custom-style'; // same as in /src/components/iframeSelector/index.tsx
const STYLE_TAG_ID = 'ota-style'; // same as in /src/components/iframeSelector/index.tsx
const STYLE_HIGHLIGHT_ID = 'ota-highlight'; // same as in /src/components/iframeSelector/index.tsx
const EVENT_NAME = 'ota-event'; // same as in /src/components/iframeSelector/index.tsx

const highlight = document.getElementById(STYLE_HIGHLIGHT_ID);
const body = document.body;
let currentlyHighlightedItem = null;
let pickerEnabled = false;

// Add special style for highlighting part of the document
const pickEnabledCss = `
  #${STYLE_HIGHLIGHT_ID} {
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

// window.onbeforeunload = function() {
//   // Cancel the event as stated by the standard.
//   event.preventDefault();
//   // Chrome requires returnValue to be set.
//   event.returnValue = '';
//   return "";
// }

function enablePicker() {
  pickerEnabled = true;
  document.querySelector(`#${STYLE_TAG_ID}`).innerHTML = pickEnabledCss;
  body.addEventListener('click', onClick);
  body.addEventListener('mousemove', onMouseMove, true);
  body.addEventListener('mouseleave', onMouseLeave);
}

function disablePicker() {
  pickerEnabled = false;
  document.querySelector(`#${STYLE_TAG_ID}`).innerHTML = pickDisabledCss;
  highlight.remove();
  currentlyHighlightedItem = null;
  body.removeEventListener('click', onClick);
  body.removeEventListener('mousemove', onMouseMove);
  body.removeEventListener('mouseleave', onMouseLeave);
}

function highlightElement(element) {
  if (currentlyHighlightedItem === element) return;

  let rect = element.getBoundingClientRect();
  const offset = window.pageYOffset || document.documentElement.scrollTop;

  highlight.style.left = rect.x + 'px';
  highlight.style.top = offset + rect.y + 'px';
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
  var cssPath = finder(e.target);
  var event = new CustomEvent(EVENT_NAME, { detail: { cssPath } });
  window.parent.document.dispatchEvent(event);
  disablePicker();
}

window.onmessage = function (e) {
  if (e.data) {
    enablePicker();
  } else {
    disablePicker();
  }
};
