
jest.setTimeout(100000);

const {Builder, By, Key, until} = require('selenium-webdriver');

test('Test de registro positivo', async () => {
    let driver = new Builder().forBrowser('firefox').build();
    try{
        await driver.get('http://localhost:3000/login');
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/a')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="name"]')).sendKeys("Luis Miguel");
        await driver.findElement(By.xpath('//*[@id="surname"]')).sendKeys("Bellido");
        await driver.findElement(By.xpath('//*[@id="phone"]')).sendKeys('645215797');
        await driver.findElement(By.xpath('//*[@id="email"]')).sendKeys('luibelzan4@outlook.com');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('Luismi1234');
        await driver.findElement(By.xpath('//*[@id="confirm"]')).sendKeys('Luismi1234');
        await driver.findElement(By.xpath('//*[@id="terms"]')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/button')).click();
        await driver.sleep(1000);

        driver.getCurrentUrl().then(result => 
            expect(result).toEqual('http://localhost:3000/login'))

    } finally {
        await driver.quit();
    }

})

test('Test de registro negativo', async () => {
    let driver = new Builder().forBrowser('firefox').build();
    try{
        await driver.get('http://localhost:3000/login');
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/a')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="name"]')).sendKeys("Stable");
        await driver.findElement(By.xpath('//*[@id="surname"]')).sendKeys("Won");
        await driver.findElement(By.xpath('//*[@id="phone"]')).sendKeys('645215795');
        await driver.findElement(By.xpath('//*[@id="email"]')).sendKeys('admin@admin.com');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('Luismi1234');
        await driver.findElement(By.xpath('//*[@id="confirm"]')).sendKeys('Luismi1234');
        await driver.findElement(By.xpath('//*[@id="terms"]')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/form/button')).click();
        await driver.sleep(1000);

        driver.getCurrentUrl().then(result => 
            expect(result).toEqual('http://localhost:3000/register'))

    } finally {
        await driver.quit();
    }

})
