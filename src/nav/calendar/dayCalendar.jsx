import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Paper, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const localizer = momentLocalizer(moment);

const DayCalendar = ({
  appointments,
  selectedDate,
  getSelectedAppointment,
  addAppointment,
}) => {
  return (
    <Paper className="paper paperDayCalendar" variant="outlined">
      <Grid container>
        <Grid item xs={12}>
          <div className="centerFlexDiv">
            Select an appointment to edit it
            <Button
              className="primary buttonRight"
              variant="contained"
              onClick={addAppointment}
            >
              Add Appointment
            </Button>
          </div>
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
            onSelectEvent={(event) => getSelectedAppointment(event.id)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

DayCalendar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  appointments: PropTypes.array.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  getSelectedAppointment: PropTypes.func.isRequired,
  addAppointment: PropTypes.func.isRequired,
};

export default DayCalendar;
