function doGet(e) {
  const template = HtmlService.createTemplateFromFile('index');
  template.serverMode = (e && e.parameter && e.parameter.mode) ? e.parameter.mode : '';

  return template.evaluate()
    .setTitle('Commons IDE — P1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
