const { Builder } = require("selenium-webdriver");
const LoginPage = require('./WebComponent/LoginPage');
const DashboardPage = require("./WebComponent/DashboardPage");
const CartPage = require("./WebComponent/CartPage");
const assert = require('assert');

const fs = require('fs');
const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe("Test Case 3 - Add Item to Cart", function () {
    this.timeout(50000);
    let driver;

    //Run setiap mulai test, satu kali saja paling awal
    before(async function (){
        driver = await new Builder().forBrowser('chrome').build();
    });
    
    //Test Suite dimulai dengan apa, setiap melakukan tes
    beforeEach(async function (){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    //Assertion atau validasi
    it('Login successfully and verify dashboard', async function (){
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products')
    });

    it("Should add item to cart and validate it is added", async function () {
        // Step 1: Tambahkan 1 item ke cart
        const dashboardPage = new DashboardPage(driver);
        let productName = 'Sauce Labs Bike Light';
        await dashboardPage.addItemToCart(productName);
        
        // Step 2: Validasi Cart icon menunjukkan jumlah item yang benar
        const itemCount = await dashboardPage.getCartItemCount();
        assert.strictEqual(itemCount, '1', 'Cart item count should be 1')

        // Step 3: Click Cart Page
        await dashboardPage.openCart();

        // Step 4: Validasi item produk yang berada di Cart Page
        const cartPage = new CartPage(driver);
        const isItemAdded = await cartPage.getCartItemByName(productName);
        assert.strictEqual(isItemAdded, 'Sauce Labs Bike Light', 'Expected Product title to be Sauce Labs Bike Light')
    });

    //Ambil screenshot setelah tes selesai
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    // Bersihkan data setelah semua tes selesai
    after(async function () {
        await driver.quit();
    });
});
