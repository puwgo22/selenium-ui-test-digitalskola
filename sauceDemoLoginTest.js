const { Builder, By, Key, until, Browser } = require ('selenium-webdriver');
const assert = require('assert')

async function sauceDemoLoginTest() {
    // Membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://www.saucedemo.com');

        //Input username and password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');

        //Click button login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        //Memastikan kita di dashboard dengan mencari judul "Sauce Labs"
        let tittleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(tittleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'")

        //Memastikan kita di dashboard mencari "Burger Button"
        let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuButton.isDisplayed(), true, "Menu Button is not visible")

    } finally {
        await driver.quit()
    }

}

sauceDemoLoginTest()