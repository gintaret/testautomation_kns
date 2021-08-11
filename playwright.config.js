// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    use: {
      screenshot: 'on',
      headless: false,
      viewport: { width: 1280, height: 720 },
      launchOptions: {
          slowMo: 150,
      },
    },
  };
  
  module.exports = config;
 