const { beforeEach } = require('mocha');
import { pdp } from '../support/pom/pdp';
import { cart } from '../support/pom/cart';
import { global } from '../support/pom/global';
import { home } from '../support/pom/home';

describe('Cart tests', () => {
	beforeEach(() => {
		cy.loginStandardUser();
		home.openFirstProductPage();
		cy.get(pdp.addToCartButton).click();
		cy.visit('/cart.html', { failOnStatusCode: false });
	});

	it('Verify page title is correct', () => {
        cy.verifyPageTitle('Your Cart');
	});

	it('Continue shopping / Return to homepage/products', () => {
		cy.get(cart.continueShoppingButton).click();
		cy.url().should('eq', Cypress.env('homeUrl'));
	});

    it('Open product page by clicking product name link', () => {
        cy.get(global.productNameLink).first().click();
        let productId = localStorage
            .getItem('cart-contents')
            .slice(0, 2)
            .replace(/[\[\]]/g, '');
		cy.url().should(
			'eq',
			Cypress.env('productPageUrl') + productId
		);
    });

    it('Remove 1 product from cart and confirm the number of products in cart is subtracted by 1', () => {
		cy.get(cart.product).its('length').then((oldNumberInCart) => {
            cy.get(cart.product).should('have.length', oldNumberInCart);
            cy.get(cart.removeButton).first().click();
            cy.get(cart.product).should('have.length', oldNumberInCart - 1);
		});
	});

    it('Proceed to checkout', () => {
		cy.get(cart.checkoutButton).click();
		cy.url().should('eq', Cypress.env('checkoutStepOneUrl'));
	});
});
