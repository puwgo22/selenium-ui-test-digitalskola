const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const assert = require('assert');
require('dotenv').config();

const baseUrl = process.env.BASE_URL;


const fs = require('fs');
const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 2 #login #Smoke', function () {
    this.timeout(40000);
    let driver;

    //Run setiap mulai test, satu kali saja paling awal
    before(async function (){
        driver = await new Builder().forBrowser('chrome').build();
    });

    //Test Suite dimulai dengan apa, setiap melakukan tes
    beforeEach(async function (){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login('haha', 'hihi');
    });

    //Assertion atau validasi
    it('Error message appears for invalid credentials', async function (){
        const loginPage = new LoginPage(driver);
        const errorMessage = await loginPage.getErrorMessage();
        assert.strictEqual(errorMessage, 'Epic sadface: Username and password do not match any user in this service'
            , 'Expected error message does not match')
   });

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function (){
        await driver.quit();
    });
});