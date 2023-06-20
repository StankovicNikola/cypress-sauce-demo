const { defineConfig } = require("cypress");
const fs = require('fs');
const { merge } = require('mochawesome-merge');
const generateReport = require('mochawesome-report-generator');
const envLocal = require('./.env.local.json');

module.exports = defineConfig({
	viewportWidth: 1920,
	viewportHeight: 1024,
	reporter: 'cypress-mochawesome-reporter',
	reporterOptions: {
		reportDir: 'cypress/reports',
		timestamp: 'longDate',
		charts: true,
		reportFilename: '[status]_[datetime]-report',
		reportPageTitle: 'My Test Suite',
		embeddedScreenshots: true,
		inlineAssets: true,
		overwrite: false,
		screenshotOnRunFailure: true,
	},
	env: {
		homeUrl: 'https://www.saucedemo.com/inventory.html',
		cartUrl: 'https://www.saucedemo.com/cart.html',
		productPageUrl: 'https://www.saucedemo.com/inventory-item.html?id=',
		checkoutStepOneUrl: 'https://www.saucedemo.com/checkout-step-one.html',
		checkoutStepTwoUrl: 'https://www.saucedemo.com/checkout-step-two.html',
		checkoutCompleteUrl: 'https://www.saucedemo.com/checkout-complete.html',
		...envLocal

	},
	e2e: {
		baseUrl: 'https://www.saucedemo.com',
		chromeWebSecurity: false,
		setupNodeEvents(on, config) {
			require('cypress-mochawesome-reporter/plugin')(on);
			// implement node event listeners here
			on('after:spec', (spec, results) => {
				if (results && results.video) {
					// Do we have failures for any retry attempts?
					const failures = results.tests.some((test) =>
						test.attempts.some((attempt) => attempt.state === 'failed')
					);
					if (!failures) {
						// delete the video if the spec passed and no tests retried
						fs.unlinkSync(results.video);
					}
				}
			});
		},
	},
	retries: {
		// Configure retry attempts for `cypress run`
		// Default is 0
		runMode: 2,
		// Configure retry attempts for `cypress open`
		// Default is 0
		openMode: 0,
	},
});
