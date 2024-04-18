const EN_HOMEPAGE = `${Cypress.config().baseUrl}/en/`;
const FR_HOMEPAGE = `${Cypress.config().baseUrl}/fr/`;

describe('i18n', () => {
  describe('Homepage', () => {
    context(`when browsing ${Cypress.config().baseUrl}`,() => {
      context('when window navigator languages is defined as [fr-FR]',() => {
        beforeEach(function () {
          cy.visit('/', {
            onBeforeLoad (win) {
              Object.defineProperty(win.navigator, 'languages', { value: ['fr-FR'] });
            }
          })
        })
        it(`is redirected to ${FR_HOMEPAGE}`, () => {
          cy.location('href').should('equal', FR_HOMEPAGE)
        });
        it('<html> lang attribute value is equal to fr', () => {
          cy.get('html').should('have.attr', 'lang', 'fr');
        });
        it('content is in french', () => {
          cy.get('.footer').contains('Politique de confidentialité');
        });
      });
      context('when window navigator languages is defined as [ja-JP]',() => {
        beforeEach(function () {
          cy.visit('/', {
            onBeforeLoad (win) {
              Object.defineProperty(win.navigator, 'languages', { value: ['ja-JP'] });
            }
          })
        })
        it(`is redirected to ${EN_HOMEPAGE}`, () => {
          cy.location('href').should('equal', EN_HOMEPAGE)
        });
        it('<html> lang attribute value is equal to en', () => {
          cy.get('html').should('have.attr', 'lang', 'en');
        });
        it('content is in english', () => {
          cy.get('.footer').contains('Privacy policy');
        });
      });
    });
    context(`when browsing ${FR_HOMEPAGE}`,() => {
      context("when language code is defined as 'fr'",() => {
        beforeEach(function () {
          cy.visit(FR_HOMEPAGE);
        })
        it(`is URL is equal to ${FR_HOMEPAGE}`, () => {
          cy.location('href').should('equal', FR_HOMEPAGE)
        });
        it('<html> lang attribute value is equal to fr', () => {
          cy.get('html').should('have.attr', 'lang', 'fr');
        });
        it('content is in french', () => {
          cy.get('.footer').contains('Politique de confidentialité');
        });
      });
    });
  });
  describe('Privacy Policy', () => {
    context(`when browsing ${Cypress.config().baseUrl}/privacy-policy`,() => {
      context('when window navigator languages is defined as [fr-FR]',() => {
        beforeEach(function () {
          cy.visit('/', {
            onBeforeLoad (win) {
              Object.defineProperty(win.navigator, 'languages', { value: ['fr-FR'] });
            }
          })
        })
        it(`is redirected to ${FR_HOMEPAGE}politique-de-confidentialite`, () => {
          cy.location('href').should('equal', FR_HOMEPAGE)
        });
        it('<html> lang attribute value is equal to fr', () => {
          cy.get('html').should('have.attr', 'lang', 'fr');
        });
        it('content is in french', () => {
          cy.get('.footer').contains('Politique de confidentialité');
        });
      });
    });
  });
});
