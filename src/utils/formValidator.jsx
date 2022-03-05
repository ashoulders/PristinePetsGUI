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
  return {
    valid: email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    helperText: 'Please enter a valid email address',
  };
};

const validatePhoneNumber = (phoneNumber) => {
  const valid = /^\d{9,11}$/.test(phoneNumber);
  const helperText = valid ? '' : 'Please enter a valid phone number';
  return { valid, helperText };
};

const validatePrice = (price) => {
  return {
    valid: price.match(/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/),
    helperText: 'Please enter a valid price',
  };
};

const validateDate = (date) => {
  let valid = false;
  if (date.toString() !== 'Invalid Date') {
    valid = true;
  }
  const helperText = valid ? '' : 'Please enter date in format dd/mm/yyyy';
  return { valid, helperText };
};

export {
  validateInteger,
  validateRequired,
  validateEmail,
  validatePhoneNumber,
  validatePrice,
  validateDate,
};
