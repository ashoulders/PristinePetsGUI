import { format } from 'date-fns';

const validateInteger = (input) => {
  let valid;
  if (!/^\d+$/.test(input)) {
    // check if input contains non numeric characters
    valid = false;
  } else {
    // check if input is integer
    const number = parseFloat(input);
    valid = Number.isInteger(number);
  }
  const helperText = valid ? '' : 'Please enter a whole number';
  return { valid, helperText };
};

const validateRequired = (input) => {
  const valid = !!(input && input.length > 0);
  const helperText = valid ? '' : 'This field cannot be left blank';
  return { valid, helperText };
};

const validateEmail = (email) => {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const helperText = valid ? '' : 'Please enter a valid email address';
  return { valid, helperText };
};

const validatePhoneNumber = (phoneNumber) => {
  const valid = /^\d{9,11}$/.test(phoneNumber);
  const helperText = valid ? '' : 'Please enter a valid phone number';
  return { valid, helperText };
};

const validatePrice = (price) => {
  const valid = /^\d+(,\d{3})*(\.\d{1,2})?$/.test(price);
  const helperText = valid ? '' : 'Please enter a valid price';
  return { valid, helperText };
};

const validateDate = (date) => {
  let valid = false;
  if (date && date.toString() !== 'Invalid Date') {
    valid =
      /^(((0[13578]|1[02])\/(0[1-9]|[12]\d|3[01])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/.test(
        format(date, 'dd/MM/yyyy')
      );
  }

  const helperText = valid ? '' : 'Please enter date in format dd/mm/yyyy';
  return { valid, helperText };
};

const validateTime = (time) => {
  const valid = /^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/.test(time);
  const helperText = valid ? '' : 'Please enter a valid time';
  return { valid, helperText };
};

const validateInOptions = (option, options) => {
  const valid = options.includes(option);
  const helperText = valid ? '' : 'Please select an item in the dropdown';
  return { valid, helperText };
};

export {
  validateInteger,
  validateRequired,
  validateEmail,
  validatePhoneNumber,
  validatePrice,
  validateDate,
  validateTime,
  validateInOptions,
};
