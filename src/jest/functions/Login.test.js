
jest.setTimeout(100000);

const {Builder, By, Key, until} = require('selenium-webdriver');


test('Test de inicio de sesión positivo', async () => {
    let driver = new Builder().forBrowser('firefox').build();
    try{
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')).sendKeys('admin@admin.com');
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[2]')).sendKeys('Admin1234');
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[3]/button')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[3]/button')).click();
        await driver.sleep(1000);
        await driver.get('http://localhost:3000/');
        await driver.wait(until.elementLocated(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[1]/a')));
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[1]/a')).click();
        await driver.sleep(1000);

        driver.getCurrentUrl().then(result => 
            expect(result).toEqual('http://localhost:3000/'))

    } finally {
        await driver.quit();
    }

})

test('Test de inicio de sesión negativo', async () => {
    let driver = new Builder().forBrowser('firefox').build();
    try{
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')).sendKeys('noexiste@gmail.com');
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[2]')).sendKeys('Marchena1234');
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[3]/button')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[3]/button')).click();
        await driver.sleep(1000);
        await driver.get('http://localhost:3000/');
        await driver.sleep(1000);

        driver.getCurrentUrl().then(result => 
            expect(result).toEqual('http://localhost:3000/login'))

    } finally {
        await driver.quit();
    }

})
