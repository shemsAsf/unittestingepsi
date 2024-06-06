function addToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    var expression = document.getElementById('display').value;
    var result = calculateExpression(expression);
    document.getElementById('display').value = result;
}

function calculateExpression(expression) {
    return eval(expression);
}


module.exports = { calculateExpression };