const operators = ["/", "*", "-", "+"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

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
let operator = "";
let currentValue = "";
let screenValue = "";
let numberIsTheResult, operatorIsAlreadyPressed = false;


//? DOM Implementation
function refresh() {
    const screen = document.querySelector('#screen');
    screen.textContent = screenValue;
};

function eraseOne() {
    currentValue = currentValue.slice(0, -1);
    screenValue = screenValue.slice(0, -1);
    refresh();
}

function eraseAll() {
    lastValue = "";
    operator = "";
    currentValue = "";
    screenValue = "";
    numberIsTheResult, operatorIsAlreadyPressed = false;
    const screen = document.querySelector('#screen');
    screen.textContent = "0";
}

function numberPressed(character) {
    if (numberIsTheResult) {
        currentValue = "";
        screenValue = currentValue;
        numberIsTheResult = false;
        refresh()
    }
    currentValue += `${character}`;
    screenValue += `${character}`;
    refresh();
}

function operatorPressed(character) {
    if (numberIsTheResult) numberIsTheResult = false;
    if (operatorIsAlreadyPressed) return; //pass
    operator = character;
    operatorIsAlreadyPressed = true;
    lastValue = currentValue;
    currentValue = "";
    screenValue += ` ${character} `;
    refresh();
}

function equalPressed() {
    operatorIsAlreadyPressed = false;
    let currentOperation = operationSelector(operator);
    lastValue = parseFloat(lastValue);
    currentValue = parseFloat(currentValue);
    currentValue = operate(lastValue, currentValue, currentOperation);
    screenValue = ((currentValue * 100) / 100).toString();
    if (screenValue.length > 10) screenValue = screenValue.substring(0, 10);
    numberIsTheResult = true;
    refresh();
}

function createButton(id, type, character) {
    const numbersButtons = document.querySelector(`#${id}`);
    const numberBtn = document.createElement("button");
    numberBtn.textContent = `${character}`;
    numberBtn.className = "button";
    numberBtn.setAttribute("id", `${character}`)

    switch (type) {
        case "number":
            numberBtn.addEventListener("click", () => {
                numberPressed(character)
            });
            break;

        case "operator":
            numberBtn.addEventListener("click", () => {
                operatorPressed(character);
            })
            break;
        case "result":
            numberBtn.addEventListener("click", () => {
                equalPressed();
            })
            break;

        case "eraserOne":
            numberBtn.addEventListener("click", () => {
                eraseOne();
            })
            break;
        case "eraserAll":
            numberBtn.addEventListener("click", () => {
                eraseAll();
            })
            break;
    }
    numbersButtons.append(numberBtn);
}

//? Calculator construction
createButton("erasers", "eraserOne", "DEL");
createButton("erasers", "eraserAll", "AC");

for (let i = 1; i < 10; i++) {
    createButton("numbers", "number", i);
}
createButton("numbers", "number", ".");
createButton("numbers", "number", 0);
createButton("numbers", "result", "=");

operators.map((operator) => createButton("operators", "operator", operator));


//? Keyboard events
window.addEventListener("keydown", (event) => {
    console.log(event.key)
    numbers.map((number) => number.toString())
    switch (event.key) {
        case "1":
            numberPressed(1);
            break;
        case "2":
            numberPressed(2);
            break;
        case "3":
            numberPressed(3);
            break;
        case "4":
            numberPressed(4);
            break;
        case "5":
            numberPressed(5);
            break;
        case "6":
            numberPressed(6);
            break;
        case "7":
            numberPressed(7);
            break;
        case "8":
            numberPressed(8);
            break;
        case "9":
            numberPressed(9);
            break;
        case "0":
            numberPressed(0);
            break;
        case ".":
            numberPressed(".");
            break;
        case "+":
            operatorPressed("+");
            break;
        case "-":
            operatorPressed("-");
            break;
        case "*":
            operatorPressed("*");
            break;
        case "/":
            operatorPressed("/");
            break;
        case "=":
            equalPressed();
            break;
        case "Enter":
            equalPressed();
            break;
    }

});

