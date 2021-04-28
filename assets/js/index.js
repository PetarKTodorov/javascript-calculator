import initCalculator from './calculator.js';

document.addEventListener('DOMContentLoaded', function () {
    const numberButtonsSelector = '[data-number]';
    const operationButtonsSelector = '[data-operation]';
    const equalsButtonSelecor = '[data-equals]';
    const deleteButtonSelector = '[data-delete]';
    const allClearButtonSelector = '[data-all-clear]';
    const previousOperandTextElementSelector = '[data-previous-operand]';
    const currentOperandTextElementSelector = '[data-current-operand]';

    initCalculator(numberButtonsSelector, operationButtonsSelector, equalsButtonSelecor, deleteButtonSelector,
        allClearButtonSelector, previousOperandTextElementSelector, currentOperandTextElementSelector);
});