//? CALCULATOR BASIC FUNCTIONS

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function operate(a, b, operation) { return operation(a, b); }

let valueA = "";
let operator = ""
let valueB = 3;
let screenValue;

let result = operate(operate(valueA, valueB, add), valueB, add)
console.log(result);

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
            valueA += `${character}`;
            screenValue = valueA;
            refresh();
        });
    }
    numbersButtons.append(numberBtn);
}


//? Calculator constructor
for (let i = 1; i < 10; i++) {
    createButton("numbers", "number", i);
}
createButton("numbers", "number", ".");
createButton("numbers", "number", "0");
createButton("numbers", "number", "=");

const operators = ["+", "-", "*", "/"];
operators.map((operator) => createButton("operators", "number", operator));
