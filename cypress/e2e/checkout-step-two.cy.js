const { beforeEach } = require('mocha');
import { step2 } from '../support/pom/checkout';
import { global } from '../support/pom/global';

describe('Checkout step 2 tests', () => {
	beforeEach(() => {
		cy.loginStandardUser();
		cy.addProductAndNavigateToCheckoutStep2();
	});

	it('Verify page title is correct', () => {
		cy.verifyPageTitle('Checkout: Overview');
	});

	it('Click "Cancel" button - Go back to Cart', () => {
		cy.get(global.cancelButton).click();
		cy.url().should('eq', Cypress.env('homeUrl'));
	});

	it('Click product name - Go to product page', () => {
        cy.get(global.productNameLink).first().click();
		let productId = localStorage
			.getItem('cart-contents')
			.slice(0, 2)
			.replace(/[\[\]]/g, '');
		cy.url().should('eq', `https://www.saucedemo.com/inventory-item.html?id=${productId}`);
	});

    it('Click "Finish" button - Place an order', () => {
        cy.get(step2.finishButton).click();
        cy.url().should('eq', Cypress.env('checkoutCompleteUrl'));
    });

});
