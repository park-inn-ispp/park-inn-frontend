jest.setTimeout(100000);

const {Builder, By, Key, until} = require('selenium-webdriver');
let driver = new Builder().forBrowser('firefox').build();


test('Test positivo de aceptar reserva positiva', async () => {
    
    
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
        await driver.sleep(1000);
        await driver.get('http://localhost:3000/');
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[1]/a')));
       

        await driver.wait(until.elementLocated(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[2]/a')));
        await driver.findElement(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[2]/a')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[3]/div/div/div/div/div[2]/div/a[2]')));
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/div/div/div/div[2]/div/a[2]')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[3]/div/table/tbody/tr[4]/td[7]/button')));
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/table/tbody/tr[4]/td[7]/button')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/table/tbody/tr[4]/td[8]/a')).click();

        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/p[2]')).getText().then(result=>expect(result).toEqual("cancelada"))

    }   
    
    finally {
        await driver.quit();
    }

})