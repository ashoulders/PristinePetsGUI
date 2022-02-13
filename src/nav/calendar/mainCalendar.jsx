import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Paper } from '@mui/material';

const localizer = momentLocalizer(moment);

const PetsCalendar = () => (
  <Paper className="paper paper3" variant="outlined">
    <Calendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
    />
  </Paper>
);

export default PetsCalendar;
