function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;

}

function divide(a, b) {
    return a / b;

}

function operate(a, b, operation) {
    return operation(a, b);
}

let valueA = 2;
let valueB = 3;

let result = operate(operate(valueA, valueB, add), valueB, add)
console.log(result);

