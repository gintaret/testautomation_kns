const url = 'https://testsheepnz.github.io/BasicCalculator';
const selectBuild = '#selectBuild';
const selectBuildLabel = '#selectBuild';
const field1 = '#number1Field';
const field2 = '#number2Field';
const operationDropdown = '#selectOperationDropdown';
const operationDropdownSelection = '#selectOperationDropdown';
const calculateButton = '#calculateButton';

exports.CalculatorStartPage = class CalculatorStartPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
    await this.page.goto(url);
    }

    async selectBuild(buildType) {
        await this.page.click(selectBuild);
        await this.page.selectOption(selectBuildLabel, { label: buildType} );
    }

    async fillInFields(value1, value2) {
        await this.page.fill(field1, value1);
        await this.page.fill(field2, value2);
    }

    async selectOperationAndCalculate(operation) {
      await this.page.click(operationDropdown);
      await this.page.selectOption(operationDropdownSelection, { label: operation });
      await this.page.click(calculateButton);
    }
}