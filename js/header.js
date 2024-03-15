(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    const $header = document.querySelector(".header");
    document.querySelectorAll(".header__open-link, .header__close-link").forEach(($el) => {
      $el.addEventListener("click", () => {
        $header.classList.toggle("header--is-open");
      });
    });
  });
})();
