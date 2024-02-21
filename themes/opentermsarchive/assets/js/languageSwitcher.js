document.addEventListener('DOMContentLoaded', () => {
  const $languageSwitcher = document.querySelector('.language-switcher');
  
  document.querySelectorAll('.language-switcher--current, .language-switcher__item').forEach($el => {
    $el.addEventListener('click', () => {
      console.log('azdazd');
      $languageSwitcher.classList.toggle('language-switcher--is-open');
    });
  });
});
