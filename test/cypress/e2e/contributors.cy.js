describe('Contributors', () => {
  let allContributorsData;

  before(() => {
    cy.request('contributors.json').then(response => {
      expect(response.status).to.eq(200);
      allContributorsData = response.body;
    });
  });

  context('when Hugo is started', () => {
    it('exposes all contributors', () => {
      expect(allContributorsData).to.not.be.null;
    });

    it('they contain at least one contributor', () => {
      expect(allContributorsData.contributors).to.have.lengthOf.at.least(1);
    });
  });
});
