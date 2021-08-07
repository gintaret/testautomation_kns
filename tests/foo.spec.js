const { test, expect } = require('@playwright/test');
const { DuckStartPage } = require('../pages/duckStartPage');
const { DuckResultsPage } = require('../pages/duckResultsPage');

test.describe('Duck duck test suite', () => {
    let page;
    test.beforeAll(async ({ browser }) => { //pries visus testus prisiskirsime is browserio page'ą, su kuriuo dirbs visi musu testai
        page = await browser.newPage();
        startPage = new DuckStartPage(page);
        resultsPage = new DuckResultsPage(page);
    });
test.beforeEach(async () => {
  await startPage.goto();
});

test('Checks that duckduckGo page can be opened', async () => {
  // await page.goto('https://duckduckgo.com');
  const isLogoVisible = await page.isVisible('#logo_homepage_link');
  expect(isLogoVisible).toBe(true);
});

test('Checks that results page opens and result are correct', async () => {
    await startPage.initiateSearch('Test');
    // await page.fill('#search_form_input_homepage','Test');
    // await page.click('#search_button_homepage');
    const result1TextContent = await page.textContent('#r1-0');
    // console.log(result1TextContent);
    expect(result1TextContent).toContain('Test');
});

test('Checks that results page opens and result are correct 2', async () => {
    await startPage.initiateSearch('Test');
    const result2TextContent = await page.textContent('#r1-0');
    // console.log(result2TextContent);
    expect(result2TextContent).toContain('Test');
});

test('Inspector demo', async () => {     
  await page.fill('#search_form_input_homepage', 'Test');
  await Promise.all([
      page.waitForNavigation(/*{ url: 'https://start.duckduckgo.com/?q=Test&t=h_&ia=web' }*/),
      page.click('input:has-text("S")')
  ]);
  const rezultatasTextContent = await page.textContent('#r1-0');
  expect(rezultatasTextContent).toContain('Test');
});


test('Search MS word cheatsheets 2', async () => {
  await startPage.initiateSearch('microsoft word cheat sheet');
  const resultTextContent = await page.textContent('a.zcm__link.js-zci-link.js-zci-link--cheat_sheets.is-active');
  const resultTextContent2 = await page.textContent('h3.c-base__title');
  expect(resultTextContent).toContain('Cheat Sheet');
  expect(resultTextContent2).toContain('Microsoft Word 2010');
});

test('Shortened Wikipedia link 1', async () => {
  // await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.com');
  // await page.click('#search_button_homepage');
  await startPage.initiateSearch('shorten www.wikipedia.com');
  const shortUrl = await page.inputValue('#shorten-url'); //paima urlą
  await page.goto(shortUrl);
  //const isWikipediaBodyVisible = await page.isVisible('#www-wikipedia-org');
  //expect(isWikipediaBodyVisible).toBe(true);
  const title = await page.title();
  expect(title).toBe("Wikipedia"); //page title (tab)
});

test('Shortened Wikipedia link 2', async () => {
  await startPage.initiateSearch('shorten www.wikipedia.com');
  const shortenerUrl = await page.getAttribute('#shorten-url','value'); //pasiimame urla
  await page.goto(shortenerUrl);
  const webPage = page.url();
  expect(webPage).toBe('https://www.wikipedia.org/');
});

test('Shortened Wikipedia link 3', async () => {
  // await startPage.initiateSearch('shorten www.wikipedia.org');
  await startPage.initiateSearch('shorten www.wikipedia.com');
  const shortenUrl = await page.inputValue('#shorten-url');
  await page.goto(shortenUrl);
  const webPage = page.url();
  expect(webPage).toBe('https://www.wikipedia.org/');
});

test('Check that url shortener works 4', async () => {
  await startPage.initiateSearch('shorten www.wikipedia.com');
  const shortenedUrl2 = await page.inputValue('#shorten-url');
  //const shortenedUrl2 = await page.getAttribute('#shorten-url', 'value');
  await page.goto(shortenedUrl2);
  const url = page.url();
  expect(url).toBe('https://www.wikipedia.org/');
});

test('panda', async () => {
    await page.waitForSelector("#search_form_input_homepage");
    await startPage.initiateSearch('intitle:panda');
    const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
    console.log(results);
    results.forEach(result => {
    expect(result.toLowerCase()).toContain("panda");
  });
});

//Enter password 8 -> generates random password, lenght - 8 symbols, min 8 symbols and max 64 symbols
  const passwordsLengths = ['8', '16', '64'];
  passwordsLengths.forEach(passwordLength => {
  test(`Generate ${passwordLength} characters long password 1`, async () => {
      await startPage.initiateSearch("password " + passwordLength);
      const generatedPassword = await resultsPage.getGeneratedPassword();
      expect(generatedPassword.length).toEqual(+passwordLength) //pliusas pavercia i stringa, nes lyginame inta su stringu
    });
  });

  const passwordsLengths2 = [8, 16, 64];
  passwordsLengths2.forEach(passwordLength => {
  test(`Generate ${passwordLength} characters long password 2`, async () => {
      await startPage.initiateSearch("password " + passwordLength);
      const generatedPassword2 = await resultsPage.getGeneratedPassword();
      expect(generatedPassword2.length).toEqual(passwordLength) //pliuso nereikia, nes array suraseme intus
    });
  });

  const passwordsLengths3 = ['7', '65'];
    passwordsLengths3.forEach(passwordLength => {
    test(`Doesn't generate ${passwordLength} characters long password`, async () => {
        await page.waitForSelector("#search_form_input_homepage");
        await page.fill('#search_form_input_homepage', ("password " + passwordLength));
        await page.click("#search_button_homepage");
        const isPasswordContentVisible = await page.isVisible(".c-base__title");
        expect(isPasswordContentVisible).toBe(false);
    });
  });
});