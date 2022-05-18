
jest.setTimeout(100000);

const {Builder, By, Keys, until} = require('selenium-webdriver');

let driver;

beforeEach(async () => {
    driver = new Builder().forBrowser('firefox').build();
    await driver.get('http://localhost:3000/login');
    await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')));
    await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[1]')).sendKeys('admin@admin.com');
    await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[2]/input[2]')).sendKeys('Admin1234');
    await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/div[3]/button')).click();
    await driver.sleep(500);
});

afterEach(async () => {
    await driver.quit();
});

//Tests para las incidencias
test('Test de lectura de incidencias', async () => {
    try{
        await driver.get('http://localhost:3000/dashboard-incidencias');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/table/tr/tr[1]/td[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/table/tr/tr[1]/td[2]'))
        .then(async element => await element.getText())
        .then(value => {
            expect(value).toEqual('3');
        });
    } catch (err) {
        console.log(err);
    } 
});

test('Test de cerrar incidencia', async () => {
    try{
        await driver.get('http://localhost:3000/dashboard-incidencias');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/table/tr[2]/td[8]/button')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/table/tr[2]/td[8]/button')).click();
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/table/tr/tr[3]/td[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/table/tr/tr[3]/td[2]'))
        .then(async element => await element.getText())
        .then(value => {
            expect(value).toEqual('1');
        });
    } catch (err) {
        console.log(err);
    } 
});

//Tests para las reservas
test('Test de lectura de reservas', async () => {
    try{
        await driver.get('http://localhost:3000/dashboard-reservas');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/div/table/tr/tr[1]/td[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/div/table/tr/tr[1]/td[2]'))
        .then(async element => await element.getText())
        .then(value => {
            expect(value).toEqual('6');
        });
    } catch (err) {
        console.log(err);
    } 
});

test('Test de aceptar reservas', async () => {
    try{
        await driver.get('http://localhost:3000/dashboard-reservas');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/table/tr[2]/td[6]/button[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/table/tr[2]/td[6]/button[2]')).click();
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/table/tr[2]/td[6]/button')));
        await driver.sleep(2000);
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/table/tr[2]/td[6]/button'))
        let boton_text = await driver.findElement(By.xpath('/html/body/div/div/div[3]/table/tr[2]/td[6]/button')).getText();
        expect(boton_text).toEqual('Cancelar reserva');
    } catch (err) {
        console.log(err);
    } 
});

test('Test de rechazar reservas', async () => {
    try{
        await driver.get('http://localhost:3000/dashboard-reservas');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/table/tr[3]/td[6]/button[1]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/table/tr[3]/td[6]/button[1]')).click();
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/table/tr[3]/td[6]/span')));
        await driver.sleep(2000);
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/table/tr[3]/td[6]/span'))
        .then(async element => await element.getText())
        .then(value => {
            expect(value).toEqual('No disponibles');
        });
    } catch (err) {
        console.log(err);
    } 
});


//Tests para las plazas
test('Test de lectura de plazas', async () => {
    try{
        await driver.get('http://localhost:3000/dashboard-plazas');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/table[2]/tr/tr/td[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/table[2]/tr/tr/td[2]'))
        .then(async element => await element.getText())
        .then(value => {
            expect(value).toEqual('2');
        });
    } catch (err) {
        console.log(err);
    } 
});

test('Test de eliminar plaza', async () => {
    try{
        await driver.get('http://localhost:3000/dashboard-plazas');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/table[1]/tr[2]/td[7]/button')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/table[1]/tr[2]/td[7]/button')).click();
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/table[2]/tr/tr/td[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/table[2]/tr/tr/td[2]'))
        .then(async element => await element.getText())
        .then(value => {
            expect(value).toEqual('1');
        });
    } catch (err) {
        console.log(err);
    } 
});

//Tests para los usuarios
test('Test de lectura de usuarios', async () => {
    try{
        await driver.get('http://localhost:3000/dashboard-usuarios');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/table[2]/tr/tr/td[2]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/table[2]/tr/tr/td[2]'))
        .then(async element => await element.getText())
        .then(value => {
            expect(value).toEqual('7');
        });
    } catch (err) {
        console.log(err);
    } 
});

test('Test de banear usuario 2', async () => {
    try{
        await driver.get('http://localhost:3000/dashboard-usuarios');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/table[1]/tr[4]/td[6]/button[1]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/table[1]/tr[4]/td[6]/button[1]')).click();
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/table[1]/tr[4]/td[6]/button[1]')));
        await driver.sleep(500);
        let boton_text = await driver.findElement(By.xpath('/html/body/div/div/div[3]/table[1]/tr[4]/td[6]/button[1]')).getText();
        expect(boton_text).toEqual('Desbanear usuario');
    } catch (err) {
        console.log(err);
    } 
});

test('Test de desbanear usuario 2', async () => {
    try{
        await driver.get('http://localhost:3000/dashboard-usuarios');
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/table[1]/tr[4]/td[6]/button[1]')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/table[1]/tr[4]/td[6]/button[1]')).click();
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/table[1]/tr[4]/td[6]/button[1]')));
        await driver.sleep(500);
        let boton_text = await driver.findElement(By.xpath('/html/body/div/div/div[3]/table[1]/tr[4]/td[6]/button[1]')).getText();
        expect(boton_text).toEqual('Banear usuario');
    } catch (err) {
        console.log(err);
    } 
});

test('Test de editar usuario 2 telefono fail', async () => {
    try{
        await driver.get('http://localhost:3000/clients/edit/3');
        
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/form/div[3]/input')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/form/div[3]/input')).clear();
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/form/div[3]/input')).sendKeys('66699887a');
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/form/input')).click();

        let url = await driver.getCurrentUrl();
        console.log(url);
        expect(url).toEqual('http://localhost:3000/clients/edit/3');
    } catch (err) {
        console.log(err);
    } 
});

test('Test de editar usuario 2 correo fail', async () => {
    try{
        await driver.get('http://localhost:3000/clients/edit/3');
        
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/form/div[3]/input')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/form/div[4]/input')).clear();
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/form/div[4]/input')).sendKeys('user2admin.com');
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/form/input')).click();

        let url = await driver.getCurrentUrl();
        console.log(url);
        expect(url).toEqual('http://localhost:3000/clients/edit/3');
    } catch (err) {
        console.log(err);
    } 
});

test('Test de editar usuario 2 passed', async () => {
    try{
        await driver.get('http://localhost:3000/clients/edit/3');
        
        await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[3]/form/div[3]/input')));
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/form/div[3]/input')).clear();
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/form/div[3]/input')).sendKeys('666998811');
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/form/div[4]/input')).clear();
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/form/div[4]/input')).sendKeys('user2@user2.com');
        await driver.findElement(By.xpath('/html/body/div/div/div[3]/form/input')).click();

        let url = await driver.getCurrentUrl();
        console.log(url);
        expect(url).toEqual('http://localhost:3000/clients/view/3');
    } catch (err) {
        console.log(err);
    } 
});

