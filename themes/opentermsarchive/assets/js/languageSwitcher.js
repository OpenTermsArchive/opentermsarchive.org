document.addEventListener('DOMContentLoaded', () => {
  const $languageSwitcher = document.querySelector('.language-switcher');

  document.querySelectorAll('.language-switcher--current, .language-switcher__item').forEach($el => {
    $el.addEventListener('click', () => {
      $languageSwitcher.classList.toggle('language-switcher--is-open');
    });
  });
});
