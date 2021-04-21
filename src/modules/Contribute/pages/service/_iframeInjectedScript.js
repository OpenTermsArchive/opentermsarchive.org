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
  var event = new CustomEvent('myCustomEvent', { detail: { cssPath } });
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
        if (elementName && el.tagName !== 'HTML') elList.unshift(elementName);
      }
      el = el.parentNode;
    } while (el != null);
    // Get the stringified element object name
    var objString = originalEl.toString().match(/\[object (\w+)\]/);
    var elementType = objString ? objString[1] : originalEl.toString();
    console.log('elementType', elementType);
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
