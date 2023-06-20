export { home };
import { global } from '../pom/global';
import { navbar } from './nav';

const allProducts = '.inventory_list';
const product = '.inventory_item';

const home = {
	
	productDetails: {
		productPrice: '.inventory_item_description > .pricebar > .inventory_item_price',
		addToCartButton: '.btn.btn_primary.btn_small.btn_inventory',
		removeButton: '.btn.btn_secondary.btn_small.btn_inventory',

		sauceLabsBackPackAddToCartButton: '[data-test="add-to-cart-sauce-labs-backpack"]',
		sauceLabsBackPackRemoveButton: '[data-test="remove-sauce-labs-backpack"]',
	},

	sort: {
		sortButton: '[data-test="product_sort_container"]',
		sortButtonValue: '.active_option',
		sortNameAsc: 'Name (A to Z)',
		sortNameDesc: 'Name (Z to A)',
		sortPriceAsc: 'Price (low to high)',
		sortPriceDesc: 'Price (high to low)',
	},

	openFirstProductPage() {
		// Opens the product page of the first product displayed
		cy.get('.inventory_item').find('.inventory_item_name').first().click();
	},

	clickFirstProductAddToCartButton() {
		// Clicks the Add to cart button of a first product with the available button
		cy.get(this.productDetails.addToCartButton).first().click();
	},

	clickFirstProductRemoveButton() {
		// Clicks the Remove button of a first product with the available button
		cy.get(this.productDetails.removeButton).first().click();
	},

	clickSpecificAddToCartButton(nth) {
	// Clicks the Add to cart button of the specific product (nth provided as paramater when calling the function)
	cy.get(this.productDetails.productName)
		.eq(nth)
		.then((elem) => {
			let element = elem.text();
			element = element.toLowerCase();
			element = element.replace(/[ ]/g, '-');
			cy.get(`[data-test="add-to-cart-${element}"]`).click();
		});
	},

	addAllProductsToCart() {
    // Does exactly what it says: Adds all avalaible products to cart
    // and verifies the number of product in cart matches the number of 
    // all available products
	cy.get(this.productDetails.addToCartButton)
		.its('length')
		.then((numberOfElements) => {
			for (let i = 0; i < numberOfElements; i++) {
				cy.get(global.productNameLink)
					.eq(i)
					.then((elem) => {
						let element = elem.text();
						element = element.toLowerCase();
						element = element.replace(/[ ]/g, '-');
						cy.get(`[data-test="add-to-cart-${element}"]`).click();
					});
			}
			navbar.verifyNumberOfProductsInCart(numberOfElements);
		});
	},

	removeAllProductsFromCart() {
	// Does exactly what it says: Removes all avalaible products from cart
    // and verifies there are no products in the cart
	cy.get(this.productDetails.removeButton)
		.its('length')
		.then((numberOfElements) => {
			for (let i = 0; i < numberOfElements; i++) {
				cy.get(global.productNameLink)
					.eq(i)
					.then((elem) => {
						let element = elem.text();
						element = element.toLowerCase();
						element = element.replace(/[ ]/g, '-');
						cy.get(`[data-test="remove-${element}"]`).click();
					});
			}
			navbar.verifyNoProductsAreInCart();
		});
	},
}
