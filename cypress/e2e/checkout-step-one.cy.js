const { beforeEach } = require('mocha');
import { step1 } from '../support/pom/checkout';
import { global } from '../support/pom/global';


describe('Checkout step 1 tests', () => {
	beforeEach(() => {
		cy.loginStandardUser();
		// 'Checkout step one' page can be tested without adding products to cart
		// by simply navigating to the appropriate URL
		cy.visit(Cypress.env('checkoutStepOneUrl'), { failOnStatusCode: false });
	});
    
    it('Verify page title is correct', () => {
		cy.verifyPageTitle('Checkout: Your Information');
	});

	it('Click "Cancel" button - Go back to Cart', () => {
        cy.get(global.cancelButton).click();
        cy.url().should('eq', Cypress.env('cartUrl'));
	});

    it('Verify error message is displayed if First Name field is left blank', () => {
		cy.get(step1.continueButton).click();
		cy.verifyErrorMessage('Error: First Name is required');
		cy.get(step1.lastNameField).should('have.class', 'error');
	});

    it('Verify error message is displayed if Last Name field is left blank', () => {
		cy.get(step1.firstNameField).type('Nikola');
		cy.get(step1.continueButton).click();
		cy.get(step1.lastNameField).should('have.class', 'error');
		cy.verifyErrorMessage('Error: Last Name is required');
	});

    it('Verify error message is displayed if Zip/Postal Code field is left blank', () => {
		cy.get(step1.firstNameField).type('Nikola');
		cy.get(step1.lastNameField).type('Stankovic');
		cy.get(step1.continueButton).click();
		cy.verifyErrorMessage('Error: Postal Code is required');
		cy.get(step1.zipPostalCodeField).should('have.class', 'error');
	});

    it('Verify error message can be dismissed', () => {
		cy.get(step1.continueButton).click();
		cy.verifyErrorMessage('Error: First Name is required');
		cy.get(step1.firstNameField).should('have.class', 'error');
		cy.get(step1.lastNameField).should('have.class', 'error');
		cy.get(step1.zipPostalCodeField).should('have.class', 'error');
		cy.dismissErrorMessage();
		cy.get(step1.firstNameField).should('not.have.class', 'error');
		cy.get(step1.lastNameField).should('not.have.class', 'error');
		cy.get(step1.zipPostalCodeField).should('not.have.class', 'error');
		cy.url().should('eq', Cypress.env('checkoutStepOneUrl'));
	});

    it('Click "Continue" button - Go to checkout step 2', () => {
		step1.fillStep1DetailsAndProceedToStep2();
		cy.url().should('eq', Cypress.env('checkoutStepTwoUrl'));
	});
});
