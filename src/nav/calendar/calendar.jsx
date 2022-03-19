/* eslint-disable promise/always-return */
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import PetsCalendar from './mainCalendar';
import DayCalendar from './dayCalendar';
import AppointmentInformation from './appointmentInformation';
import {
  validateInteger,
  validateTime,
  validateDate,
  validatePrice,
  validateRequired,
  validateInOptions,
} from '../../utils/formValidator';

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);
  // const [appointments, setAppointments] = useState([
  //   {
  //     id: 0,
  //     title: 'Appointment',
  //     start: new Date('2022-03-07T10:20:00'),
  //     end: new Date('2022-03-07T11:00:00'),
  //     date: new Date(2022, 2, 7), // months index from 0
  //     startTime: '10:20',
  //     length: 40,
  //     price: 10,
  //     customer: 'Abigail Shoulders',
  //     pets: ['pet1'],
  //     notes: '',
  //   },
  // ]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [tabLoading, setTabLoading] = useState(true);
  const [tabLoaded, setTabLoaded] = useState(false);
  const [petsLoading, setPetsLoading] = useState(false);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [pets, setPets] = useState([]);

  const newAppointment = {
    title: '',
    date: selectedDate,
    appointmentTypeId: '',
    customerId: '',
    petIds: [],
    startTime: '',
    length: '',
    price: '',
    notes: '',
    renderType: 'Add',
  };

  const defaultAppointmentErrors = {
    title: false,
    appointmentDate: false,
    appointmentType: false,
    customer: false,
    pets: false,
    startTime: false,
    length: false,
    price: false,
  };

  // get appointments from database
  const getAppointments = () => {
    axios
      .get('/Appointments/GetAppts')
      .then((response) => {
        setTabLoaded(true);
        const newAppointments = response.data;
        newAppointments.forEach((appointment) => {
          const [DD, MM, YYYY] = appointment.appointmentDate.split('/');
          appointment.start = new Date(
            `${YYYY}-${MM}-${DD}T${appointment.startTime}`
          );
          appointment.end = new Date(
            new Date(`${YYYY}-${MM}-${DD}T${appointment.startTime}`).getTime() +
              appointment.length * 60000
          );
          appointment.title = `${appointment.appointmentType.appointmentTypeName} - ${appointment.customer.surname}`;
        });
        setAppointments(newAppointments);
      })
      .catch((error) => {
        console.log(error);
        setTabLoaded(true);
        alert('Something went wrong. Please try again later.');
      });
  };

  // get appointment types from database
  const getAppointmentTypes = () => {
    axios
      .get('/Appointments/GetApptTypes')
      .then((response) => {
        setAppointmentTypes(response.data);
        setTabLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setTabLoaded(true);
        alert('Something went wrong. Please try again later.');
      });
  };

  // get customers from database
  const getCustomers = () => {
    axios
      .get('/Customers/GetCustomers')
      .then((response) => {
        setCustomers(response.data);
        setTabLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setTabLoaded(true);
        alert('Something went wrong. Please try again later.');
      });
  };

  const getPets = (customerId) => {
    axios
      .get(`/Pets/GetPets?customerId=${customerId}`)
      .then((response) => {
        setPets(response.data);
        setPetsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong. Please try again later.');
      });
  };

  const [selectedAppointment, setSelectedAppointment] =
    useState(newAppointment);

  const [appointmentErrors, setAppointmentErrors] = useState(
    defaultAppointmentErrors
  );

  const [openModal, setOpenModal] = useState(false);

  const getSelectedAppointment = (appointmentID) => {
    const appointment = appointments.find(
      (o) => o.appointmentId === appointmentID
    );
    appointment.renderType = 'Edit';
    setPetsLoading(true);
    getPets(appointment.customerId);
    setSelectedAppointment({ ...appointment });
    setOpenModal(true);
    setAppointmentErrors({ ...defaultAppointmentErrors });
  };

  const validateAppointmentForm = () => {
    const modifiedErrors = appointmentErrors;

    const titleValidation = validateRequired(selectedAppointment.date);
    modifiedErrors.title = titleValidation.valid
      ? false
      : titleValidation.helperText;

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

    const appointmentTypeOptions = appointmentTypes.map(
      (type) => type.appointmentTypeId
    );
    const appointmentTypeValidation = validateInOptions(
      selectedAppointment.appointmentTypeId,
      appointmentTypeOptions
    );
    modifiedErrors.appointmentType = appointmentTypeValidation.valid
      ? false
      : appointmentTypeValidation.helperText;

    const customerOptions = appointmentTypes.map(
      (type) => type.appointmentTypeId
    );
    const customerValidation = validateInOptions(
      selectedAppointment.customerId,
      customerOptions
    );
    modifiedErrors.customer = customerValidation.valid
      ? false
      : customerValidation.helperText;

    modifiedErrors.pets =
      selectedAppointment.petIds.length !== 0
        ? false
        : 'Please select pet(s) from the dropdown';

    setAppointmentErrors({ ...modifiedErrors });
  };

  const addAppointment = () => {
    validateAppointmentForm();
  };

  const editAppointment = () => {
    validateAppointmentForm();
  };

  if (!tabLoaded && tabLoading) {
    setTabLoading(false);
    getAppointments();
    getAppointmentTypes();
    getCustomers();
  }

  // var [YYYY, MM, DD] = '2014-04-03'.split('-')
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <PetsCalendar
            appointments={appointments}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            getSelectedAppointment={getSelectedAppointment}
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
      {!petsLoading && (
        <AppointmentInformation
          openModal={openModal}
          setOpenModal={setOpenModal}
          appointment={selectedAppointment}
          setAppointment={setSelectedAppointment}
          addAppointment={addAppointment}
          editAppointment={editAppointment}
          errors={appointmentErrors}
          appointmentTypes={appointmentTypes}
          customers={customers}
          pets={pets}
          setPets={setPets}
          getPets={getPets}
          petsLoading={petsLoading}
          setPetsLoading={setPetsLoading}
        />
      )}
    </>
  );
};

export default Calendar;
