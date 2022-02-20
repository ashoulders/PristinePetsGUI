const validateInteger = (input) => {
  return { valid: !Number.isNaN(input), helperText: 'Please enter an integer' };
};

const validateRequired = (input) => {
  return {
    valid: input.length > 0,
    helperText: 'This field cannot be left blank',
  };
};

const validateEmail = (email) => {
  return {
    valid: email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    helperText: 'Please enter a valid email address',
  };
};

const validatePhoneNumber = (phoneNumber) => {
  return {
    valid: phoneNumber.match(/^\d{9,11}$/),
    helperText: 'Please enter a valid phone number',
  };
};

const validatePrice = (price) => {
  return {
    valid: price.match(/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/),
    helperText: 'Please enter a valid price',
  };
};

export {
  validateInteger,
  validateRequired,
  validateEmail,
  validatePhoneNumber,
  validatePrice,
};
