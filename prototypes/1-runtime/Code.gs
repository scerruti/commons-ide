function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Commons IDE — P1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
