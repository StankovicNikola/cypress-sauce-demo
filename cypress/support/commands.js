import { loginElements } from '../support/pom/login';
import { home } from '../support/pom/home';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

// Cypress.Commands.add('login', (email, password) => { ... })

// LOGIN
// Cypress.Commands.add('loginValid', (email, password) => {
//     // Logs user in with valid credentials provided as function arguments
//     cy.visit('/');
//     cy.get(loginElements.userNameField).type(email, { log: false });
//     cy.get(loginElements.passwordField).type(password, { log: false });
//     cy.get(loginElements.loginButton).click();
// });

Cypress.Commands.add('loginStandardUser', () => {
	// Logs user in with standard user
	cy.visit('/');
	cy.get(loginElements.userNameField).type(Cypress.env('standard_user'), { log: false });
	cy.get(loginElements.passwordField).type(Cypress.env('password'), { log: false });
	cy.get(loginElements.loginButton).click();
});

Cypress.Commands.add('loginProblemUser', () => {
	// Logs user in with problem user
	cy.visit('/');
	cy.get(loginElements.userNameField).type(Cypress.env('problem_user'), { log: false });
	cy.get(loginElements.passwordField).type(Cypress.env('password'), { log: false });
	cy.get(loginElements.loginButton).click();
});

Cypress.Commands.add('loginLockedOutUser', () => {
	// Attempts to log in with locked out user
	cy.visit('/');
	cy.get(loginElements.userNameField).type(Cypress.env('locked_out_user'), { log: false });
	cy.get(loginElements.passwordField).type(Cypress.env('password'), { log: false });
	cy.get(loginElements.loginButton).click();
});

Cypress.Commands.add('loginPerformanceGlitchUser', () => {
	// Logs user in with performance glitch user
	cy.visit('/');
	cy.get(loginElements.userNameField).type(Cypress.env('performance_glitch_user'), { log: false });
	cy.get(loginElements.passwordField).type(Cypress.env('password'), { log: false });
	cy.get(loginElements.loginButton).click();
});

Cypress.Commands.add('loginInvalid', (email, password) => {
	// Unsuccessfully tries to log user in with invalid credentials provided
    // as function arguments and verifies error is displayed
	cy.visit('/');
	cy.get(loginElements.userNameField).type(email, { log: false });
	cy.get(loginElements.passwordField).type(password, { log: false });
	cy.get(loginElements.loginButton).click();
	cy.get(loginElements.userNameField).should('have.class', 'error');
	cy.get(loginElements.passwordField).should('have.class', 'error');
});

// E2E CHECKOUT
Cypress.Commands.add('e2eCheckout', () => {
	// Full flow using UI which includes: adding a product to the cart, opening Cart page,
	// navigating to Checkout step 1, entering user information, navigating to
	// Checkout step 2, placing order and verifying Checkout complete page is shown
	cy.get;
	cy.addProductAndNavigateToCheckoutStep1();
	// cy.get(step2.finishButton).click();
	cy.visit(Cypress.env('checkoutCompleteUrl'), { failOnStatusCode: false });
});

// ADD PRODUCT TO CART AND NAVIGATE TO CART/CHECKOUT PAGES
Cypress.Commands.add('addProductAndNavigateToCart', () => {
    // Adds the first available product to the cart and navigates
    // to the cart using URL (not UI)
    home.clickFirstProductAddToCartButton();
    cy.visit(Cypress.env('cartUrl'), { failOnStatusCode: false });
});

Cypress.Commands.add('addProductAndNavigateToCheckout', () => {
	// Adds the first available product to the cart and navigates
	// to the checkout page step 1 using URL (not UI)
	home.clickFirstProductAddToCartButton();
	cy.visit(Cypress.env('checkoutStepOneUrl'), { failOnStatusCode: false });
});

Cypress.Commands.add('addProductAndNavigateToCheckoutStep2', () => {
	// Adds the first available product to the cart and navigates
	// to the checkout page step 2 using URL (not UI)
	home.clickFirstProductAddToCartButton();
	cy.visit(Cypress.env('checkoutStepTwoUrl'), { failOnStatusCode: false });
});

// GENERAL
Cypress.Commands.add('verifyPageTitle', (text) => {
    cy.get('.title').should('have.text', text);
});

Cypress.Commands.add('verifyErrorMessage', (text) => {
	cy.get('[data-test="error"]').should('have.text', text);
});

Cypress.Commands.add('dismissErrorMessage', () => {
	cy.get('.error-button').click();
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
