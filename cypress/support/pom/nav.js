export { sidebar, navbar };

const navbar = {
	hamburgerButton: '#react-burger-menu-btn',
	cartButton: '#shopping_cart_container',
	numberOfProductsInCart: '#shopping_cart_container > a > span',

	verifyNoProductsAreInCart() {
		// Verifies no products are in cart by checking if:
		// navbar cart icon contains a number
		cy.get(navbar.numberOfProductsInCart).should('not.exist');
		// localStorage 'cart-contents' key has value of empty array
		cy.window().then((win) => {
			const storedValue = JSON.parse(win.localStorage.getItem('cart-contents'));
			expect(storedValue).to.deep.equal([]);
		});
	},

	verifyNumberOfProductsInCart(number) {
    	cy.get(navbar.numberOfProductsInCart).should('be.visible').and('contain', number);
	},
}

const sidebar = {
	sidebar: '.bm-menu-wrap',
	sidebarList: '.bm-item-list',
	closeSidebarButton: '#react-burger-cross-btn',
	allItemsButton: '#inventory_sidebar_link',
	aboutButton: '#about_sidebar_link',
	logoutButton: '#logout_sidebar_link',
	resetAppStateButton: '#reset_sidebar_link',
};