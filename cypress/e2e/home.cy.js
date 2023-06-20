const { beforeEach } = require('mocha');
import { home } from '../support/pom/home';
import { navbar } from '../support/pom/nav';

describe('Home tests', () => {

	beforeEach(() => {
		cy.loginStandardUser();
	});

	it('Verify page title', () => {
		cy.verifyPageTitle('Products');
	});

	it('Add all products to cart', () => {
		home.addAllProductsToCart();
	});

	it('Add all products to cart and then remove all from cart', () => {
		home.addAllProductsToCart();
		home.removeAllProductsFromCart();
	});

	it('Add a single product cart', () => {
		home.clickFirstProductAddToCartButton();
	});

	it('Remove a product from the cart', () => {
		cy.step('Adding product to cart');
		home.clickFirstProductAddToCartButton();
		cy.get(navbar.numberOfProductsInCart).should('be.visible');
		cy.step('Removing product from cart');
		home.clickFirstProductRemoveButton();
		cy.get(navbar.numberOfProductsInCart).should('not.exist');
	});

	it('Open a first product page', () => {
		home.openFirstProductPage();
	});

	it('Select sort by Name from A to Z (ascending) button', () => {
		cy.get(home.sort.sortButton).select(home.sort.sortNameAsc);
		cy.get(home.sort.sortButtonValue).invoke('text').should('eq', home.sort.sortNameAsc);
	});

	it('Select sort by Name from Z to A (descending) button', () => {
		cy.get(home.sort.sortButton).select(home.sort.sortNameDesc);
		cy.get(home.sort.sortButtonValue).invoke('text').should('eq', home.sort.sortNameDesc);
	});

	it('Select sort by Price from low to high (ascending) button', () => {
		cy.get(home.sort.sortButton).select(home.sort.sortPriceAsc);
		cy.get(home.sort.sortButtonValue).invoke('text').should('eq', home.sort.sortPriceAsc);
	});

	it('Select sort by Price from high to low to (descending) button', () => {
		cy.get(home.sort.sortButton).select(home.sort.sortPriceDesc);
		cy.get(home.sort.sortButtonValue).invoke('text').should('eq', home.sort.sortPriceDesc);
	});
});
