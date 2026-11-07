(function() {
const display = document.getElementById('display');
let currentInput = '0';
let previousInput = null;
let operator = null;
let resetNext = false;

function updateDisplay() {
display.textContent = currentInput;
}

function clearAll() {
currentInput = '0';
previousInput = null;
operator = null;
resetNext = false;
updateDisplay();
}

function backspace() {
if (resetNext) return;
if (currentInput.length === 1) {
currentInput = '0';
} else {
currentInput = currentInput.slice(0, -1);
}
updateDisplay();
}

function appendNumber(num) {
if (resetNext) {
currentInput = num;
resetNext = false;
} else {
if (currentInput === '0' && num !== '.') {
currentInput = num;
} else if (!(num === '.' && currentInput.includes('.'))) {
currentInput += num;
}
}
updateDisplay();
}

function chooseOperator(op) {
if (operator !== null) {
calculate();
}
previousInput = currentInput;
operator = op;
resetNext = true;
}

function calculate() {
if (operator === null || resetNext) return;
let result;
const prev = parseFloat(previousInput);
const current = parseFloat(currentInput);
if (isNaN(prev) || isNaN(current)) return;

switch(operator) {
case 'add':
result = prev + current;
break;
case 'subtract':
result = prev - current;
break;
case 'multiply':
result = prev * current;
break;
case 'divide':
if (current === 0) {
alert("Error: Division by zero");
clearAll();
return;
}
result = prev / current;
break;
default:
return;
}
currentInput = String(result);
operator = null;
previousInput = null;
resetNext = true;
updateDisplay();
}

function handleButtonClick(e) {
const action = e.target.getAttribute('data-action');
if (!action) return;

if (!isNaN(action)) {
appendNumber(action);
} else {
switch(action) {
case 'decimal':
appendNumber('.');
break;
case 'clear':
clearAll();
break;
case 'backspace':
backspace();
break;
case 'add':
case 'subtract':
case 'multiply':
case 'divide':
chooseOperator(action);
break;
case 'equals':
calculate();
break;
}
}
}

function handleKeyboardInput(e) {
if (e.defaultPrevented) return;

const key = e.key;

if ((key >= '0' && key <= '9') || key === '.') {
e.preventDefault();
appendNumber(key);
} else if (key === '+' || key === '-' || key === '*' || key === '/') {
e.preventDefault();
const opMap = {
'+': 'add',
'-': 'subtract',
'*': 'multiply',
'/': 'divide'
};
chooseOperator(opMap[key]);
} else if (key === 'Enter' || key === '=') {
e.preventDefault();
calculate();
} else if (key === 'Backspace') {
e.preventDefault();
backspace();
} else if (key.toLowerCase() === 'c') {
e.preventDefault();
clearAll();
}
}

document.querySelector('.buttons').addEventListener('click', handleButtonClick);
window.addEventListener('keydown', handleKeyboardInput);

// Initialize display
updateDisplay();
})();