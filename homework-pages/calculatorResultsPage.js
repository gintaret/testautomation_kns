const resultSelector = '#numberAnswerField';
const errorMessageSelector = '#errorMsgField';
const integerLabelSelector = '#intSelectionLabel';
const integerCheckboxSelector = '#integerSelect';

exports.CalculatorResultsPage = class CalculatorResultsPage {
    constructor(page) {
        this.page = page;
    }

    // async getGeneratedPassword() {
    // return await this.page.textContent(generatedPasswordSelector);
    // }

    async getResult() {
        return await this.page.inputValue(resultSelector);
    }

    async getErrorMessage() {
        return await this.page.textContent(errorMessageSelector);
    }

    async getIntegerSelectionLabel() {
        return await this.page.isHidden(integerLabelSelector);
    }

    async getIntegerCheckbox() {
        return await this.page.isVisible(integerCheckboxSelector);
    }

} 