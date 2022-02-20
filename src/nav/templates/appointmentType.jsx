import React, { useMemo, useState } from 'react';
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
import PropTypes from 'prop-types';

const AppointmentType = ({ appointmentType, setAppointmentType }) => {
  // const [appointmentType, setAppointmentType] = useState({
  //   name: '',
  //   pricePerHour: '',
  // });

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  const handleChange = (event) => {
    const modifiedAppointmentType = appointmentType;
    modifiedAppointmentType[event.target.id] = event.target.value;
    setAppointmentType({ ...modifiedAppointmentType });
  };

  // gets correct buttons based on the render type of the selected appointment type
  const buttons = useMemo(() => {
    if (appointmentType.renderType === 'Add') {
      return (
        <Button className="primary floatRight" variant="contained">
          Add Appointment Type
        </Button>
      );
    }
    return (
      <>
        <Button className="primary floatRight" variant="contained">
          Update
        </Button>
        <Button
          className="secondary floatRight buttonMargin"
          variant="contained"
        >
          Delete
        </Button>
      </>
    );
  }, [appointmentType]);

  return (
    <>
      <h2 className="heading">{appointmentType.renderType} Appointment Type</h2>
      <StyledDivider />

      {/* Appointment type form */}
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
        {buttons}
      </Box>
    </>
  );
};

AppointmentType.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  appointmentType: PropTypes.object.isRequired,
  setAppointmentType: PropTypes.func.isRequired,
};

export default AppointmentType;
