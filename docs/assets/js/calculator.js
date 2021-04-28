class Calculator {
    possibleMathOperationSymbols = {
        'plus': '+',
        'minus': '-',
        'times': '*',
        'divide': '/',
    };

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;

        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
    }

    delete() {
        const newValue = this.currentOperand.toString().slice(0, -1);
        this.currentOperand = newValue;
    }

    appendNumber(number) {
        const isNumberAllreadyIsFractionalNumber = number === '.' && this.currentOperand.includes('.');
        if (isNumberAllreadyIsFractionalNumber) {
            return;
        }

        this.currentOperand = this.currentOperand.toString() + number.toString();

        const isCurrentOperandIsDot = this.currentOperand === '.';
        if (isCurrentOperandIsDot) {
            this.currentOperand = '0.';
        }
    }

    chooseOperation(operation) {
        const hasNotOperandBeforeOperationSymbol = this.currentOperand === '';
        if (hasNotOperandBeforeOperationSymbol) {
            return;
        }

        const hasPreviousOperand = this.previousOperand !== '';
        if (hasPreviousOperand) {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        const previousOperand = parseFloat(this.previousOperand);
        const currentOperand = parseFloat(this.currentOperand);

        const isOperandsAreNotValidNumbers = isNaN(previousOperand) || isNaN(currentOperand);
        if (isOperandsAreNotValidNumbers) {
            return;
        }

        let computation = null;

        switch (this.operation) {
            case this.possibleMathOperationSymbols.plus: computation = previousOperand + currentOperand; break;
            case this.possibleMathOperationSymbols.minus: computation = previousOperand - currentOperand; break;
            case this.possibleMathOperationSymbols.times: computation = previousOperand * currentOperand; break;
            case this.possibleMathOperationSymbols.divide: computation = previousOperand / currentOperand; break;
            default:
                const possibleMathOperationSymbolsAsArray = Object.values(this.possibleMathOperationSymbols);
                const errorMessage = `Invalid symbols.Allowed math operation symbols are: [ ${possibleMathOperationSymbolsAsArray.join(', ')} ]`;
                console.error(errorMessage);
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = null;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const stringNumberParts = stringNumber.split('.');

        const integerDigits = parseFloat(stringNumberParts[0]);
        const decimalDigits = stringNumberParts[1];

        let integerDisplay = this.formatNumber(integerDigits);

        const hasDecimalDigits = decimalDigits !== undefined;

        integerDisplay = hasDecimalDigits ? `${integerDisplay}.${decimalDigits}` : integerDisplay;

        return integerDisplay;
    }

    formatNumber(number) {
        const newNumber = isNaN(number) ? '' : number.toLocaleString('bg', { maximumFractionDigits: 0 });

        return newNumber;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        const previousOperandText = this.operation != null ?
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` : '';

        this.previousOperandTextElement.innerText = previousOperandText;
    }
}

function initCalculator
    (numberButtonsSelector, operationButtonsSelector, equalsButtonSelecor, deleteButtonSelector,
        allClearButtonSelector, previousOperandTextElementSelector, currentOperandTextElementSelector) {

    const numberButtons = document.querySelectorAll(numberButtonsSelector);
    const operationButtons = document.querySelectorAll(operationButtonsSelector);
    const equalsButton = document.querySelector(equalsButtonSelecor);
    const deleteButton = document.querySelector(deleteButtonSelector);
    const allClearButton = document.querySelector(allClearButtonSelector);
    const previousOperandTextElement = document.querySelector(previousOperandTextElementSelector);
    const currentOperandTextElement = document.querySelector(currentOperandTextElementSelector);

    const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();
        });
    });

    operationButtons.forEach((button) => {
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerText);
            calculator.updateDisplay();
        });
    });

    equalsButton.addEventListener('click', (button) => {
        calculator.compute();
        calculator.updateDisplay();
    });

    allClearButton.addEventListener('click', (button) => {
        calculator.clear();
        calculator.updateDisplay();
    });

    deleteButton.addEventListener('click', (button) => {
        calculator.delete();
        calculator.updateDisplay();
    });
}

export default initCalculator;