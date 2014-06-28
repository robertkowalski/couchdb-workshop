exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Spec patterns are relative to the location of this config.
  specs: [
    'test/protactor/*.js'
  ],

  allScriptsTimeout: 20000,

  capabilities: {
    'browserName': 'firefox'
  },

  framework: 'mocha',

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://127.0.0.1:9000'
};
