import React, { useState } from 'react';
import { Grid } from '@mui/material';
import CustomerList from './customerList';
import CustomerInformation from './customerInformation';

const Customers = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <CustomerList />
      </Grid>
      <Grid item xs={9}>
        <CustomerInformation />
      </Grid>
    </Grid>
  );
};

export default Customers;
