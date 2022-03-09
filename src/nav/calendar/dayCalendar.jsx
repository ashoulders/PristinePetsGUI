import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Paper, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const localizer = momentLocalizer(moment);

const DayCalendar = ({ appointments, setOpenModal, selectedDate }) => {
  return (
    <Paper className="paper paperDayCalendar" variant="outlined">
      <Grid container>
        <Grid item xs={12}>
          Select an appointment to edit it
          <Button
            className="primary floatRight"
            variant="contained"
            onClick={() => setOpenModal(true)}
          >
            Add Appointment
          </Button>
        </Grid>
        <Grid item xs={12} className="dayCalendar">
          <Calendar
            localizer={localizer}
            events={appointments}
            startAccessor="start"
            endAccessor="end"
            defaultView="day"
            toolbar={false}
            scrollToTime={Date.now()}
            date={selectedDate}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

DayCalendar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  appointments: PropTypes.array.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
};

export default DayCalendar;
