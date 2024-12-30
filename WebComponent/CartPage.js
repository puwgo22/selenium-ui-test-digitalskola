const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
    }

    // Methods
    async isOnYourCart() {
        const title = await this.driver.findElement(By.xpath("//span[@class='title']"))
        return title.getText()
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

    //lanjut checkout
    async btnCheckout(){
        await this.driver.findElement(By.xpath("//button[@id='checkout']")).click();
    }

    //lanjut shopping
    async btnContinueShop(){
        await this.driver.findElement(By.xpath("//button[@id='continue-shopping']")).click();
    }
}

module.exports = CartPage;
