import React from 'react';
import {
  validateInteger,
  validateRequired,
  validateEmail,
  validatePhoneNumber,
  validatePrice,
} from '../utils/formValidator';

describe('validate integer function with input of', () => {
  const expectedValidOutput = {
    valid: true,
    helperText: '',
  };
  const expectedInvalidOutput = {
    valid: false,
    helperText: 'Please enter an integer',
  };

  test('integer > 0', () => {
    const output = validateInteger(12);
    expect(output).toStrictEqual(expectedValidOutput);
  });

  test('0', () => {
    const output = validateInteger(0);
    expect(output).toStrictEqual(expectedValidOutput);
  });

  test('integer > 0 as string', () => {
    const output = validateInteger('12');
    expect(output).toStrictEqual(expectedValidOutput);
  });

  test('0 as string', () => {
    const output = validateInteger('0');
    expect(output).toStrictEqual(expectedValidOutput);
  });

  test('empty string', () => {
    const output = validateInteger('');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('string with only letters', () => {
    const output = validateInteger('hello world');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('string with letter and number', () => {
    const output = validateInteger('1a');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('float', () => {
    const output = validateInteger(1.5);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('true', () => {
    const output = validateInteger(true);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('false', () => {
    const output = validateInteger(false);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('null', () => {
    const output = validateInteger(null);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });
});

describe('validate required function with input of', () => {
  // this function does not need to be checked with integers as this will be handled by the validateInteger function
  const expectedValidOutput = {
    valid: true,
    helperText: '',
  };
  const expectedInvalidOutput = {
    valid: false,
    helperText: 'This field cannot be left blank',
  };

  test('string', () => {
    const output = validateRequired('hello world');
    expect(output).toStrictEqual(expectedValidOutput);
  });

  test('null', () => {
    const output = validateRequired(null);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('empty string', () => {
    const output = validateRequired('');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });
});
