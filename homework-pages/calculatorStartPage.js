exports.CalculatorStartPage = class CalculatorStartPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
    await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
    }
    async selectBuild(buildType) {
        await this.page.click('#selectBuild');
        await this.page.selectOption('#selectBuild', { label: buildType} );
    }

    async fillInFields(value1, value2) {
        await this.page.fill('#number1Field', value1);
        await this.page.fill('#number2Field', value2);
    }

    async selectOperationAndCalculate(operation) {
      await this.page.click('#selectOperationDropdown');
      await this.page.selectOption('#selectOperationDropdown', { label: operation });
      await this.page.click('#calculateButton');
    }
}