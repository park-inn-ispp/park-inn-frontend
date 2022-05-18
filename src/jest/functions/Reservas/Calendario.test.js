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
   
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div[3]/p[5]/button')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div[3]/p[5]/button')).click();
 
        driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/div[5]/div[2]/div[2]/div/div/div')).getText().then(result=>expect(result).toEqual('No Disponible'));

        
 
   
    } finally {
        await driver.quit();
    }
})
