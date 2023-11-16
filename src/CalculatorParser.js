
const operators = '+-*/()^';

function tokenize(input) {
    input = input.replace(/\s+/g, '');
 
	const tokens = [];
    let currentToken = '';

    for (const char of input) {
      if (operators.includes(char)) {
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

const precedence = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3,
};

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

export default solveInput;