const { beforeEach } = require('mocha');
import { footer } from '../support/pom/footer';

describe('Nav tests', () => {
	beforeEach(() => {
		cy.loginStandardUser();
	});

	it('Verify Twitter button href attribute', () => {
		// Verify Twitter button contains href attribute pointing to Twitter page
		cy.get(footer.twitterLink).should('have.attr', 'href', 'https://twitter.com/saucelabs');
	});

	it('Verify Facebook button href attribute', () => {
		// Verify Facebook button contains href attribute pointing to Facebook page
		cy.get(footer.facebookLink).should('have.attr', 'href', 'https://www.facebook.com/saucelabs');
	});

	it('Verify LinkedIn button href attribute', () => {
		// Verify LinkedIn button contains href attribute pointing to LinkedIn page
		cy.get(footer.linkedInLink).should('have.attr', 'href', 'https://www.linkedin.com/company/sauce-labs/');
	});

	it('Copyright elements contains correct text', () => {
		// Verify the copyright contains correct text
		cy.get(footer.copyrightElement).should('have.text', footer.copyright);
	});
});
