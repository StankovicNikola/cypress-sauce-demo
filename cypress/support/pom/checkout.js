export { step1, step2, completed };

const step1 = {
	continueButton: '[data-test="continue"]',
	firstNameField: '[data-test="firstName"]',
	lastNameField: '[data-test="lastName"]',
	zipPostalCodeField: '[data-test="postalCode"]',
    title: '.title',
	fillStep1Details () {
		cy.get(step1.firstNameField).type('Nikola');
		cy.get(step1.lastNameField).type('Stankovic');
		cy.get(step1.zipPostalCodeField).type('11000');
	},
	fillStep1DetailsAndProceedToStep2 () {
		this.fillStep1Details();
		cy.get(step1.continueButton).click();
	},
};

const step2 = {
	finishButton: '[data-test="finish"]',
};

const completed = {
	header: '.complete-header',
	text: '.complete-text',
	backHomeButton: '[data-test="back-to-products"]',
};