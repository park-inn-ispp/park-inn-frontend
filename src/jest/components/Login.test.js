/**
 * Dependency Modules
 */
 var assert = require("assert").strict;
 var webdriver = require("selenium-webdriver");
 require("geckodriver");// Application Server
 const serverUri = "http://localhost:3000/#";
 const appTitle = "Park-Inn";

 var browser = new webdriver.Builder()
  .usingServer()
  .withCapabilities({ browserName: "firefox" })
  .build();

 function logTitle() {
  return new Promise((resolve, reject) => {
   browser.getTitle().then(function(title) {
    resolve(title);
   });
  });
 }
 
describe("Home Page", function() {
  it("Should load the home page and get title", function() {
   return new Promise((resolve, reject) => {
    browser
     .get(serverUri)
     .then(logTitle)
     .then(title => {
      assert.strictEqual(title, appTitle);
      resolve();
     })
     .catch(err => reject(err));
   });
  });

describe("Log In", function(){
  it("Should log in into the page", function(){
    
  })
})

  afterAll(function() {
   // End of test use this.
   browser.quit();
  });
 });