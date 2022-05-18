jest.setTimeout(100000);

const {Builder, By, Keys, until} = require('selenium-webdriver');

let driver;

beforeEach(async () => {
    driver = new Builder().forBrowser('firefox').build();
    await driver.get('http://localhost:3000/login');
    await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')));
    await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')).sendKeys('paco@gmail.com');
    await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[2]')).sendKeys('Admin1234');
    await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[3]/button')).click();
    await driver.sleep(500);
});

afterEach(async () => {
    await driver.quit();
});

test('Test de datos al reservar', async () => {
    try{       
        await driver.get('http://localhost:3000/reservas/plaza/4');
   
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[6]/a')));              
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[6]/a')).click();
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/div[5]/div[2]/div[2]/div/div/div')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/div[5]/div[2]/div[2]/div/div/div')).getText()
        .then(result=>expect(result).toEqual('No Disponible'));

    } catch (err) {
        console.log(err);
    }
});

test('Test positivo de aceptar reserva', async () => {  
    try{
        await driver.get('http://localhost:3000/');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[2]/div/ul/li[2]/a')));
        await driver.findElement(By.xpath('/html/body/div/div/div[2]/div/ul/li[2]/a')).click();
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div[2]/div/a/div/a[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div[2]/div/a/div/a[2]')).click();
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/table/tbody/tr[1]/td[6]/div/button[1]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/table/tbody/tr[1]/td[6]/div/button[1]')).click();
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/table/tbody/tr[1]/td[7]/a')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/table/tbody/tr[1]/td[7]/a')).click();
        
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[1]/div')));
        await driver.sleep(2000);
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[1]/div')).getText()
        .then(result=>expect(result).toEqual("aceptada"));

    } catch (err) {
        console.log(err);
    }

});

test('Test positivo de rechazar reserva', async () => { 
    try{
        await driver.get('http://localhost:3000/');
        await driver.wait(until.elementLocated(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[2]/a')));
        await driver.findElement(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[2]/a')).click();
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div[2]/div/a/div/a[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div[2]/div/a/div/a[2]')).click();
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/table/tbody/tr[2]/td[6]/div/button[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/table/tbody/tr[2]/td[6]/div/button[2]')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[3]/div/table/tbody/tr[2]/td[7]/a')));
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/table/tbody/tr[2]/td[7]/a')).click();

        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[1]/div')));
        await driver.sleep(2000);
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[1]/div')).getText()
        .then(result=>expect(result).toEqual("rechazada"));

    } catch (err) {
        console.log(err);
    }

});
