(() => {
  // node_modules/lucide/dist/esm/createElement.js
  var createElement = (tag, attrs, children = []) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs).forEach((name) => {
      element.setAttribute(name, String(attrs[name]));
    });
    if (children.length) {
      children.forEach((child) => {
        const childElement = createElement(...child);
        element.appendChild(childElement);
      });
    }
    return element;
  };
  var createElement$1 = ([tag, attrs, children]) => createElement(tag, attrs, children);

  // node_modules/lucide/dist/esm/replaceElement.js
  var getAttrs = (element) => Array.from(element.attributes).reduce((attrs, attr) => {
    attrs[attr.name] = attr.value;
    return attrs;
  }, {});
  var getClassNames = (attrs) => {
    if (typeof attrs === "string")
      return attrs;
    if (!attrs || !attrs.class)
      return "";
    if (attrs.class && typeof attrs.class === "string") {
      return attrs.class.split(" ");
    }
    if (attrs.class && Array.isArray(attrs.class)) {
      return attrs.class;
    }
    return "";
  };
  var combineClassNames = (arrayOfClassnames) => {
    const classNameArray = arrayOfClassnames.flatMap(getClassNames);
    return classNameArray.map((classItem) => classItem.trim()).filter(Boolean).filter((value, index, self) => self.indexOf(value) === index).join(" ");
  };
  var toPascalCase = (string) => string.replace(/(\w)(\w*)(_|-|\s*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
  var replaceElement = (element, { nameAttr, icons, attrs }) => {
    const iconName = element.getAttribute(nameAttr);
    if (iconName == null)
      return;
    const ComponentName = toPascalCase(iconName);
    const iconNode = icons[ComponentName];
    if (!iconNode) {
      return console.warn(
        `${element.outerHTML} icon name was not found in the provided icons object.`
      );
    }
    const elementAttrs = getAttrs(element);
    const [tag, iconAttributes, children] = iconNode;
    const iconAttrs = {
      ...iconAttributes,
      "data-lucide": iconName,
      ...attrs,
      ...elementAttrs
    };
    const classNames = combineClassNames(["lucide", `lucide-${iconName}`, elementAttrs, attrs]);
    if (classNames) {
      Object.assign(iconAttrs, {
        class: classNames
      });
    }
    const svgElement = createElement$1([tag, iconAttrs, children]);
    return element.parentNode?.replaceChild(svgElement, element);
  };

  // node_modules/lucide/dist/esm/defaultAttributes.js
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };

  // node_modules/lucide/dist/esm/icons/activity.js
  var Activity = [
    "svg",
    defaultAttributes,
    [["path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" }]]
  ];

  // node_modules/lucide/dist/esm/icons/arrow-right.js
  var ArrowRight = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M5 12h14" }],
      ["path", { d: "m12 5 7 7-7 7" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/calendar.js
  var Calendar = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M8 2v4" }],
      ["path", { d: "M16 2v4" }],
      ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
      ["path", { d: "M3 10h18" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/chevron-down.js
  var ChevronDown = ["svg", defaultAttributes, [["path", { d: "m6 9 6 6 6-6" }]]];

  // node_modules/lucide/dist/esm/icons/chevron-left.js
  var ChevronLeft = ["svg", defaultAttributes, [["path", { d: "m15 18-6-6 6-6" }]]];

  // node_modules/lucide/dist/esm/icons/chevron-right.js
  var ChevronRight = ["svg", defaultAttributes, [["path", { d: "m9 18 6-6-6-6" }]]];

  // node_modules/lucide/dist/esm/icons/clock.js
  var Clock = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["polyline", { points: "12 6 12 12 16 14" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/download.js
  var Download = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
      ["polyline", { points: "7 10 12 15 17 10" }],
      ["line", { x1: "12", x2: "12", y1: "15", y2: "3" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/eye.js
  var Eye = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }],
      ["circle", { cx: "12", cy: "12", r: "3" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/file-plus.js
  var FilePlus = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
      ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
      ["path", { d: "M9 15h6" }],
      ["path", { d: "M12 18v-6" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/file-warning.js
  var FileWarning = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
      ["path", { d: "M12 9v4" }],
      ["path", { d: "M12 17h.01" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/file.js
  var File = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
      ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/flag.js
  var Flag = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" }],
      ["line", { x1: "4", x2: "4", y1: "22", y2: "15" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/folder.js
  var Folder = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
        }
      ]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/gavel.js
  var Gavel = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" }],
      ["path", { d: "m16 16 6-6" }],
      ["path", { d: "m8 8 6-6" }],
      ["path", { d: "m9 7 8 8" }],
      ["path", { d: "m21 11-8-8" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/globe.js
  var Globe = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }],
      ["path", { d: "M2 12h20" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/hand-heart.js
  var HandHeart = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" }],
      [
        "path",
        {
          d: "m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"
        }
      ],
      ["path", { d: "m2 15 6 6" }],
      [
        "path",
        {
          d: "M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z"
        }
      ]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/hash.js
  var Hash = [
    "svg",
    defaultAttributes,
    [
      ["line", { x1: "4", x2: "20", y1: "9", y2: "9" }],
      ["line", { x1: "4", x2: "20", y1: "15", y2: "15" }],
      ["line", { x1: "10", x2: "8", y1: "3", y2: "21" }],
      ["line", { x1: "16", x2: "14", y1: "3", y2: "21" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/image.js
  var Image = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["circle", { cx: "9", cy: "9", r: "2" }],
      ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/layers.js
  var Layers = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
        }
      ],
      ["path", { d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" }],
      ["path", { d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/mail.js
  var Mail = [
    "svg",
    defaultAttributes,
    [
      ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
      ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/map-pin.js
  var MapPin = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }],
      ["circle", { cx: "12", cy: "10", r: "3" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/map.js
  var Map = [
    "svg",
    defaultAttributes,
    [
      ["polygon", { points: "3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" }],
      ["line", { x1: "9", x2: "9", y1: "3", y2: "18" }],
      ["line", { x1: "15", x2: "15", y1: "6", y2: "21" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/megaphone.js
  var Megaphone = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "m3 11 18-5v12L3 14v-3z" }],
      ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/message-circle.js
  var MessageCircle = [
    "svg",
    defaultAttributes,
    [["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" }]]
  ];

  // node_modules/lucide/dist/esm/icons/newspaper.js
  var Newspaper = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"
        }
      ],
      ["path", { d: "M18 14h-8" }],
      ["path", { d: "M15 18h-5" }],
      ["path", { d: "M10 6h8v4h-8V6Z" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/power-off.js
  var PowerOff = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18.36 6.64A9 9 0 0 1 20.77 15" }],
      ["path", { d: "M6.16 6.16a9 9 0 1 0 12.68 12.68" }],
      ["path", { d: "M12 2v4" }],
      ["path", { d: "m2 2 20 20" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/power.js
  var Power = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 2v10" }],
      ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/search.js
  var Search = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "11", cy: "11", r: "8" }],
      ["path", { d: "m21 21-4.3-4.3" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/shield-half.js
  var ShieldHalf = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        }
      ],
      ["path", { d: "M12 22V2" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/shopping-cart.js
  var ShoppingCart = [
    "svg",
    defaultAttributes,
    [
      ["circle", { cx: "8", cy: "21", r: "1" }],
      ["circle", { cx: "19", cy: "21", r: "1" }],
      [
        "path",
        { d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" }
      ]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/sparkles.js
  var Sparkles = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
        }
      ],
      ["path", { d: "M5 3v4" }],
      ["path", { d: "M19 17v4" }],
      ["path", { d: "M3 5h4" }],
      ["path", { d: "M17 19h4" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/square-pen.js
  var SquarePen = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }],
      ["path", { d: "M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/user.js
  var User = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }],
      ["circle", { cx: "12", cy: "7", r: "4" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/users.js
  var Users = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
      ["circle", { cx: "9", cy: "7", r: "4" }],
      ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }],
      ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/wrench.js
  var Wrench = [
    "svg",
    defaultAttributes,
    [
      [
        "path",
        {
          d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        }
      ]
    ]
  ];

  // node_modules/lucide/dist/esm/icons/x.js
  var X = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M18 6 6 18" }],
      ["path", { d: "m6 6 12 12" }]
    ]
  ];

  // node_modules/lucide/dist/esm/lucide.js
  var createIcons = ({ icons = {}, nameAttr = "data-lucide", attrs = {} } = {}) => {
    if (!Object.values(icons).length) {
      throw new Error(
        "Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`"
      );
    }
    if (typeof document === "undefined") {
      throw new Error("`createIcons()` only works in a browser environment.");
    }
    const elementsToReplace = document.querySelectorAll(`[${nameAttr}]`);
    Array.from(elementsToReplace).forEach(
      (element) => replaceElement(element, { nameAttr, icons, attrs })
    );
    if (nameAttr === "data-lucide") {
      const deprecatedElements = document.querySelectorAll("[icon-name]");
      if (deprecatedElements.length > 0) {
        console.warn(
          "[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"
        );
        Array.from(deprecatedElements).forEach(
          (element) => replaceElement(element, { nameAttr: "icon-name", icons, attrs })
        );
      }
    }
  };

  // <stdin>
  createIcons({
    icons: {
      X,
      ChevronDown,
      ChevronRight,
      ChevronLeft,
      Hash,
      Mail,
      Folder,
      File,
      MessageCircle,
      Search,
      Download,
      Wrench,
      Users,
      User,
      Globe,
      Eye,
      Layers,
      Flag,
      Map,
      HandHeart,
      SquarePen,
      FilePlus,
      FileWarning,
      Megaphone,
      ArrowRight,
      MapPin,
      Power,
      PowerOff,
      Clock,
      Activity,
      Image,
      Calendar,
      ShieldHalf,
      ShoppingCart,
      Gavel,
      Newspaper,
      Sparkles
    },
    attrs: { "aria-hidden": true }
  });
})();
/*! Bundled license information:

lucide/dist/esm/createElement.js:
lucide/dist/esm/replaceElement.js:
lucide/dist/esm/defaultAttributes.js:
lucide/dist/esm/icons/activity.js:
lucide/dist/esm/icons/arrow-right.js:
lucide/dist/esm/icons/calendar.js:
lucide/dist/esm/icons/chevron-down.js:
lucide/dist/esm/icons/chevron-left.js:
lucide/dist/esm/icons/chevron-right.js:
lucide/dist/esm/icons/clock.js:
lucide/dist/esm/icons/download.js:
lucide/dist/esm/icons/eye.js:
lucide/dist/esm/icons/file-plus.js:
lucide/dist/esm/icons/file-warning.js:
lucide/dist/esm/icons/file.js:
lucide/dist/esm/icons/flag.js:
lucide/dist/esm/icons/folder.js:
lucide/dist/esm/icons/gavel.js:
lucide/dist/esm/icons/globe.js:
lucide/dist/esm/icons/hand-heart.js:
lucide/dist/esm/icons/hash.js:
lucide/dist/esm/icons/image.js:
lucide/dist/esm/icons/layers.js:
lucide/dist/esm/icons/mail.js:
lucide/dist/esm/icons/map-pin.js:
lucide/dist/esm/icons/map.js:
lucide/dist/esm/icons/megaphone.js:
lucide/dist/esm/icons/message-circle.js:
lucide/dist/esm/icons/newspaper.js:
lucide/dist/esm/icons/power-off.js:
lucide/dist/esm/icons/power.js:
lucide/dist/esm/icons/search.js:
lucide/dist/esm/icons/shield-half.js:
lucide/dist/esm/icons/shopping-cart.js:
lucide/dist/esm/icons/sparkles.js:
lucide/dist/esm/icons/square-pen.js:
lucide/dist/esm/icons/user.js:
lucide/dist/esm/icons/users.js:
lucide/dist/esm/icons/wrench.js:
lucide/dist/esm/icons/x.js:
lucide/dist/esm/lucide.js:
  (**
   * @license lucide v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
