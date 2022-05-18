jest.setTimeout(100000);

const {Builder, By, Key, until} = require('selenium-webdriver');
const { DriverService } = require('selenium-webdriver/remote');

test('Test de ver pefil de usuario positivo', async () => {
    let driver = new Builder().forBrowser('firefox').build();
    try{
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')).sendKeys('noadmin@admin.com');
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

        await driver.findElement(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[4]/div/button/div')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[4]/div/nav/ul/li[1]/a')).click();
        await driver.sleep(1000);
        driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/h1')).getText().then(result =>
        expect(result).toContain('Consultar'))
        //console.log(result);
       
    } finally{
        await driver.quit();
    }
})


test('Test de ver pefil de usuario negativo', async () => {
    let driver = new Builder().forBrowser('firefox').build();
    try{
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')).sendKeys('noexiste@gmail.com');
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[2]')).sendKeys('Admin1234');
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[3]/button')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[3]/button')).click();
        await driver.sleep(1000);
        await driver.get('http://localhost:3000/');
        await driver.sleep(1000);

        driver.findElement(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[4]/div/button/div')).then(result =>
        expect(result).toBeNull)
       
    } finally{
        await driver.quit();
    }
})

test('Test editar pefil de usuario positivo', async () => {
    let driver = new Builder().forBrowser('firefox').build();
    try{
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')).sendKeys('noadmin@admin.com');
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

        await driver.findElement(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[4]/div/button/div')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[4]/div/nav/ul/li[1]/a')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/input')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/form/div[1]/input')).sendKeys(' editado');
        //await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/form/div[3]/input')).sendKeys(Key.CONTROL, 'a');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/form/div[3]/input')).sendKeys(Key.BACK_SPACE);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/form/div[3]/input')).sendKeys('4');
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/form/input')).click();
        await driver.sleep(1000);
        driver.getCurrentUrl().then(result =>
            expect(result).toContain('http://localhost:3000/clients/view'));
        //console.log(result);
       
    } finally{
        await driver.quit();
    }
})


test('Test editar pefil de usuario negativo', async () => {
    let driver = new Builder().forBrowser('firefox').build();
    try{
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')).sendKeys('noadmin2@admin.com');
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

        await driver.findElement(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[4]/div/button/div')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="navbar-parkinn"]/div/ul/li[4]/div/nav/ul/li[1]/a')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/input')).click();
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/form/div[4]/input')).sendKeys(Key.CONTROL, 'a');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/form/div[4]/input')).sendKeys(Key.BACK_SPACE);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/form/div[4]/input')).sendKeys('admin@admin.com');
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/form/input')).click();
        await driver.sleep(1000);
        driver.getCurrentUrl().then(result =>
            expect(result).toContain('http://localhost:3000/clients/edit'));
        //console.log(result);
       
    } finally{
        await driver.quit();
    }
})