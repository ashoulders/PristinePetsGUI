import React, { useState } from 'react';
import { Grid } from '@mui/material';
import AppointmentTypeList from './appointmentTypesList';
import AppointmentType from './appointmentType';
import TemplateList from './templatesList';
import TemplateInformation from './templateInformation';

const Templates = () => {
  return (
    <Grid container columnSpacing={0} rowSpacing={1}>
      <Grid item xs={3}>
        <AppointmentTypeList />
      </Grid>
      <Grid item xs={9}>
        <AppointmentType />
      </Grid>
      <Grid item xs={3}>
        <TemplateList />
      </Grid>
      <Grid item xs={9}>
        <TemplateInformation />
      </Grid>
    </Grid>
  );
};

export default Templates;
