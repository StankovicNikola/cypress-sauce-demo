const { beforeEach } = require('mocha');
import { loginElements, errorElements } from '../support/pom/login';

describe('Login tests - positive and negative', () => {
  beforeEach(() => {
    cy.visit('/')
  });
  
  it('Try to login with blank username and blank password and dismiss error message', () => {
    cy.get(loginElements.loginButton).click();
		cy.get(loginElements.userNameField).should('have.class', 'error');
		cy.get(loginElements.passwordField).should('have.class', 'error');
		cy.get(errorElements.errorMessage)
      .should('be.visible')
      .and('contain', 'Epic sadface: Username is required');
		cy.dismissErrorMessage();
    cy.get(errorElements.errorMessage).should('not.exist');
    cy.url().should('eq', 'https://www.saucedemo.com/');
  })

  it('Try to login with incorrect username', () => {
    cy.loginInvalid('incorrect', Cypress.env('password'));
    cy.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
		cy.url().should('eq', 'https://www.saucedemo.com/');
  });

  it('Try to login with incorrect password', () => {
    cy.loginInvalid(Cypress.env('standard_user'), 'incorrect');
    cy.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
		cy.url().should('eq', 'https://www.saucedemo.com/');
  });

  it('Try to login with locked out user', () => {
    cy.loginLockedOutUser();
    cy.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
		cy.url().should('eq', 'https://www.saucedemo.com/');
  });

  it('Login with standard user', () => {
    cy.loginStandardUser();
	  cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
  });

  it('Login with problem user', () => {
    cy.loginProblemUser();
	  cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
	});

  it('Login with performance glitch user', () => {
    cy.loginPerformanceGlitchUser();
	  cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
  });
})