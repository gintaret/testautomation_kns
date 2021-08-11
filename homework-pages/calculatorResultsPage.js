const result = '#numberAnswerField';
const errorMessage = '#errorMsgField';
const integerLabel = '#intSelectionLabel';
const integerCheckbox = '#integerSelect';

exports.CalculatorResultsPage = class CalculatorResultsPage {
    constructor(page) {
        this.page = page;
    }

    async getResult() {
        return await this.page.inputValue(result);
    }

    async getErrorMessage() {
        return await this.page.textContent(errorMessage);
    }

    async getIntegerSelectionLabel() {
        return await this.page.isHidden(integerLabel);
    }

    async getIntegerCheckbox() {
        return await this.page.isVisible(integerCheckbox);
    }

} 