const { beforeEach } = require('mocha');
import { pdp } from '../support/pom/pdp';
import { global } from '../support/pom/global';
import { navbar } from '../support/pom/nav';
import { home } from '../support/pom/home';

describe('Product page tests', () => {
	beforeEach(() => {
		cy.loginStandardUser();
		home.openFirstProductPage();
		cy.get(pdp.addToCartButton).click();
	});

	it('Return to homepage/products', () => {
        cy.get(pdp.backToProductsButton).click();
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
	});

    it('Add product to cart', () => {
		let pdpName;
		let cartName;
		cy.get(navbar.numberOfProductsInCart).should('be.visible');
		// Fetch product name on product page
		cy.get(pdp.productName)
			.invoke('text')
			.then((elem1) => {
				pdpName = elem1;
			});
		cy.get(pdp.removeButton).should('be.visible');
		cy.visit(Cypress.env('cartUrl'), { failOnStatusCode: false });
		// Fetch product name in Cart and compare to the product page
		cy.get(global.productNameLink)
			.invoke('text')
			.then((elem2) => {
				cartName = elem2;
				expect(pdpName).to.equal(cartName);
			})
	});

    it('Remove product from cart', () => {
		cy.get(pdp.removeButton).click();
        cy.get(navbar.numberOfProductsInCart).should('not.exist');
        cy.get(pdp.addToCartButton).should('be.visible');
	});
});
