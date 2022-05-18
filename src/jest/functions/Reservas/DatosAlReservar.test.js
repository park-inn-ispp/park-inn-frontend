jest.setTimeout(100000);
 
const {Builder, By, Key, until} = require('selenium-webdriver');
 
let driver = new Builder().forBrowser('firefox').build();
 
test('Test de datos al reservar', async () => {
    try{
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')).sendKeys('paco@gmail.com');
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[2]')).sendKeys('Admin1234');
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[3]/button')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[3]/button')).click();
               
        await driver.get('http://localhost:3000/reservas/plaza/4');
        await driver.sleep(1000);
   
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[1]/div')));
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[3]/p[1]')).getText().then(result=>expect(result).toEqual("Paco"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[3]/p[2]')).getText().then(result=>expect(result).toEqual("Calle Tejares 3"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[3]/p[3]')).getText().then(result=>expect(result).toEqual("4.5 m"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[3]/p[4]')).getText().then(result=>expect(result).toEqual("2.5 m"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/form/div[4]/p[1]')).getText().then(result=>expect(result).toEqual("2.5 €"))
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/form/div[4]/p[2]')).getText().then(result=>expect(result).toEqual("45 €"))
 
 
   
    } finally {
        await driver.quit();
    }
})
