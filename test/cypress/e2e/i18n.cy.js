const LANGUAGES = {
  default: 'en',
  supported: [ 'en', 'fr' ],
  unsupported: ['jp'],
};

const HOMEPAGE = {
  en: { permalink: `${Cypress.config().baseUrl}/en/` },
  fr: { permalink: `${Cypress.config().baseUrl}/fr/` },
};

const PRIVACY_POLICY = {
  en: {
    permalink: `${Cypress.config().baseUrl}/en/privacy-policy/`,
    text: 'Privacy policy',
  },
  fr: {
    permalink: `${Cypress.config().baseUrl}/fr/politique-de-confidentialite/`,
    text: 'Politique de confidentialité',
  },
};

describe('i18n', () => {
  describe('Homepage', () => {
    context('when language is not specified in the URL', () => {
      context('when user prefered language is supported', () => {
        beforeEach(() => {
          cy.visit('/', {
            onBeforeLoad(window) {
              Object.defineProperty(window.navigator, 'languages', { value: [LANGUAGES.supported[1]] });
            },
          });
        });
        it('adds language in the URL', () => {
          cy.location('href').should('equal', HOMEPAGE.fr.permalink);
        });
        it('defines the proper HTML lang attribute', () => {
          cy.get('html').should('have.attr', 'lang', LANGUAGES.supported[1]);
        });
        it('displays the content in the proper language', () => {
          cy.get('.footer').contains('Politique de confidentialité');
        });
      });
      context('when user prefered language is not supported', () => {
        beforeEach(() => {
          cy.visit('/', {
            onBeforeLoad(window) {
              Object.defineProperty(window.navigator, 'languages', { value: [LANGUAGES.unsupported[0]] });
            },
          });
        });
        it('adds the default language in the URL', () => {
          cy.location('href').should('equal', HOMEPAGE.en.permalink);
        });
        it('defines the proper HTML lang attribute', () => {
          cy.get('html').should('have.attr', 'lang', LANGUAGES.default);
        });
        it('displays the content in the proper language', () => {
          cy.get('.footer').contains(PRIVACY_POLICY.en.text);
        });
      });
    });
    context('when language is specified in the URL', () => {
      context('when language is supported', () => {
        beforeEach(() => {
          cy.visit(HOMEPAGE.fr.permalink);
        });
        it('shows language in the URL', () => {
          cy.location('href').should('equal', HOMEPAGE.fr.permalink);
        });
        it('defines the proper HTML lang attribute', () => {
          cy.get('html').should('have.attr', 'lang', LANGUAGES.supported[1]);
        });
        it('displays the content in the proper language', () => {
          cy.get('.footer').contains(PRIVACY_POLICY.fr.text);
        });
      });
    });
  });
  describe('Privacy Policy', () => {
    context('when language is not specified in the URL', () => {
      context('when user prefered language is supported', () => {
        beforeEach(() => {
          cy.visit('/privacy-policy', {
            onBeforeLoad(window) {
              Object.defineProperty(window.navigator, 'languages', { value: [LANGUAGES.supported[1]] });
            },
          });
        });
        it('adds language in the URL', () => {
          cy.location('href').should('equal', PRIVACY_POLICY.fr.permalink);
        });
        it('defines the proper HTML lang attribute', () => {
          cy.get('html').should('have.attr', 'lang', LANGUAGES.supported[1]);
        });
        it('displays the content in the proper language', () => {
          cy.get('.footer').contains(PRIVACY_POLICY.fr.text);
        });
      });
    });
  });
});
