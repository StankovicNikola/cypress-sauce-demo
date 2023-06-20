const { beforeEach } = require('mocha');
import { cart } from '../support/pom/cart';
import { home } from '../support/pom/home';
import { sidebar, navbar } from '../support/pom/nav';
import { loginElements } from '../support/pom/login';

describe('Nav tests', () => {
    beforeEach(() => {
		cy.loginStandardUser();
    });
    
    it('Clicking hamburger button opens the sidebar', () => {
		cy.get(navbar.hamburgerButton).should('be.visible').click();
		cy.get(sidebar.sidebar).should('not.have.attr', 'hidden')
		cy.get(sidebar.sidebarList).should('be.visible');
	});
    
    it('Clicking Cart button opens the cart page', () => {
        cy.get(navbar.cartButton).should('be.visible').click();
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html');
        cy.get(cart.checkoutButton).should('be.visible');
    });

	it('Cart shows no number when it\s empty', () => {
		cy.get(navbar.cartButton).should('be.visible')
		cy.get(navbar.numberOfProductsInCart).should('not.exist');
	});

	it('Cart shows a number when its not empty', () => {
		home.clickFirstProductAddToCartButton();
		cy.get(navbar.numberOfProductsInCart).should('be.visible');
	});

    it('Clicking "X" button closes the sidebar', () => {
		cy.get(navbar.hamburgerButton).click();
		cy.get(sidebar.sidebar).should('not.have.attr', 'hidden');
		cy.get(sidebar.closeSidebarButton).should('be.visible').click();
		cy.get(sidebar.sidebar).should('have.attr', 'hidden');
	});

    it.skip('Clicking "About" button opens the about page', () => {
		cy.get(navbar.hamburgerButton).click();
		cy.get(sidebar.aboutButton).click();
        cy.url().should('eq', 'https://saucelabs.com/');
	});
    
    it('Clicking "Logout" button logs you out', () => {
		cy.get(navbar.hamburgerButton).click();
		cy.get(sidebar.sidebar).should('not.have.attr', 'hidden');
		cy.get(sidebar.logoutButton).should('be.visible').click();
		cy.get(loginElements.userNameField).should('be.visible');
	});

});