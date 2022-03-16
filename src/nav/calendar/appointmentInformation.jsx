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
  errors,
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

  const handleChange = (event) => {
    const modifiedAppointment = appointment;
    modifiedAppointment[event.target.id] = event.target.value;
    setAppointment({ ...modifiedAppointment });
  };

  return (
    // <Paper className="paper paper2 paper3 overflow" variant="outlined">
    //   <h2 className="heading">Appointment</h2>
    //   <StyledDivider />

    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box component="form" autoComplete="off" sx={style}>
        <h2>New Appointment</h2>
        <StyledDivider />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DesktopDatePicker
                label="Date"
                className="formField"
                inputFormat="dd/MM/yyyy"
                value={appointment.date}
                placeholder="dd/mm/yyyy"
                onChange={(newValue) => {
                  const modifiedAppointment = appointment;
                  modifiedAppointment.date = newValue;
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
            <Autocomplete
              disablePortal
              id="appointmentType"
              className="formField"
              required
              fullWidth
              options={[]}
              renderInput={(params) => (
                <TextField {...params} required label="Appointment Type" />
              )}
            />
            <Autocomplete
              disablePortal
              id="customer"
              className="formField"
              required
              fullWidth
              options={[]}
              renderInput={(params) => (
                <TextField {...params} required label="Customer" />
              )}
            />
            <Autocomplete
              disablePortal
              id="pets"
              className="formField"
              required
              fullWidth
              multiple
              options={[]}
              renderInput={(params) => (
                <TextField {...params} required label="Pet(s)" />
              )}
            />
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
              {appointment.renderType === 'Add' ? (
                <Button
                  className="primary noHover"
                  variant="contained"
                  fullWidth
                  onClick={addAppointment}
                >
                  Add Appointment
                </Button>
              ) : (
                <Button
                  className="primary noHover"
                  variant="contained"
                  fullWidth
                  onClick={editAppointment}
                >
                  Edit Appointment
                </Button>
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
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
};

export default AppointmentInformation;
