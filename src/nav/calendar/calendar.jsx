import React, { useState } from 'react';
import { Grid } from '@mui/material';
import PetsCalendar from './mainCalendar';
import DayCalendar from './dayCalendar';

const Calendar = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={7}>
        <PetsCalendar />
      </Grid>
      <Grid item xs={5}>
        <DayCalendar />
      </Grid>
    </Grid>
  );
};

export default Calendar;
