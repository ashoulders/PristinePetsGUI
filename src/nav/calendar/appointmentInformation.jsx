/* eslint-disable promise/always-return */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Modal,
  Divider,
  Box,
  TextField,
  Grid,
  ButtonGroup,
  Button,
  Autocomplete,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import TimeField from 'react-simple-timefield';
import PropTypes from 'prop-types';
import { LocalizationProvider } from '@mui/lab';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';

const AppointmentInformation = ({
  openModal,
  setOpenModal,
  appointment,
  setAppointment,
  addAppointment,
  editAppointment,
  deleteAppointment,
  errors,
  appointmentTypes,
  customers,
  pets,
  setPets,
  getPets,
  petsLoading,
}) => {
  // const [appointment, setAppointment] = useState({
  //   date: '08/03/2022',
  //   appointmentType: '',
  //   customer: '',
  //   pets: [],
  //   startTime: '',
  //   length: '',
  //   notes: '',
  // });

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // handle change in form
  const handleChange = (event) => {
    const modifiedAppointment = appointment;
    // get id of form field changed and set to new value
    modifiedAppointment[event.target.id] = event.target.value;
    setAppointment({ ...modifiedAppointment });
  };

  // handle calculation of price / length
  const handlePriceLength = () => {
    // if apppointment type and pets selected
    if (appointment.appointmentTypeId && appointment.petIds.length > 0) {
      const petList = JSON.stringify(appointment.petIds);
      // get data from db
      axios
        .get(
          `/Appointments/GetPrices?appointmentTypeId=${appointment.appointmentTypeId}&petIds=${petList}`
        )
        .then((response) => {
          // update appointment
          const modifiedAppointmentInformation = appointment;
          if (response.data?.length) {
            modifiedAppointmentInformation.length = response.data.length;
          } else {
            modifiedAppointmentInformation.length = 0;
          }
          if (response.data?.price) {
            modifiedAppointmentInformation.price = response.data.price;
          } else {
            modifiedAppointmentInformation.price = 0;
          }
          setAppointment({ ...modifiedAppointmentInformation });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  };

  // handle change of appointment type
  const handleAppointmentTypeChange = (event, newValue) => {
    const modifiedAppointmentInformation = appointment;
    if (newValue?.appointmentTypeId) {
      modifiedAppointmentInformation.appointmentTypeId =
        newValue.appointmentTypeId;
    } else {
      modifiedAppointmentInformation.appointmentTypeId = '';
    }
    setAppointment({ ...modifiedAppointmentInformation });
    handlePriceLength();
  };

  // handle change of customer
  const handleCustomerChange = (event, newValue) => {
    const modifiedAppointmentInformation = appointment;
    if (newValue?.customerId) {
      modifiedAppointmentInformation.customerId = newValue.customerId;
      getPets(newValue.customerId);
    } else {
      modifiedAppointmentInformation.customerId = '';
      setPets([]);
    }
    setAppointment({ ...modifiedAppointmentInformation });
  };

  // handle change of pet
  const handlePetChange = (event, newValue) => {
    const modifiedAppointmentInformation = appointment;
    const modifiedPetInformation = [];
    newValue.forEach((value) => {
      if (value?.petId) {
        modifiedPetInformation.push(value.petId);
      }
    });
    modifiedAppointmentInformation.petIds = modifiedPetInformation;
    setAppointment({ ...modifiedAppointmentInformation });
    handlePriceLength();
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box component="form" autoComplete="off" sx={style}>
        {/* if editing appointment, show delete button */}
        {appointment.renderType === 'Edit' && (
          <Button
            className="secondary floatRight noHover"
            variant="contained"
            onClick={deleteAppointment}
          >
            Delete Appointment
          </Button>
        )}
        {/*  */}
        <h2>{appointment.renderType} Appointment</h2>
        <StyledDivider />
        <p>To select pet(s), first select a customer.</p>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* Appointment date field */}
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DesktopDatePicker
                label="Appointment Date"
                className="formField"
                inputFormat="dd/MM/yyyy"
                value={appointment.appointmentDate}
                placeholder="dd/mm/yyyy"
                onChange={(newValue) => {
                  const modifiedAppointment = appointment;
                  modifiedAppointment.appointmentDate = newValue;
                  setAppointment({ ...modifiedAppointment });
                }}
                renderInput={(params) => (
                  <TextField
                    className="formField"
                    {...params}
                    fullWidth
                    required
                    error={!!errors.date}
                    helperText={errors.date}
                  />
                )}
              />
            </LocalizationProvider>
            {/* Appointment type field */}
            <Autocomplete
              disablePortal
              id="appointmentType"
              className="formField"
              required
              fullWidth
              value={appointmentTypes.find(
                (o) => o.appointmentTypeId === appointment.appointmentTypeId
              )}
              onChange={handleAppointmentTypeChange}
              options={appointmentTypes}
              getOptionLabel={(option) => option.appointmentTypeName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Appointment Type"
                  error={!!errors.appointmentType}
                  helperText={errors.appointmentType}
                />
              )}
            />
            {/* Customer field */}
            <Autocomplete
              disablePortal
              id="customer"
              className="formField"
              required
              fullWidth
              value={customers.find(
                (o) => o.customerId === appointment.customerId
              )}
              onChange={handleCustomerChange}
              options={customers}
              getOptionLabel={(option) =>
                `${option.forename} ${option.surname}`
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Customer"
                  error={!!errors.customer}
                  helperText={errors.customer}
                />
              )}
            />
            {/* Pets field */}
            <Autocomplete
              disablePortal
              id="pets"
              className="formField"
              required
              fullWidth
              multiple
              disabled={pets.length === 0}
              loading={petsLoading}
              options={pets}
              value={appointment.petIds.map((pet) =>
                pets.find((o) => o.petId === pet)
              )}
              onChange={handlePetChange}
              getOptionLabel={(option) =>
                option?.petName ? option.petName : ''
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Pet(s)"
                  error={!!errors.pets}
                  helperText={errors.pets}
                />
              )}
            />
            {/* Start time field */}
            <TimeField
              id="startTime"
              input={
                <TextField
                  className="formField"
                  fullWidth
                  required
                  label="Start Time"
                />
              }
              value={appointment.startTime}
              onChange={handleChange}
              colon=":"
              error={!!errors.startTime}
              helperText={errors.startTime}
            />
            {/* Length field */}
            <TextField
              id="length"
              value={appointment.length}
              className="formField"
              fullWidth
              required
              type="number"
              label="Length"
              placeholder="30"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mins</InputAdornment>
                ),
              }}
              error={!!errors.length}
              helperText={errors.length}
            />
            {/* Price field */}
            <TextField
              id="price"
              value={appointment.price}
              className="formField"
              fullWidth
              required
              label="Price"
              placeholder="10.00"
              type="number"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">£</InputAdornment>
                ),
              }}
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>
          <Grid item xs={6}>
            {/* Notes field */}
            <TextField
              id="notes"
              value={appointment.notes}
              minRows={18.2}
              maxRows={18.2}
              multiline
              fullWidth
              label="Notes"
              placeholder="Notes"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup fullWidth>
              <Button
                className="secondary noHover"
                variant="contained"
                fullWidth
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
              {appointment.renderType === 'New' ? (
                <Button
                  className="primary noHover"
                  variant="contained"
                  fullWidth
                  onClick={addAppointment}
                >
                  Add Appointment
                </Button>
              ) : (
                <>
                  <Button
                    className="primary noHover"
                    variant="contained"
                    fullWidth
                    onClick={editAppointment}
                  >
                    Confirm
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

AppointmentInformation.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  appointment: PropTypes.object.isRequired,
  setAppointment: PropTypes.func.isRequired,
  addAppointment: PropTypes.func.isRequired,
  editAppointment: PropTypes.func.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  appointmentTypes: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  customers: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pets: PropTypes.array.isRequired,
  setPets: PropTypes.func.isRequired,
  getPets: PropTypes.func.isRequired,
  petsLoading: PropTypes.bool.isRequired,
  setPetsLoading: PropTypes.func.isRequired,
};

export default AppointmentInformation;
