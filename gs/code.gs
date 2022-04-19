function doGet(e) {
  return HtmlService.createTemplateFromFile('index').evaluate()
    .setTitle('Google App Script CRUD')
    .addMetaTag('viewport', 'width=device-width , initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('CRUD Form')
    .addItem('Open Form', 'showDialog')
    .addToUi();
}

function showDialog() {
  let template = HtmlService.createTemplateFromFile('index').evaluate()
    .setWidth(1024)
    .setHeight(600)
    .addMetaTag('viewport', 'width=device-width , initial-scale=1');
  SpreadsheetApp.getUi().showModalDialog(template, 'Google App Script CRUD');
}

function getdata() {
  let products = SpreadsheetApp.getActive().getSheetByName('products').getDataRange().getDisplayValues()
    .filter(row => row[0] != 'id')
    .map(row => { return { 'id': row[0], 'name': row[1], 'price': row[2] }; });
  return products;
}

function getRow(id) {
  let row = SpreadsheetApp.getActive().getSheetByName('products').getDataRange().getDisplayValues()
    .findIndex(row => row[0] == id) + 1;
  return row;
}

function saveData(id, name, price) {
  let row = getRow(id);
  if (row == 0) SpreadsheetApp.getActive().getSheetByName('products').appendRow([id, name, price]);
  else SpreadsheetApp.getActive().getSheetByName('products').getRange(row, 2, 1, 2).setValues([[name, price]]);
  return getdata();
}

function removeData(id) {
  SpreadsheetApp.getActive().getSheetByName('products').deleteRow(getRow(id));
  return getdata();
}

function myFunction() {
  var userProperties = PropertiesService.getUserProperties();
  var nickname = userProperties.getProperty('nickname');
  Logger.log(nickname);
}