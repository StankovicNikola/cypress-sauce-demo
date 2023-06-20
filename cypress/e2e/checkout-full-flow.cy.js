import { cart } from '../support/pom/cart';
import { step1, step2, completed } from '../support/pom/checkout';
import { navbar } from '../support/pom/nav';
import { pdp } from '../support/pom/pdp';
import { home } from '../support/pom/home';

describe('Full checkout test', () => {
	it('Full checkout flow', () => {
		cy.section('Logging in');
		cy.step('Log in');
		cy.loginStandardUser();
		cy.section('Add product(s) to the cart');
		cy.step('Open the first product page');
		home.openFirstProductPage();
		cy.step('Click add to cart button');
		cy.get(pdp.addToCartButton).click();
		cy.step('Click Back to Products button to go back to the home page');
		cy.get(pdp.backToProductsButton).click();
		cy.step('Click the first available Add to Cart button');
		home.clickFirstProductAddToCartButton();
		cy.step('Click cart button from the navigation bar');
		cy.get(navbar.cartButton).click();
		cy.section('Checkout');
		cy.step('Click Checkout button');
		cy.get(cart.checkoutButton).click();
		cy.step('Enter First name, Last name and Zip/Postal code');
		step1.fillStep1Details();
		cy.step('Click Continue button to proceed to the next page of checkout');
		cy.get(step1.continueButton).click();
		cy.step('Click Finish button to place an order');
		cy.get(step2.finishButton).click();
		cy.step('Check if the order is placed successfully');
		cy.get(completed.header).should('be.visible');
		cy.step('Navigate back to the homepage');
		cy.get(completed.backHomeButton).click();
		cy.step('Check the URL');
		cy.url().should('eq', Cypress.env('homeUrl'));
	});
});
