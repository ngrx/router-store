require('core-js');
require('zone.js/dist/zone.js');
require('zone.js/dist/long-stack-trace-zone.js');
require('zone.js/dist/proxy-zone');
require('zone.js/dist/sync-test.js');
require('zone.js/dist/async-test.js');
require('zone.js/dist/jasmine-patch.js');
require('zone.js/dist/fake-async-test.js');

Error.stackTraceLimit = Infinity;

require('reflect-metadata');

const testContext = require.context('./spec', true, /\.spec\.ts/);
testContext.keys().forEach(testContext);

const testing = require('@angular/core/testing');
const browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(
  browser.BrowserDynamicTestingModule,
  browser.platformBrowserDynamicTesting()
);
