jest.setTimeout(100000);
 
const {Builder, By, Keys, until} = require('selenium-webdriver');
 
let driver = new Builder().forBrowser('firefox').build();


test('Test de detalles de reserva', async () => {
    try{
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')).sendKeys('juan@gmail.com');
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[2]')).sendKeys('Admin1234');
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[3]/button')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[3]/button')).click();
        await driver.sleep(1000);
        await driver.get('http://localhost:3000/');
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[1]/a')));

 
        await driver.get('http://localhost:3000/');
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[3]/a')));
        await driver.findElement(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[3]/a')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div/div[2]/div/div/div/a[2]')));
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div/div[1]/div/div/div/a[2]')).click();
        await driver.sleep(1000);
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/p[2]')).getText().then(result=>expect(result).toEqual("pendiente"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/p[5]')).getText().then(result=>expect(result).toEqual("Calle Tejares 3"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/p[8]')).getText().then(result=>expect(result).toEqual("50 €"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/p[11]')).getText().then(result=>expect(result).toEqual("200 €"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/p[14]')).getText().then(result=>expect(result).toEqual("2030-07-02"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/p[16]')).getText().then(result=>expect(result).toEqual("06:14:00"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/p[19]')).getText().then(result=>expect(result).toEqual("2030-07-03"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/p[21]')).getText().then(result=>expect(result).toEqual("06:14:00"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/p[24]')).getText().then(result=>expect(result).toEqual("2022-05-17"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/p[27]')).getText().then(result=>expect(result).toEqual("Paco"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/p[29]')).getText().then(result=>expect(result).toEqual("paco@gmail.com"))
        driver.getCurrentUrl().then(result =>expect(result).toEqual('http://localhost:3000/reservas/5'))
       
    } finally {
        await driver.quit();
    }
 
})
