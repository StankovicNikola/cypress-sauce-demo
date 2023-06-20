export { loginElements, errorElements };

const loginElements = {
	userNameField: '[data-test="username"]',
	passwordField: '[data-test="password"]',
	loginButton: '[data-test="login-button"]',
};

const errorElements = {
	errorFieldsElement: '.input_error',
	containerWithErrorMessage: '.error-message-container',
	errorMessage: '[data-test="error"]',
	buttonToCloseErrorMessage: '.error-button',
};
