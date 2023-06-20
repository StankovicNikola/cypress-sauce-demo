const homeURL = 'https://www.saucedemo.com';

describe('API test suite', function () {
    beforeEach(() => {
		cy.loginStandardUser();
    })

	it('Status code is 200 on successful log in', function () {
		cy.request('GET', homeURL).then((response) => {
			expect(response.status).to.eq(200);
		});
	});

});
