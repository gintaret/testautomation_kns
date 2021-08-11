const { test, expect } = require('@playwright/test');
const {CalculatorStartPage} = require('../homework-pages/calculatorStartPage')
const {CalculatorResultsPage} = require('../homework-pages/calculatorResultsPage');
const prototype = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

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

  prototype.forEach(buildSumInt => {
    test(`${buildSumInt} build to check if calculating sum of integers`, async () => {
      // await startPage.actions(buildSumInt, '1', '2', 'Add');
      await startPage.selectBuild(buildSumInt);
      await startPage.fillInFields('1', '2');
      await startPage.selectOperationAndCalculate('Add');
      const result = await resultsPage.getResult();
      expect(result).toEqual('3');
    });
  });

  prototype.forEach(buildSumPositive => {
    test.only(`${buildSumPositive} build to check if calculating sum of real positive numbers`, async () => {
      await startPage.actions(buildSumPositive, '0.00000001', '0.00000001', 'Add');
      // await startPage.selectBuild(buildSumPositive);
      // await startPage.fillInFields('0.00000001', '0.00000001');
      // await startPage.selectOperationAndCalculate('Add');
      const result = await resultsPage.getResult();
      expect(result).toEqual('2e-8');
    });
  });

  prototype.forEach(buildSumOnlyInt => {
    test(`${buildSumOnlyInt} build to check if calculating sum when result must be integer`, async () => {
      await startPage.actions(buildSumOnlyInt, '1.2', '2.7', 'Add');
      await page.click('#integerSelect');
      const result = await resultsPage.getResult();
      expect(result).toEqual('3');
    });
  });

  prototype.forEach(buildSumNegative => {
    test.only(`${buildSumNegative} build to check if calculating sum of negative real numbers`, async () => {
      await startPage.actions(buildSumNegative, '-0.0000001', '-0.0000001', 'Add');
      const result = await resultsPage.getResult();
      expect(result).toEqual('-2e-7');
    });
  });

  prototype.forEach(buildSumComma1 => {
    test(`${buildSumComma1} build to check when number 1 is with comma, then not summed up`, async () => {
      await startPage.actions(buildSumComma1, '2,5', '2', 'Add');
      const errorMessage = await resultsPage.getErrorMessage();
      expect(errorMessage).toContain('Number 1 is not a number');
    });
  });

  prototype.forEach(buildSumComma2 => {
    test(`${buildSumComma2} build to check when number 2 is with comma, then not summed up`, async () => {
      await startPage.actions(buildSumComma2, '2', '2,5', 'Add');
      const errorMessage = await resultsPage.getErrorMessage();
      expect(errorMessage).toContain('Number 2 is not a number');
    });
  });

  prototype.forEach(buildSumCommaBoth => {
    test(`${buildSumCommaBoth} build to check when both numbers are with comma, they are not summed up`, async () => {
      await startPage.actions(buildSumCommaBoth, '1,5', '2,5', 'Add');
      const errorMessage = await resultsPage.getErrorMessage();
      expect(errorMessage).toContain('Number 1 is not a number');
    });
  });

  prototype.forEach(buildSumEmpty => {
    test(`${buildSumEmpty} build to check when "First number" and "Second number" fields are empty and they are not summed up`, async () => {
      await startPage.actions(buildSumEmpty, '', '', 'Add');
      const result = await resultsPage.getResult();
      expect(result).toEqual('0');
    });
  });

  prototype.forEach(buildSubtractNegative => {
    test.only(`${buildSubtractNegative} build to check if negative real numbers subtract is calculating`, async () => {
      await startPage.actions(buildSubtractNegative, '-0.0000001', '-0.0000002', 'Subtract');
      const result = await resultsPage.getResult();
      expect(result).toEqual('1e-7');
    });
  });

  prototype.forEach(buildSubtractPositive => {
    test.only(`${buildSubtractPositive} build to check if positive real numbers subtract is calculating`, async () => {
      await startPage.actions(buildSubtractPositive, '0.00000002', '0.00000001', 'Subtract');
      const result = await resultsPage.getResult();
      expect(result).toEqual('1e-8');
    });
  });

  prototype.forEach(buildMultiply => {
    test(`${buildMultiply} build to check if not multiply when characters exceed the allowed number`, async () => {
      await startPage.actions(buildMultiply, '12345678901', '10', 'Multiply');
      const result = await resultsPage.getResult();
      expect(result).toEqual('12345678900');
    });
  });

  prototype.forEach(buildMultiplySymbols => {
    test.only(`${buildMultiplySymbols} build to check if not multiply when both numbers are symbols`, async () => {
      await startPage.actions(buildMultiplySymbols, '<>', '<>', 'Multiply');
      const errorMessage = await resultsPage.getErrorMessage();
      expect(errorMessage).toContain('Number 1 is not a number');
    });
  });

  prototype.forEach(buildDivideZero => {
    test(`${buildDivideZero} build to check if dividing by zero is not possible`, async () => {
      await startPage.actions(buildDivideZero, '1', '0', 'Divide');
      const errorMessage = await resultsPage.getErrorMessage();
      expect(errorMessage).toContain('Divide by zero error!');
    });
  });

  prototype.forEach(buildDivideLetters => {
    test(`${buildDivideLetters} build to check if letters dividing is not possible`, async () => {
      await startPage.actions(buildDivideLetters, 'a', 'b', 'Divide');
      const errorMessage = await resultsPage.getErrorMessage();
      expect(errorMessage).toContain('Number 1 is not a number');
    });
  });

  prototype.forEach(buildConcatenate => {
    test(`${buildConcatenate} build to check if number with letter concatenating`, async () => {
      await startPage.actions(buildConcatenate, '9', 'a', 'Concatenate');
      const result = await resultsPage.getResult();
      expect(result).toEqual('9a');
    });
  });

  prototype.forEach(buildConcatenateCheckbox => {
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