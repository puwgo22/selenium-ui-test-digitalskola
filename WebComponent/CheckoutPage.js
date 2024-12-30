const { By } = require ('selenium-webdriver')

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
            this.firstNameInput = By.xpath("//input[@id='first-name']")
            this.lastNameInput = By.xpath("//input[@id='last-name']")
            this.zipInput = By.xpath("//input[@id='postal-code']")
            this.btnContinue = By.xpath("//input[@id='continue']")
            this.btnCancel = By.xpath("//button[@id='cancel']")
            this.errorMessage = By.css('.error-message-container')
    }

    async isOnCheckoutPage() {
        const title = await this.driver.findElement(By.xpath("//span[@class='title']"))
        return title.getText()
    }

    async yourInformation(firstName, lastName, zip){
        await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
        await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
        await this.driver.findElement(this.zipInput).sendKeys(zip);
        await this.driver.findElement(this.btnContinue).click();
    }

    async btnCancel() {
        const title = await await this.driver.findElement(this.btnCancel).click();
    }

    async getErrorMessage() {
        try {
            const errorElement =  await this.driver.findElement(this.errorMessage);
            return await errorElement.getText();
        } catch (err) {
            return null; //Tidak ada message
        }
    }

}

module.exports = CheckoutPage