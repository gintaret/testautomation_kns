const { test, expect } = require('@playwright/test');
const {CalculatorStartPage} = require('../homework-pages/calculatorStartPage')
const {CalculatorResultsPage} = require('../homework-pages/calculatorResultsPage');

test.describe('Calculator test suite', () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    startPage = new CalculatorStartPage(page);
    resultsPage = new CalculatorResultsPage(page);
  });

  test.beforeEach(async () => {
    await startPage.goto();
  });


  const buildsSumInt = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsSumInt.forEach(buildSumInt => {
    test(`${buildSumInt} build to check if calculating sum of integers`, async () => {
      await startPage.selectBuild(buildSumInt);
      await startPage.fillInFields('1', '2');
      await startPage.selectOperationAndCalculate('Add');
      const result = await resultsPage.getResult();
      expect(result).toEqual('3');
    });
  });

  const buildsSumPositive = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsSumPositive.forEach(buildSumPositive => {
    test.only(`${buildSumPositive} build to check if calculating sum of real positive numbers`, async () => {
      await startPage.selectBuild(buildSumPositive);
      await startPage.fillInFields('0.00000001', '0.00000001');
      await startPage.selectOperationAndCalculate('Add');
      const result = await resultsPage.getResult();
      expect(result).toEqual('2e-8');
    });
  });

  const buildsSumOnlyInt = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsSumOnlyInt.forEach(buildSumOnlyInt => {
    test(`${buildSumOnlyInt} build to check if calculating sum when result must be integer`, async () => {
      await startPage.selectBuild(buildSumOnlyInt);
      await startPage.fillInFields('1.2', '2.7');
      await startPage.selectOperationAndCalculate('Add');
      await page.click('#integerSelect');
      const result = await resultsPage.getResult();
      expect(result).toEqual('3');
    });
  });

  const buildsSumNegative = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsSumNegative.forEach(buildSumNegative => {
    test.only(`${buildSumNegative} build to check if calculating sum of negative real numbers`, async () => {
      await startPage.selectBuild(buildSumNegative);
      await startPage.fillInFields('-0.0000001', '-0.0000001');
      await startPage.selectOperationAndCalculate('Add');
      const result = await resultsPage.getResult();
      expect(result).toEqual('-2e-7');
    });
  });

  const buildsSumComma1 = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsSumComma1.forEach(buildSumComma1 => {
    test(`${buildSumComma1} build to check when number 1 is with comma, then not summed up`, async () => {
      await startPage.selectBuild(buildSumComma1);
      await startPage.fillInFields('2,5', '2');
      await startPage.selectOperationAndCalculate('Add');
      const errorMessage = await resultsPage.getErrorMessage();
      expect(errorMessage).toContain('Number 1 is not a number');
    });
  });

  const buildsSumComma2 = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsSumComma2.forEach(buildSumComma2 => {
    test(`${buildSumComma2} build to check when number 2 is with comma, then not summed up`, async () => {
      await startPage.selectBuild(buildSumComma2);
      await startPage.fillInFields('2', '2,5');
      await startPage.selectOperationAndCalculate('Add');
      const errorMessage = await resultsPage.getErrorMessage();
      expect(errorMessage).toContain('Number 2 is not a number');
    });
  });

  const buildsSumCommaBoth = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsSumCommaBoth.forEach(buildSumCommaBoth => {
    test(`${buildSumCommaBoth} build to check when both numbers are with comma, they are not summed up`, async () => {
      await startPage.selectBuild(buildSumCommaBoth);
      await startPage.fillInFields('1,5', '2,5');
      await startPage.selectOperationAndCalculate('Add');
      const errorMessage = await resultsPage.getErrorMessage();
      expect(errorMessage).toContain('Number 1 is not a number');
    });
  });

  const buildsSumEmpty = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsSumEmpty.forEach(buildSumEmpty => {
    test(`${buildSumEmpty} build to check when "First number" and "Second number" fields are empty and they are not summed up`, async () => {
      await startPage.selectBuild(buildSumEmpty);
      await startPage.fillInFields('', '');
      await startPage.selectOperationAndCalculate('Add');
      const result = await resultsPage.getResult();
      expect(result).toEqual('0');
    });
  });

  const buildsSubtractNegative = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsSubtractNegative.forEach(buildSubtractNegative => {
    test.only(`${buildSubtractNegative} build to check if negative real numbers subtract is calculating`, async () => {
      await startPage.selectBuild(buildSubtractNegative);
      await startPage.fillInFields('-0.0000001', '-0.0000001');
      await startPage.selectOperationAndCalculate('Subtract');
      const result = await resultsPage.getResult();
      expect(result).toEqual('0');
    });
  });

  const buildsSubtractPositive = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsSubtractPositive.forEach(buildSubtractPositive => {
    test.only(`${buildSubtractPositive} build to check if positive real numbers subtract is calculating`, async () => {
      await startPage.selectBuild(buildSubtractPositive);
      await startPage.fillInFields('0.00000001', '0.00000001');
      await startPage.selectOperationAndCalculate('Subtract');
      const result = await resultsPage.getResult();
      expect(result).toEqual('0');
    });
  });


  const buildsMultiply = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsMultiply.forEach(buildMultiply => {
    test(`${buildMultiply} build to check if not multiply when characters exceed the allowed number`, async () => {
      await startPage.selectBuild(buildMultiply);
      await startPage.fillInFields('12345678901', '10');
      await startPage.selectOperationAndCalculate('Multiply');
      const result = await resultsPage.getResult();
      expect(result).toEqual('12345678900');
    });
  });

  const buildsMultiplySymbols = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsMultiplySymbols.forEach(buildMultiplySymbols => {
    test.only(`${buildMultiplySymbols} build to check if not multiply when both numbers are symbols`, async () => {
      await startPage.selectBuild(buildMultiplySymbols);
      await startPage.fillInFields('<>', '<>');
      await startPage.selectOperationAndCalculate('Multiply');
      const errorMessage = await resultsPage.getErrorMessage();
      expect(errorMessage).toContain('Number 1 is not a number');
    });
  });

  const buildsDivideZero = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsDivideZero.forEach(buildDivideZero => {
    test(`${buildDivideZero} build to check if dividing by zero is not possible`, async () => {
      await startPage.selectBuild(buildDivideZero);
      await startPage.fillInFields('1', '0');
      await startPage.selectOperationAndCalculate('Divide');
      const errorMessage = await resultsPage.getErrorMessage();
      expect(errorMessage).toContain('Divide by zero error!');
    });
  });

  const buildsDivideLetters = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsDivideLetters.forEach(buildDivideLetters => {
    test(`${buildDivideLetters} build to check if letters dividing is not possible`, async () => {
      await startPage.selectBuild(buildDivideLetters);
      await startPage.fillInFields('a', 'b');
      await startPage.selectOperationAndCalculate('Divide');
      const errorMessage = await resultsPage.getErrorMessage();
      expect(errorMessage).toContain('Number 1 is not a number');
    });
  });

  const buildsConcatenate = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsConcatenate.forEach(buildConcatenate => {
    test(`${buildConcatenate} build to check if number with letter concatenating`, async () => {
      await startPage.selectBuild(buildConcatenate);
      await startPage.fillInFields('9', 'a');
      await startPage.selectOperationAndCalculate('Concatenate');
      const result = await resultsPage.getResult();
      expect(result).toEqual('9a');
    });
  });

  const buildsConcatenateCheckbox = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  buildsConcatenateCheckbox.forEach(buildConcatenateCheckbox => {
  test(`${buildConcatenateCheckbox} build to check if toggle "Integers only" is not visible when concatenating`, async () => {
      await startPage.selectBuild(buildConcatenateCheckbox);
      await page.click('#selectOperationDropdown');
      await page.selectOption('#selectOperationDropdown', { label: 'Concatenate'} );
      const isIntegerSelectionLabel = await resultsPage.getIntegerSelectionLabel();
      const isIntegerCheckbox = await resultsPage.getIntegerCheckbox();
      expect(isIntegerSelectionLabel).toBe(true);
      expect(isIntegerCheckbox).toBe(false);
    });
  });
});