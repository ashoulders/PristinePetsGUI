import React, { useState } from 'react';
import {
  Paper,
  Divider,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const AppointmentType = () => {
  const [appointmentType, setAppointmentType] = useState({
    name: '',
    pricePerHour: '',
  });

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  const handleChange = (event) => {
    const modifiedAppointmentType = appointmentType;
    modifiedAppointmentType[event.target.id] = event.target.value;
    setAppointmentType({ ...modifiedAppointmentType });
  };

  return (
    <Paper className="paper paper2 paper3 overflow" variant="outlined">
      <h2 className="heading">Appointment Type</h2>
      <StyledDivider />

      {/* Customer form */}
      <Box component="form" autoComplete="off">
        <TextField
          id="name"
          value={appointmentType.name}
          className="formField"
          fullWidth
          required
          label="Name"
          placeholder="Name"
          onChange={handleChange}
        />
        <TextField
          id="pricePerHour"
          value={appointmentType.pricePerHour}
          className="formField"
          fullWidth
          required
          label="Price per Hour"
          placeholder="10.00"
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}
        />
        <Button className="primary floatRight" variant="contained">
          Update
        </Button>
        <Button
          className="secondary floatRight buttonMargin"
          variant="contained"
        >
          Delete
        </Button>
      </Box>
    </Paper>
  );
};

export default AppointmentType;
