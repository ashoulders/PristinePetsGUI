import React, { useState } from 'react';
import { Grid, Paper } from '@mui/material';
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
    },
    {
      id: 1,
      firstName: 'Jamie',
      surname: 'Sykes',
      email: 'b@b.com',
      phone: ['123456789', '234567890'],
      notes: '',
    },
    {
      id: 2,
      firstName: 'Michael',
      surname: 'Harvey',
      email: 'c@c.com',
      phone: [],
      notes: '',
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
  };

  const getSelectedCustomer = (customerID) => {
    // get customer from database
    const customer = customers.find((o) => o.id === customerID);
    customer.renderType = 'Edit';
    setSelectedCustomer(customer);
  };

  const addCustomer = () => {
    setSelectedCustomer(newCustomer);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <CustomerList
          customers={customers}
          getSelectedCustomer={getSelectedCustomer}
          addCustomer={addCustomer}
        />
      </Grid>
      <Grid item xs={9}>
        <Paper className="paper paper2" variant="outlined">
          {selectedCustomer && (
            <CustomerInformation
              customer={selectedCustomer}
              setCustomer={setSelectedCustomer}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Customers;
