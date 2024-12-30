const { By } = require('selenium-webdriver');

class OverviewPage {
    constructor(driver) {
        this.driver = driver;
    }

    async isOnOverview() {
        const title = await this.driver.findElement(By.xpath("//span[@class='title']"))
        return title.getText()
    }

    // Method to locate a specific cart item by name
    async getOverviewItemByName(productName) {
        const OverviewItems = await this.driver.findElement(By.xpath("//div[@class='inventory_item_name']")).getText();
        if (OverviewItems === productName) {
            await this.driver.findElement(By.xpath("//button[@id='finish']")).click();
            return OverviewItems
        }
    }
    
    async isItemInCart(productName) {
        const item = await this.getCartItemByName(productName);
        return item !== null; // If item is found, return true; otherwise, false
    }

    //lanjut shopping
    async btnCancel(){
        await this.driver.findElement(By.xpath("//button[@id='cancel']")).click();
    }
}

module.exports = OverviewPage;
