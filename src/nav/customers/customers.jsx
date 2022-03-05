import React, { useState } from 'react';
import { Grid, Paper } from '@mui/material';
import {
  validateEmail,
  validatePhoneNumber,
  validateRequired,
} from '../../utils/formValidator';
import CustomerList from './customerList';
import CustomerInformation from './customerInformation';

const Customers = () => {
  const [customers, setCustomers] = useState([
    {
      id: 0,
      firstName: 'Abigail',
      surname: 'Shoulders',
      email: 'a@a.com',
      phone: ['012345678'],
      notes: '',
      pets: [
        {
          name: 'Pet 1',
          petType: 'Option 1',
          breed: '',
          dob: '01/01/2001',
          notes: 'Notes',
        },
      ],
    },
    {
      id: 1,
      firstName: 'Jamie',
      surname: 'Sykes',
      email: 'b@b.com',
      phone: ['123456789', '234567890'],
      notes: '',
      pets: [],
    },
    {
      id: 2,
      firstName: 'Michael',
      surname: 'Harvey',
      email: 'c@c.com',
      phone: [],
      notes: '',
      pets: [
        {
          name: 'Pet 2',
          petType: 'Option 2',
          breed: 'Tabby',
          dob: '01/02/2003',
          notes: '',
        },
      ],
    },
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const newCustomer = {
    firstName: '',
    surname: '',
    email: '',
    phone: [],
    notes: '',
    renderType: 'Add',
    pets: [],
  };

  const defaultErrors = {
    firstName: false,
    surname: false,
    email: false,
    phone: [],
  };

  const [errors, setErrors] = useState(defaultErrors);

  const getSelectedCustomer = (customerID) => {
    // get customer from database
    const customer = customers.find((o) => o.id === customerID);
    customer.renderType = 'Edit';
    setSelectedCustomer({ ...customer });

    const modifiedErrors = defaultErrors;
    // eslint-disable-next-line prefer-spread
    modifiedErrors.phone = Array.apply(null, Array(customer.phone.length)).map(
      (_) => false
    );
    setErrors({ ...modifiedErrors });
  };

  const validateForm = () => {
    const modifiedErrors = errors;
    const firstNameValidation = validateRequired(selectedCustomer.firstName);
    modifiedErrors.firstName = firstNameValidation.valid
      ? false
      : firstNameValidation.helperText;

    const surnameValidation = validateRequired(selectedCustomer.surname);
    modifiedErrors.surname = surnameValidation.valid
      ? false
      : surnameValidation.helperText;

    const emailValidation = validateEmail(selectedCustomer.email);
    modifiedErrors.email =
      emailValidation.valid || selectedCustomer.email.length === 0
        ? false
        : emailValidation.helperText;

    modifiedErrors.phone = [];
    let phoneValidation;
    selectedCustomer.phone.forEach((phone) => {
      phoneValidation = validatePhoneNumber(phone);
      modifiedErrors.phone.push(
        phoneValidation.valid ? false : phoneValidation.helperText
      );
    });

    setErrors({ ...modifiedErrors });
  };

  const addCustomer = () => {
    validateForm();
  };

  const updateCustomer = () => {
    validateForm();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <CustomerList
          customers={customers}
          getSelectedCustomer={getSelectedCustomer}
          addCustomer={() => {
            setSelectedCustomer(newCustomer);
            setErrors(defaultErrors);
          }}
        />
      </Grid>
      <Grid item xs={9}>
        <Paper className="paper paper2" variant="outlined">
          {selectedCustomer && (
            <CustomerInformation
              customer={selectedCustomer}
              setCustomer={setSelectedCustomer}
              addCustomer={addCustomer}
              updateCustomer={updateCustomer}
              errors={errors}
              setErrors={setErrors}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Customers;
