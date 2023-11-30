import solveInput from './CalculatorParser';

// Unit tests for solveInput function
describe('solveInput', () => {
  test('solves addition', () => {
    expect(solveInput('2+3')).toBe(5);
  });

  test('solves subtraction', () => {
    expect(solveInput('5-2')).toBe(3);
  });

  test('solves multiplication', () => {
    expect(solveInput('3*4')).toBe(12);
  });

  test('solves division', () => {
    expect(solveInput('8/2')).toBe(4);
  });

  test('solves an exponent', () => {
    expect(solveInput('2^3')).toBe(8);
  });

  test('solves an expression with parentheses', () => {
    expect(solveInput('(2+3)*(4-1)')).toBe(15);
  });

  test('solves an expression with nested parentheses', () => {
    expect(solveInput('((2+3)*2)^2')).toBe(100);
  });

  test('handles division by zero', () => {
    expect(solveInput('4/0')).toBe(Infinity);
  });

  test('returns null for invalid input', () => {
    expect(solveInput('2$3')).toBeNull();
  });

});