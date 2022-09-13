//? CALCULATOR BASIC FUNCTIONS

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function operate(a, b, operation) { return operation(a, b); }

function operationSelector(operatorPressed) {
    switch (operatorPressed) {
        case "+":
            return add;
        case "-":
            return subtract;
        case "*":
            return multiply;
        case "/":
            return divide;
    }
}

let lastValue = "";
let operator = ""
let currentValue = "";
let screenValue = "";
let numberIsTheResult = false;


//? DOM Implementation
function refresh() {
    const screen = document.querySelector('#screen');
    screen.textContent = screenValue;
};

function createButton(id, type, character) {
    const numbersButtons = document.querySelector(`#${id}`);
    const numberBtn = document.createElement("button");
    numberBtn.textContent = `${character}`;
    numberBtn.className = "button";
    if (type === "number") {
        numberBtn.addEventListener("click", () => {
            if (numberIsTheResult) {
                currentValue = "";
                screenValue = currentValue;
                numberIsTheResult = false;
                refresh()
            }
            currentValue += `${character}`;
            screenValue += `${character}`;
            refresh();
        });
    } else if (type === "operator") {
        numberBtn.addEventListener("click", () => {
            if (numberIsTheResult) numberIsTheResult = false;
            operator = character;
            lastValue = currentValue;
            currentValue = "";
            screenValue += ` ${character} `;
            refresh();
        })
    } else if (type === "result") {
        numberBtn.addEventListener("click", () => {
            let currentOperation = operationSelector(operator);
            lastValue = parseFloat(lastValue);
            currentValue = parseFloat(currentValue);
            currentValue = operate(lastValue, currentValue, currentOperation);
            screenValue = currentValue;
            numberIsTheResult = true;
            refresh();
        })
    }
    numbersButtons.append(numberBtn);
}

//? Calculator constructor
for (let i = 1; i < 10; i++) {
    createButton("numbers", "number", i);
}
createButton("numbers", "number", ".");
createButton("numbers", "number", "0");
createButton("numbers", "result", "=");

const operators = ["+", "-", "*", "/"];
operators.map((operator) => createButton("operators", "operator", operator));
