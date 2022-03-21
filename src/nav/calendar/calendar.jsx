/* eslint-disable promise/always-return */
import React, { useState } from 'react';
import { Grid, Backdrop, CircularProgress } from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import DeleteModal from '../../utils/deleteModal';
import PetsCalendar from './mainCalendar';
import DayCalendar from './dayCalendar';
import AppointmentInformation from './appointmentInformation';
import {
  validateInteger,
  validateTime,
  validateDate,
  validatePrice,
  validateInOptions,
} from '../../utils/formValidator';
import Alert from '../../utils/alert';

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
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [petsLoading, setPetsLoading] = useState(false);
  const [calendarDeleteModalOpen, setCalendarDeleteModalOpen] = useState(false);

  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [pets, setPets] = useState([]);

  // blank appointment values
  const newAppointment = {
    appointmentDate: selectedDate,
    appointmentTypeId: '',
    customerId: '',
    petIds: [],
    startTime: '',
    length: '',
    price: '',
    notes: '',
    isComplete: 0,
    renderType: 'New',
  };

  // blank form errors
  const defaultAppointmentErrors = {
    date: false,
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
        const newAppointments = response.data;
        newAppointments.forEach((appointment) => {
          // format date
          const [DD, MM, YYYY] = appointment.appointmentDate.split('/');
          appointment.appointmentDate = new Date(YYYY, MM, DD).setMonth(MM - 1);
          // add start for react-big-calendar
          appointment.start = new Date(
            `${YYYY}-${MM}-${DD}T${appointment.startTime}`
          );
          // add end for react-big-calendar
          appointment.end = new Date(
            new Date(`${YYYY}-${MM}-${DD}T${appointment.startTime}`).getTime() +
              appointment.length * 60000
          );
          // add title for react-big-calendar
          appointment.title = `${appointment.appointmentType.appointmentTypeName} - ${appointment.customer.surname}`;
          // format price
          appointment.price = Number(appointment.price).toFixed(2);
        });
        setAppointments(newAppointments);
        setTabLoaded(true);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        setTabLoaded(true);
        setAlertMessage('Something went wrong. Please try again later.');
        setAlertOpen(true);
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
        // eslint-disable-next-line no-console
        console.log(error);
        setTabLoaded(true);
        setAlertMessage('Something went wrong. Please try again later.');
        setAlertOpen(true);
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
        // eslint-disable-next-line no-console
        console.log(error);
        setTabLoaded(true);
        setAlertMessage('Something went wrong. Please try again later.');
        setAlertOpen(true);
      });
  };

  // get pets for customerId
  const getPets = (customerId) => {
    axios
      .get(`/Pets/GetPets?customerId=${customerId}`)
      .then((response) => {
        setPets(response.data);
        setPetsLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        setAlertMessage('Something went wrong. Please try again later.');
        setAlertOpen(true);
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

  // validate form
  const validateAppointmentForm = () => {
    const modifiedErrors = appointmentErrors;

    const dateValidation = validateDate(selectedAppointment.appointmentDate);
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

    const customerOptions = customers.map((type) => type.customerId);
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

  // add appointment
  const addAppointment = () => {
    validateAppointmentForm();
    // if no errors
    if (
      appointmentErrors.date === false &&
      appointmentErrors.appointmentType === false &&
      appointmentErrors.customer === false &&
      appointmentErrors.pets === false &&
      appointmentErrors.startTime === false &&
      appointmentErrors.length === false &&
      appointmentErrors.price === false
    ) {
      setOpenModal(false);
      // delete extra data
      const appointmentToPost = { ...selectedAppointment };
      delete appointmentToPost.renderType;
      delete appointmentToPost.start;
      delete appointmentToPost.end;
      delete appointmentToPost.title;
      // format data
      appointmentToPost.length = parseInt(appointmentToPost.length, 10);
      appointmentToPost.price = parseFloat(appointmentToPost.price);
      appointmentToPost.appointmentDate = format(
        appointmentToPost.appointmentDate,
        'dd/MM/yyyy'
      );
      if (appointmentToPost.notes.length === 0) {
        delete appointmentToPost.notes;
      }
      appointmentToPost.petIds = JSON.stringify(appointmentToPost.petIds);
      setTabLoaded(false);
      axios
        .post('/Appointments/PostAppt', null, {
          params: appointmentToPost,
        })
        .then((response) => {
          getAppointments();
          setSelectedAppointment(newAppointment);
          setAlertMessage('Appointment added successfully!');
          setAlertOpen(true);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
          setOpenModal(true);
          setAlertMessage('Something went wrong. Please try again later.');
          setAlertOpen(true);
        });
    }
  };

  // edit appointment
  const editAppointment = () => {
    validateAppointmentForm();
    // if no errors
    if (
      appointmentErrors.date === false &&
      appointmentErrors.appointmentType === false &&
      appointmentErrors.customer === false &&
      appointmentErrors.pets === false &&
      appointmentErrors.startTime === false &&
      appointmentErrors.length === false &&
      appointmentErrors.price === false
    ) {
      setOpenModal(false);
      // delete extra data
      const appointmentToPatch = { ...selectedAppointment };
      delete appointmentToPatch.renderType;
      delete appointmentToPatch.start;
      delete appointmentToPatch.end;
      delete appointmentToPatch.title;
      // format data
      appointmentToPatch.length = parseInt(appointmentToPatch.length, 10);
      appointmentToPatch.price = parseFloat(appointmentToPatch.price);
      appointmentToPatch.appointmentDate = format(
        appointmentToPatch.appointmentDate,
        'dd/MM/yyyy'
      );
      if (appointmentToPatch.notes.length === 0) {
        delete appointmentToPatch.notes;
      }
      appointmentToPatch.petIds = JSON.stringify(appointmentToPatch.petIds);
      setTabLoaded(false);
      axios
        .patch('/Appointments/PatchAppt', null, {
          params: appointmentToPatch,
        })
        .then((response) => {
          getAppointments();
          setSelectedAppointment(newAppointment);
          setAlertMessage('Appointment updated successfully!');
          setAlertOpen(true);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
          setOpenModal(true);
          setAlertMessage('Something went wrong. Please try again later.');
          setAlertOpen(true);
        });
    }
  };

  // deletes selected apppointment from database
  const deleteAppointment = () => {
    setCalendarDeleteModalOpen(false);
    setTabLoaded(false);
    setOpenModal(false);
    axios
      .delete(
        `/Appointments/DeleteAppt?appointmentId=${selectedAppointment.appointmentId}`
      )
      .then((response) => {
        getAppointments();
        setSelectedAppointment(newAppointment);
        setAlertMessage('Appointment deleted successfully!');
        setAlertOpen(true);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        setOpenModal(true);
        setAlertMessage('Something went wrong. Please try again later.');
        setAlertOpen(true);
      });
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
      <Backdrop className="loading" open={!tabLoaded}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
      <AppointmentInformation
        openModal={openModal}
        setOpenModal={setOpenModal}
        appointment={selectedAppointment}
        setAppointment={setSelectedAppointment}
        addAppointment={addAppointment}
        editAppointment={editAppointment}
        deleteAppointment={() => setCalendarDeleteModalOpen(true)}
        errors={appointmentErrors}
        appointmentTypes={appointmentTypes}
        customers={customers}
        pets={pets}
        setPets={setPets}
        getPets={getPets}
        petsLoading={petsLoading}
        setPetsLoading={setPetsLoading}
      />
      {calendarDeleteModalOpen && (
        <DeleteModal
          setOpenModal={setCalendarDeleteModalOpen}
          deleteFunction={deleteAppointment}
        />
      )}
      {alertOpen && (
        <Alert setOpenModal={setAlertOpen} message={alertMessage} />
      )}
    </>
  );
};

export default Calendar;
