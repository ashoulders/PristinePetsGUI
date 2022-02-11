import React, { useState } from 'react';
import { Grid } from '@mui/material';
import RequestList from './requestList';
import RequestInformation from './requestInformation';

const Requests = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <RequestList />
      </Grid>
      <Grid item xs={9}>
        <RequestInformation />
      </Grid>
    </Grid>
  );
};

export default Requests;
