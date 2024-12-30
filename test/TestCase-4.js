const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require('../WebComponent/CartPage');
const CheckoutPage = require('../WebComponent/CheckoutPage');
const OverviewPage = require('../WebComponent/OverviewPage');
const CompletePage = require('../WebComponent/CompletePage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;
const product = process.env.PRODUCT;
const firstName = process.env.FIRSTNAME;
const lastName = process.env.LASTNAME;
const zip = process.env.ZIP;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase-4 #E2E-Testing', function () {
    this.timeout(50000);
    let driver;

    switch (browser.toLowerCase()) {
        case 'chrome':
                const chrome = require('selenium-webdriver/chrome');
                options = new chrome.Options();
                options.addArguments('--headless');
            break;

        case 'firefox':
                const firefox = require('selenium-webdriver/firefox');
                options = new firefox.Options();
                options.addArguments('--headless');
            break;
        default:
                const edge = require('selenium-webdriver/edge');
                options = new edge.Options();
                options.addArguments('--headless');
            break;
    }


    //Run setiap mulai test, satu kali saja paling awal
    before(async function (){
        driver = await new Builder().forBrowser(browser).setFirefoxOptions(options).build();
    });
    
    //Test Suite dimulai dengan apa, setiap melakukan tes
    beforeEach(async function (){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
    });

    //Assertion atau validasi
    it('Checkout successfully and verify Complete Page', async function (){
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products')
    
        // Step 1: Tambahkan 1 item ke cart
        let productName = product;
        await dashboardPage.addItemToCart(productName);
        
        // Step 2: Validasi Cart icon menunjukkan jumlah item yang benar
        const itemCount = await dashboardPage.getCartItemCount();
        assert.strictEqual(itemCount, '1', 'Cart item count should be 1')

        // Step 3: Click icon Cart Page
        await dashboardPage.openCart();

        //Step 4: Validasi Cart Page
        const cartPage = new CartPage(driver);
        const titleCartPage = await cartPage.isOnYourCart();
        assert.strictEqual(titleCartPage, 'Your Cart', 'Expected title page to be Your Cart')

        // Step 5: Validasi item produk yang berada di Cart Page
        const isItemAdded = await cartPage.getCartItemByName(productName);
        assert.strictEqual(isItemAdded, product, 'Expected Product title to be Sauce Labs Bike Light')
        
        // Step 6: Click Checkout di Cart Page 
        await cartPage.btnCheckout();
    
        //Step 7: Validasi Checkout: Your Information Page
        const checkoutPage = new CheckoutPage(driver);
        const titleCheckoutPage = await checkoutPage.isOnCheckoutPage();
        assert.strictEqual(titleCheckoutPage, 'Checkout: Your Information', 'Expected page title to be Checkout: Your Information')

        //Step 8: Input Your Information
        await checkoutPage.yourInformation(firstName, lastName, zip);

        //Step 9: Validasi Overview Page dan Item Product
        const overviewPage = new OverviewPage(driver);
        const titlePage = await overviewPage.isOnOverview();
        assert.strictEqual(titlePage, 'Checkout: Overview', 'Expected page title to be Checkout: Overview')
        
        // Step 10: Validasi item produk yang berada di Overview Page
        const isOverviewItem = await overviewPage.getOverviewItemByName(productName);
        assert.strictEqual(isOverviewItem, product, 'Expected Product title to be Sauce Labs Bike Light')
        
        //Step 11: Validasi Complete Page and Thanks Text
        const completePage = new CompletePage(driver);
        const isComplete = await completePage.isOnCompletePage();
        assert.strictEqual(isComplete, 'Checkout: Complete!', 'Expected Page title to be Checkout: Complete!')
        const isThanks = await completePage.isOnThaksDisplay();
        assert.strictEqual(isThanks, 'Thank you for your order!', 'Expected Text title to be Thank you for your order!')
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