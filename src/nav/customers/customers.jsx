import React, { useState } from 'react';
import { Grid, Paper } from '@mui/material';
import { validateRequired } from '../../utils/formValidator';
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

  const [errors, setErrors] = useState({
    firstName: false,
    surname: false,
    email: false,
  });

  const getSelectedCustomer = (customerID) => {
    // get customer from database
    const customer = customers.find((o) => o.id === customerID);
    customer.renderType = 'Edit';
    setSelectedCustomer(customer);
  };

  const validateForm = () => {
    const modifiedErrors = errors;
    const firstNameValidation = validateRequired(selectedCustomer.firstName);
    modifiedErrors.name = firstNameValidation.valid
      ? false
      : firstNameValidation.helperText;
    const surnameValidation = validateRequired(selectedCustomer.surname);
    modifiedErrors.name = surnameValidation.valid
      ? false
      : surnameValidation.helperText;
    setErrors({ ...modifiedErrors });
  };

  const addCustomer = () => {
    // setSelectedCustomer(newCustomer);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <CustomerList
          customers={customers}
          getSelectedCustomer={getSelectedCustomer}
          addCustomer={() => setSelectedCustomer(newCustomer)}
        />
      </Grid>
      <Grid item xs={9}>
        <Paper className="paper paper2" variant="outlined">
          {selectedCustomer && (
            <CustomerInformation
              customer={selectedCustomer}
              setCustomer={setSelectedCustomer}
              errors={errors}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Customers;
