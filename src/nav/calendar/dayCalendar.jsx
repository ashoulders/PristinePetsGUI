import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Paper } from '@mui/material';

const localizer = momentLocalizer(moment);

const DayCalendar = () => (
  <Paper className="paper paper2 paper3" variant="outlined">
    <Calendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      defaultView="day"
      toolbar={false}
      scrollToTime={Date.now()}
    />
  </Paper>
);

export default DayCalendar;
