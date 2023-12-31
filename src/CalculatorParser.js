
const operators = '+-*/()^';

// My thought process is to turn the equation into "usable parts", the individual components of an equation that have meaning
function tokenize(input) {
  input = input.replace(/\s+/g, '');

  const tokens = [];
  let currentToken = '';

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    // Check for a negative expression sign
    if (char === '-' && (i === 0 || operators.includes(input[i - 1]) || input[i - 1] === '(')) {
      // Add a zero only if the minus is not following a closing parenthesis
      if (i === 0 || input[i - 1] !== ')') {
        if (currentToken) {
          tokens.push(currentToken);
          currentToken = '';
        }
        tokens.push('0');
      }
      tokens.push('-');
    } else if (operators.includes(char) || char === '(' || char === ')') {
      if (currentToken) {
        tokens.push(currentToken);
        currentToken = '';
      }
      tokens.push(char);
    } else if (char.match(/\d|\./)) {
      currentToken += char;
    } else {
      throw new Error(`Invalid character: ${char}`);
    }
  }

  if (currentToken) {
    tokens.push(currentToken);
  }

  return tokens;
}


class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Order of operation importance
const precedence = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3,
};

// Create a tree from our tokens that represents the order of operations required to reach a solution
function createTree(tokens) {
  const operatorStack = [];
  const operandStack = [];

  function popOperator() {
    const operator = operatorStack.pop();
    const rightOperand = operandStack.pop();
    const leftOperand = operandStack.pop();
    const node = new TreeNode(operator);
    node.left = leftOperand;
    node.right = rightOperand;
    operandStack.push(node);
  }

  for (const token of tokens) {
    if (token.match(/\d/)) {
      operandStack.push(new TreeNode(parseFloat(token)));
    } else if (token in precedence) {
      while (
        operatorStack.length &&
        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
      ) {
        popOperator();
      }
      operatorStack.push(token);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
        popOperator();
      }
      operatorStack.pop();
    }
  }

  while (operatorStack.length) {
    popOperator();
  }

  return operandStack.pop();
}

// Recursively solve the operations in a tree until we reach a number which should be our solution
function solve(tree) {

  if (typeof tree.value === 'number') {
    return tree.value;
  }

  const leftValue = solve(tree.left);
  const rightValue = solve(tree.right);

  switch (tree.value) {
    case '+':
      return leftValue + rightValue;
    case '-':
      return leftValue - rightValue;
    case '*':
      return leftValue * rightValue;
    case '/':
      return leftValue / rightValue;
    case '^':
      return Math.pow(leftValue, rightValue);
    default:
      throw new Error(`Unknown operator: ${tree.value}`);
  }
}

// Put everything together
function solveInput(input) {
  try {
    const tokens = tokenize(input);
    const tree = createTree(tokens);
    return solve(tree);
  } catch(Error) {
    console.log(Error);
    return null;
  }
}
// Unit testing for solveInput is done in CalculatorParser.test.js

export default solveInput;