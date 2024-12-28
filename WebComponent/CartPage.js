const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
    }

    // Method to locate a specific cart item by name
    async getCartItemByName(productName) {
        const cartItems = await this.driver.findElement(By.xpath("//div[@class='inventory_item_name']")).getText();
        if (cartItems === productName) {
            return cartItems;
        }
    }
    
    async isItemInCart(productName) {
        const item = await this.getCartItemByName(productName);
        return item !== null; // If item is found, return true; otherwise, false
    }
}

module.exports = CartPage;
