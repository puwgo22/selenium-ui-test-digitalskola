const { Builder, By, Key, until, Browser } = require ('selenium-webdriver');
const assert = require('assert');

async function sauceDemoTest() {
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

        //Memastikan judul item yang akan ditambahkan ke cart 'Sauce Labs Bolt T-Shirt'
        let itemTShirt = await driver.findElement(By.xpath("//div[.='Sauce Labs Bolt T-Shirt']")).getText();
        assert.strictEqual(itemTShirt.includes('Sauce Labs Bolt T-Shirt'), true, "Item Product is not include 'Sauce Labs Bolt T-Shirt'")
        
        //Memastikan image item yang akan ditambahkan ke cart 'Sauce Labs Bolt T-Shirt'
        let imgTShirt = await driver.findElement(By.xpath("//img[@alt='Sauce Labs Bolt T-Shirt']"))
        assert.strictEqual(await menuButton.isDisplayed(), true, "Image Product T-Shirt is not available")
        
        //Memastikan desc item yang akan ditambahkan ke cart 'Sauce Labs Bolt T-Shirt'
        let descTShirt = await driver.findElement(By.xpath("//div[@class='inventory_list']//div[@class='inventory_item_label']/div[contains(.,'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Ap')]")).getText();
        assert.strictEqual(descTShirt.includes('Get your testing superhero on with the Sauce Labs bolt T-shirt.'), true, "Describe Product T-Shirt is not available")

        //Memastikan price item yang akan ditambahkan ke cart 'Sauce Labs Bolt T-Shirt'
        let priceTShirt = await driver.findElement(By.xpath("//div[@class='inventory_list']/div[3]//div[@class='inventory_item_price']")).getText();
        assert.strictEqual(priceTShirt.includes('$15.99'), true, "Price Product T-Shirt is not available")
        
        //Click button add to cart
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']")).click(); 

        //Memastikan Cart item sudah bertambah
        let shopCart = await driver.findElement(By.xpath("//a[.='1']"));
        assert.strictEqual(await shopCart.isDisplayed(), true, "Item Product T-Shirt is not added to cart")

        //Click shopcart
        await driver.findElement(By.xpath("//a[.='1']")).click();
        
        //Memastikan Cart item sudah bertambah di halaman Your cart
        let myCart = await driver.findElement(By.xpath("//div[@class='inventory_item_name']")).getText();
        assert.strictEqual(myCart.includes('Sauce Labs Bolt T-Shirt'), true, "Item Product is not include 'Sauce Labs Bolt T-Shirt'")

        //Memastikan Qty item sudah sesuai di halaman Your cart
        let qtyCart = await driver.findElement(By.xpath("//div[@class='inventory_item_price']")).getText();
        assert.strictEqual(qtyCart.includes('1'), true, "Quantity Product is not include '1'")

    } finally {
        await driver.quit()
    }
}

sauceDemoTest()