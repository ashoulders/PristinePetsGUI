import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Paper } from '@mui/material';
import PropTypes from 'prop-types';

const localizer = momentLocalizer(moment);

const PetsCalendar = ({ appointments, selectedDate, setSelectedDate }) => {
  const customDayPropGetter = (date) => {
    if (date.getDate() === selectedDate.getDate())
      return {
        className: 'selectedDay',
        style: {},
      };
    if (date.getDate() === new Date().getDate()) {
      return {
        className: 'nonSelectedDay',
        style: {},
      };
    }
    return {};
  };

  return (
    <Paper className="paper paper2" variant="outlined">
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        selectable="ignoreEvents"
        onSelectSlot={(slot) => setSelectedDate(slot.start)}
        dayPropGetter={customDayPropGetter}
      />
    </Paper>
  );
};

PetsCalendar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  appointments: PropTypes.array.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
};

export default PetsCalendar;
