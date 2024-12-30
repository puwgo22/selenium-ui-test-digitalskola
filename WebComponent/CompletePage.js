const { By } = require('selenium-webdriver');

class CompletePage {
    constructor(driver) {
        this.driver = driver;
    }

    // Methods
    async isOnCompletePage() {
        const title = await this.driver.findElement(By.xpath("//span[@class='title']"))
        return title.getText()
    }

    //Text Thanks
    async isOnThaksDisplay() {
        const textThanks = await this.driver.findElement(By.xpath("//h2[@class='complete-header']"))
        return textThanks.getText()
    }

    //Back Home Button
    async btnBackHome(){
        await this.driver.findElement(By.xpath("//button[@id='back-to-products']")).click();
    }

}

module.exports = CompletePage;
