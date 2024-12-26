const { Builder, By, Key, until, Browser } = require("selenium-webdriver");

async function exampleTest() {
  // Membuat koneksi dengan Browser Driver
  let driver = await new Builder().forBrowser("chrome").build();

  //Exception handling & Conclusion
  try {
    //Buka URL di browser
    await driver.get("http://www.google.com");

    //Mencari di serach box
    let searchBox = await driver.findElement(By.name("q"));

    //Simulasikan user behavior typing "Hello Word"
    await searchBox.sendKeys("Hello World", Key.RETURN);
    await driver.wait(until.elementLocated(By.id("result-stats", 10000)));

    let tittle = await driver.getTitle();
    console.log(`Page Title is: ${tittle}`);
  } finally {
    //Tutup Browser
    await driver.quit();
  }
}

console.log(2 + 2);
exampleTest();
