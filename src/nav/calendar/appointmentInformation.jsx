/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Paper,
  Divider,
  Box,
  TextField,
  Grid,
  IconButton,
  Button,
  Autocomplete,
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import TimeField from 'react-simple-timefield';

const AppointmentInformation = () => {
  const [appointment, setAppointment] = useState({
    appointmentType: '',
    customer: '',
    pets: [],
    startTime: '',
    length: '',
    notes: '',
  });

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  const handleChange = (event) => {
    const modifiedAppointment = appointment;
    modifiedAppointment[event.target.id] = event.target.value;
    setAppointment({ ...modifiedAppointment });
  };

  return (
    <Paper className="paper paper2" variant="outlined">
      <h2 className="heading">Appointment</h2>
      <StyledDivider />

      {/* Appointment form */}
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
                  fullWidth={false}
                  required
                  label="Start Time"
                />
              }
              value={appointment.startTime}
              onChange={handleChange}
              colon=":"
            />
            <TextField
              id="length"
              value={appointment.length}
              className="formField"
              fullWidth
              required
              label="Length"
              placeholder="30"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mins</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="notes"
              value={appointment.notes}
              // minRows={17}
              // maxRows={17}
              multiline
              fullWidth
              label="Notes"
              placeholder="Notes"
              onChange={handleChange}
            />
            <Button className="primary floatRight" variant="contained">
              Add Appointment
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AppointmentInformation;
