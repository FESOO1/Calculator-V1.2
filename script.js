// SCREEN
const screenHeader = document.querySelector('.main-calculator-screen-header');
const screenPar = document.querySelector('.main-calculator-screen-par');

// KEYBOARD
const numberKeys = document.querySelectorAll('.main-calculator-keyboard-number-button');
const operatorKeys = document.querySelectorAll('.main-calculator-keyboard-operator-button');
const deleteKey = document.querySelector('.main-calculator-keyboard-del-button');
const resetKey = document.querySelector('.main-calculator-keyboard-reset-button');
const calculateKey = document.querySelector('.main-calculator-keyboard-calculate-button');
const dotKey = document.querySelector('.main-calculator-keyboard-dot-button');

// CAL OBJECT
const calObj = {
    input: {
        firstInput: {
            isFirstInputEnteredValue: false,
            firstInputArr: [0],
        },
        secondInput: {
            isSecondInputEnteredValue: false,
            secondInputArr: [0],
        },
    },
    operator: {
        isOperatorSelected: false,
        selectedOperator: undefined,
    },
};

// HANDLE NUMBERS

for (let i = 0; i < numberKeys.length; i++) {
    numberKeys[i].addEventListener('click', e => {
        handleNumbers(Number(e.currentTarget.value));
    });
};

function handleNumbers(e) {
    if (!calObj.operator.isOperatorSelected && calObj.input.firstInput.firstInputArr.length < 16) {
        if (!calObj.input.firstInput.isFirstInputEnteredValue) {
            calObj.input.firstInput.firstInputArr = [];
            calObj.input.firstInput.isFirstInputEnteredValue = true;
        };
        calObj.input.firstInput.firstInputArr.push(e);

        const firstInputString = calObj.input.firstInput.firstInputArr.join('');
        handleScreenHeader(firstInputString);
    } else if (calObj.operator.isOperatorSelected && calObj.input.secondInput.secondInputArr.length < 16) {
        if (!calObj.input.secondInput.isSecondInputEnteredValue) {
            calObj.input.secondInput.secondInputArr = [];
            calObj.input.secondInput.isSecondInputEnteredValue = true;
        };
        calObj.input.secondInput.secondInputArr.push(e);

        const secondInputString = calObj.input.secondInput.secondInputArr.join('');
        handleScreenHeader(secondInputString);
    };
};

// HANDLE SCREEN HEADER AND PAR

function handleScreenHeader(value) {
    const formatNumber = new Intl.NumberFormat('en-US', { style: 'decimal' });
    screenHeader.textContent = formatNumber.format(value);
};

function formatNumber(value) {
    const formatNumber = new Intl.NumberFormat('en-US', { style: 'decimal' });
    return formatNumber.format(value);
};

// SELECTING AN OPERATOR

for (let i = 0; i < operatorKeys.length; i++) {
    operatorKeys[i].addEventListener('click', e => {
        selectingAndOperator(e.currentTarget.value);
    });
};

function selectingAndOperator(e) {
    calObj.operator.selectedOperator = e;
    calObj.operator.isOperatorSelected = true;
    const firstInputString = calObj.input.firstInput.firstInputArr.join('');
    screenPar.textContent = `${formatNumber(firstInputString)} ${calObj.operator.selectedOperator}`;
};

// DELETING A CHARACTER

function deletingACharacter() {
    if (!calObj.operator.isOperatorSelected) {
        if (calObj.input.firstInput.firstInputArr.length > 0) {
            calObj.input.firstInput.firstInputArr.pop();
        } else {
            calObj.input.firstInput.firstInputArr = [0];
            calObj.input.firstInput.isFirstInputEnteredValue = false;
        };

        const firstInputString = calObj.input.firstInput.firstInputArr.join('');
        handleScreenHeader(firstInputString);
    } else {
        if (calObj.input.secondInput.secondInputArr.length > 0) {
            calObj.input.secondInput.secondInputArr.pop();
        } else {
            calObj.input.secondInput.secondInputArr = [0];
            calObj.input.secondInput.isSecondInputEnteredValue = false;
        };

        const secondInputString = calObj.input.secondInput.secondInputArr.join('');
        handleScreenHeader(secondInputString);
    };
};

// CALCULATE THE INPUTS

function calculateTheInputs() {
    if (calObj.operator.isOperatorSelected) {
        const firstInput = Number(calObj.input.firstInput.firstInputArr.join(''));
        const secondInput = Number(calObj.input.secondInput.secondInputArr.join(''));
        let output;

        switch (calObj.operator.selectedOperator) {
            case '+':
                output = firstInput + secondInput;
                break;
            case '-':
                output = firstInput - secondInput;
                break;
            case '*':
                output = firstInput * secondInput;
                break;
            case '/':
                output = firstInput / secondInput;
                break;
        };

        // HANDLE SCREEN TEXT
        screenPar.textContent = `${formatNumber(firstInput)} ${calObj.operator.selectedOperator} ${secondInput} =`;
        handleScreenHeader(output);

        // RESETTING THE CAL OBJECT
    };
};

// INITIALIZING BUTTONS
calculateKey.addEventListener('click', calculateTheInputs);
deleteKey.addEventListener('click', deletingACharacter);