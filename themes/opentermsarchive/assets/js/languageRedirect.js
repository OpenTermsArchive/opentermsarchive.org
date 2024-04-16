(() => {
  /* eslint-disable no-undef */
  const preferredNavigatorLanguages = Array.from(new Set(navigator.languages.map(lang => new Intl.Locale(lang).language)));
  const currentPath = window.location.pathname;
  const isLangDefinedInPath = supportedLanguagesCode.some(code => currentPath.includes(code));

  if (!isLangDefinedInPath) {
    const regex = currentPath === '/' ? new RegExp(`^${baseURL}$`) : new RegExp(`${currentPath}$`);
    const matchingPage = pages.find(page => regex.test(page.permalink));

    if (matchingPage) {
      const matchingTranslation = matchingPage.translations.find(translation =>
        preferredNavigatorLanguages.includes(translation.lang));

      if (matchingTranslation) {
        redirectURL = matchingTranslation.permalink;
      } else {
        redirectURL = matchingPage.permalink;
      }
    }
  }
  window.location.replace(redirectURL);
  /* eslint-enable no-undef */
})();
