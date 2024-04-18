/* global OTA_SUPPORTED_LANGUAGE_CODE, OTA_BASEURL, OTA_PAGES */
(() => {
  let redirectURL = `${OTA_BASEURL}`;
  const PREFERRED_NAVIGATOR_LANGUAGES = Array.from(new Set(navigator.languages.map(lang => new Intl.Locale(lang).language)));
  const CURRENT_PATH = window.location.pathname;
  const IS_LANG_DEFINED_IN_PATH = OTA_SUPPORTED_LANGUAGE_CODE.some(code => CURRENT_PATH.includes(code));

  if (!IS_LANG_DEFINED_IN_PATH) {
    const REGEX = CURRENT_PATH === '/' ? new RegExp(`^${OTA_BASEURL}$`) : new RegExp(`${CURRENT_PATH}$`);
    const MATCHING_PAGE = OTA_PAGES.find(page => REGEX.test(page.permalink));

    if (MATCHING_PAGE) {
      const MATCHING_TRANSLATION = MATCHING_PAGE.translations.find(translation =>
        PREFERRED_NAVIGATOR_LANGUAGES.includes(translation.lang));

      if (MATCHING_TRANSLATION) {
        redirectURL = MATCHING_TRANSLATION.permalink;
      } else {
        redirectURL = MATCHING_PAGE.permalink;
      }
    }
  }
  window.location.replace(redirectURL);
})();
