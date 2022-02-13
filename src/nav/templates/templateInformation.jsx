/* eslint-disable react/jsx-props-no-spreading */
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
  Autocomplete,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const TemplateInformation = () => {
  const [templateInformation, setTemplateInformation] = useState({
    name: '',
    appointmentType: '',
    petType: '',
    length: '',
  });

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  const handleChange = (event) => {
    const modifiedTemplateInformation = templateInformation;
    modifiedTemplateInformation[event.target.id] = event.target.value;
    setTemplateInformation({ ...modifiedTemplateInformation });
  };

  return (
    <Paper className="paper paper2 paper3 overflow" variant="outlined">
      <h2 className="heading">Template</h2>
      <StyledDivider />

      {/* Template form */}
      <Box component="form" autoComplete="off">
        <TextField
          id="name"
          value={templateInformation.name}
          className="formField"
          fullWidth
          required
          label="Name"
          placeholder="Name"
          onChange={handleChange}
        />
        <Autocomplete
          disablePortal
          id="appointmentType"
          className="formField"
          required
          fullWidth
          options={[]}
          renderInput={(params) => (
            <TextField {...params} label="Appointment Type" />
          )}
        />
        <Autocomplete
          disablePortal
          id="petType"
          className="formField"
          required
          fullWidth
          options={[]}
          renderInput={(params) => <TextField {...params} label="Pet Type" />}
        />
        <TextField
          id="length"
          value={templateInformation.length}
          className="formField"
          fullWidth
          required
          label="Length"
          placeholder="30"
          onChange={handleChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">mins</InputAdornment>,
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

export default TemplateInformation;
