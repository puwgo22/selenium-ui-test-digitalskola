const { By } = require ('selenium-webdriver')

class DashboardPage {
    constructor(driver) {
        this.driver = driver

        //Locators
        this.productNameLocator1 = (productName) =>
            By.xpath(`//div[@class='inventory_item'][.//div[text()='${productName}']]//button`);
        this.cartIconLocator = By.xpath("//div[@id='shopping_cart_container']/a[1]");
        this.cartBadgeLocator = By.xpath("//a[.='1']");
    }
    
    // Methods
    async isOnDashboard() {
        const title = await this.driver.findElement(By.xpath("//span[@class='title']"))
        return title.getText()
    }

    async addItemToCart(productName) {
        const addToCartButton = await this.driver.findElement(this.productNameLocator1(productName));
        await addToCartButton.click();
    }

    async openCart() {
        const cartIcon = await this.driver.findElement(this.cartIconLocator);
        await cartIcon.click();
    }

    async getCartItemCount() {
        try {
        const badge = await this.driver.findElement(this.cartBadgeLocator);
        return await badge.getText();
        } catch (error) {
        return '0'; // If no badge is displayed, cart is empty
        }
    }
}

module.exports = DashboardPage