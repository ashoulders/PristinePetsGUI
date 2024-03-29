import React from 'react';
import {
  validateInteger,
  validateRequired,
  validateEmail,
  validatePhoneNumber,
  validatePrice,
  validateTime,
  validateInOptions,
} from '../utils/formValidator';

describe('validate integer function with input of', () => {
  const expectedValidOutput = {
    valid: true,
    helperText: '',
  };
  const expectedInvalidOutput = {
    valid: false,
    helperText: 'Please enter a whole number',
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

  test('undefined', () => {
    const output = validateInteger(undefined);
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

  test('undefined', () => {
    const output = validateRequired(undefined);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('empty string', () => {
    const output = validateRequired('');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });
});

describe('validate phone number function with input of', () => {
  // this function does not need to be checked with numbers as leading zeros would be removed
  const expectedValidOutput = {
    valid: true,
    helperText: '',
  };
  const expectedInvalidOutput = {
    valid: false,
    helperText: 'Please enter a valid phone number',
  };

  test('9 character phone number', () => {
    const output = validatePhoneNumber('012345678');
    expect(output).toStrictEqual(expectedValidOutput);
  });

  test('10 character phone number', () => {
    const output = validatePhoneNumber('0123456789');
    expect(output).toStrictEqual(expectedValidOutput);
  });

  test('11 character phone number', () => {
    const output = validatePhoneNumber('01234567891');
    expect(output).toStrictEqual(expectedValidOutput);
  });

  test('8 character phone number', () => {
    const output = validatePhoneNumber('01234567');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('12 character phone number', () => {
    const output = validatePhoneNumber('012345678910');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('empty string', () => {
    const output = validatePhoneNumber('');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('string', () => {
    const output = validatePhoneNumber('hello');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('null', () => {
    const output = validatePhoneNumber(null);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('undefined', () => {
    const output = validatePhoneNumber(undefined);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('true', () => {
    const output = validatePhoneNumber(true);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('false', () => {
    const output = validatePhoneNumber(false);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });
});

describe('validate email function with input of', () => {
  const expectedValidOutput = {
    valid: true,
    helperText: '',
  };
  const expectedInvalidOutput = {
    valid: false,
    helperText: 'Please enter a valid email address',
  };

  test('valid email', () => {
    const output = validateEmail('a@a.com');
    expect(output).toStrictEqual(expectedValidOutput);
  });

  test('invalid email', () => {
    const output = validateEmail('hello');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('empty string', () => {
    const output = validateEmail('');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('null', () => {
    const output = validateEmail(null);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('undefined', () => {
    const output = validateEmail(undefined);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('true', () => {
    const output = validateEmail(true);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('false', () => {
    const output = validateEmail(false);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });
});

describe('validate price function with input of', () => {
  const expectedValidOutput = {
    valid: true,
    helperText: '',
  };
  const expectedInvalidOutput = {
    valid: false,
    helperText: 'Please enter a valid price',
  };

  test('valid price', () => {
    const output = validatePrice('15.05');
    expect(output).toStrictEqual(expectedValidOutput);
  });

  test('valid price 2', () => {
    const output = validatePrice('135.50');
    expect(output).toStrictEqual(expectedValidOutput);
  });

  test('invalid price', () => {
    const output = validatePrice('1.595');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('empty string', () => {
    const output = validatePrice('');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('null', () => {
    const output = validatePrice(null);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('undefined', () => {
    const output = validatePrice(undefined);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('true', () => {
    const output = validatePrice(true);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('false', () => {
    const output = validatePrice(false);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });
});

describe('validate time function with input of', () => {
  const expectedValidOutput = {
    valid: true,
    helperText: '',
  };
  const expectedInvalidOutput = {
    valid: false,
    helperText: 'Please enter a valid time',
  };

  test('valid time', () => {
    const output = validateTime('11:45');
    expect(output).toStrictEqual(expectedValidOutput);
  });

  test('valid 24h time', () => {
    const output = validateTime('17:30');
    expect(output).toStrictEqual(expectedValidOutput);
  });

  test('invalid time', () => {
    const output = validateTime('25:60');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('empty string', () => {
    const output = validateTime('');
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('null', () => {
    const output = validateTime(null);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('undefined', () => {
    const output = validateTime(undefined);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('true', () => {
    const output = validateTime(true);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });

  test('false', () => {
    const output = validateTime(false);
    expect(output).toStrictEqual(expectedInvalidOutput);
  });
});
