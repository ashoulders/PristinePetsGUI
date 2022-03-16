import React, { useState } from 'react';
import { Grid } from '@mui/material';
import PetsCalendar from './mainCalendar';
import DayCalendar from './dayCalendar';
import AppointmentInformation from './appointmentInformation';

const Calendar = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 0,
      title: 'Appointment',
      start: new Date('2022-03-07T10:20:00'),
      end: new Date('2022-03-07T11:00:00'),
      date: new Date(2022, 3, 7),
      startTime: '10:20',
      length: 40,
      customer: 'Abigail Shoulders',
      pets: ['pet1'],
      notes: '',
    },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const newAppointment = {
    date: selectedDate,
    appointmentType: '',
    customer: '',
    pets: [],
    startTime: '',
    length: '',
    notes: '',
    renderType: 'Add',
  };

  const [selectedAppointment, setSelectedAppointment] =
    useState(newAppointment);

  const [openModal, setOpenModal] = useState(false);

  const getSelectedAppointment = (appointmentID) => {
    const appointment = appointments.find((o) => o.id === appointmentID);
    appointment.renderType = 'Edit';
    setSelectedAppointment({ ...appointment });
    setOpenModal(true);
    // setTemplateErrors({ ...defaultTemplateErrors });
  };

  // var [YYYY, MM, DD] = '2014-04-03'.split('-')
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <PetsCalendar
            appointments={appointments}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Grid>
        <Grid item xs={5}>
          <DayCalendar
            appointments={appointments}
            setOpenModal={setOpenModal}
            selectedDate={selectedDate}
            getSelectedAppointment={getSelectedAppointment}
            addAppointment={() => {
              setSelectedAppointment({ ...newAppointment });
              setOpenModal(true);
            }}
          />
        </Grid>
      </Grid>
      <AppointmentInformation
        openModal={openModal}
        setOpenModal={setOpenModal}
        appointment={selectedAppointment}
        setAppointment={setSelectedAppointment}
      />
    </>
  );
};

export default Calendar;
