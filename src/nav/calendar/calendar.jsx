import React, { useState } from 'react';
import { Grid } from '@mui/material';
import PetsCalendar from './mainCalendar';
import DayCalendar from './dayCalendar';
import AppointmentInformation from './appointmentInformation';
import {
  validateInteger,
  validateTime,
  validateDate,
  validatePrice,
} from '../../utils/formValidator';

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
      price: 10,
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
    price: '',
    notes: '',
    renderType: 'Add',
  };

  const defaultAppointmentErrors = {
    date: false,
    // appointmentType: false,
    // customer: false,
    // pets: false,
    startTime: false,
    length: false,
    price: false,
  };

  const [selectedAppointment, setSelectedAppointment] =
    useState(newAppointment);

  const [appointmentErrors, setAppointmentErrors] = useState(
    defaultAppointmentErrors
  );

  const [openModal, setOpenModal] = useState(false);

  const getSelectedAppointment = (appointmentID) => {
    const appointment = appointments.find((o) => o.id === appointmentID);
    appointment.renderType = 'Edit';
    setSelectedAppointment({ ...appointment });
    setOpenModal(true);
    setAppointmentErrors({ ...defaultAppointmentErrors });
  };

  const validateAppointmentForm = () => {
    const modifiedErrors = appointmentErrors;
    const dateValidation = validateDate(selectedAppointment.date);
    modifiedErrors.date = dateValidation.valid
      ? false
      : dateValidation.helperText;

    const startTimeValidation = validateTime(selectedAppointment.startTime);
    modifiedErrors.startTime = startTimeValidation.valid
      ? false
      : startTimeValidation.helperText;

    const lengthValidation = validateInteger(selectedAppointment.length);
    modifiedErrors.length = lengthValidation.valid
      ? false
      : lengthValidation.helperText;

    const priceValidation = validatePrice(selectedAppointment.price);
    modifiedErrors.price = priceValidation.valid
      ? false
      : priceValidation.helperText;

    setAppointmentErrors({ ...modifiedErrors });
  };

  const addAppointment = () => {
    validateAppointmentForm();
  };

  const editAppointment = () => {
    validateAppointmentForm();
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
        addAppointment={addAppointment}
        editAppointment={editAppointment}
        errors={appointmentErrors}
      />
    </>
  );
};

export default Calendar;
