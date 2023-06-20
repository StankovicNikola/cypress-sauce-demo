const { beforeEach } = require('mocha');
import { completed } from '../support/pom/checkout';

describe('Checkout step 2 tests', () => {
	beforeEach(() => {
		cy.loginStandardUser();
        // 'Checkout complete' page can be tested without placing an order
		// by simply navigating to the appropriate URL
        cy.visit(Cypress.env('checkoutCompleteUrl'), { failOnStatusCode: false });
	});

	it('Verify page title is correct', () => {
		cy.verifyPageTitle('Checkout: Complete!');
	});

	it('Verify heading shows correct text', () => {
		cy.get(completed.header).should('have.text', 'Thank you for your order!');
	});

	it('Verify subheading shows correct text', () => {
		cy.get(completed.text).should(
			'have.text',
			'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
		);
	});

	it('Click "Back Home" button - Go back to homepage', () => {
		cy.get(completed.backHomeButton).click();
		cy.url().should('eq', Cypress.env('homeUrl'));
	});
});
