import React, { useState } from 'react';
import {
  Paper,
  Divider,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const RequestInformation = () => {
  const [request, setRequest] = useState({
    name: '',
    email: '',
    phone: '',
    communication: '',
    petType: '',
    petBreed: '',
    appointmentType: '',
    notes: '',
    completed: false,
  });

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  const changeCompleted = (completed) => {
    const modifiedRequest = request;
    modifiedRequest.completed = completed;
    setRequest({ ...modifiedRequest });
  };

  return (
    <Paper className="paper paper2 overflow" variant="outlined">
      <h2 className="heading">Request</h2>
      <StyledDivider />

      {/* Customer form */}
      <Box component="form" autoComplete="off">
        <TextField
          id="name"
          label="Name"
          value={request.name}
          className="formField"
          fullWidth
          disabled
        />
        <TextField
          id="email"
          label="Email Address"
          value={request.email}
          className="formField"
          fullWidth
          disabled
        />
        <TextField
          id="phone"
          label="Phone Number"
          value={request.phone}
          className="formField"
          fullWidth
          disabled
        />
        <TextField
          id="name"
          label="Preferred method of communication"
          value={request.communication}
          className="formField"
          fullWidth
          disabled
        />
        <TextField
          id="name"
          label="Pet Type"
          value={request.petType}
          className="formField"
          fullWidth
          disabled
        />
        <TextField
          id="name"
          label="Pet Breed"
          value={request.petBreed}
          className="formField"
          fullWidth
          disabled
        />
        <TextField
          id="name"
          label="Appointment Type"
          value={request.appointmentType}
          className="formField"
          fullWidth
          disabled
        />
        <TextField
          id="notes"
          label="Notes"
          className="formField"
          minRows={4}
          multiline
          fullWidth
          disabled
        />
        <FormControlLabel
          control={<Checkbox checked={!!request.completed} />}
          label="Completed"
          disabled
        />
        <Button
          className="primary floatRight"
          variant="contained"
          disabled={request.completed}
          onClick={() => changeCompleted(true)}
        >
          Mark as complete
        </Button>
        <Button
          className="secondary floatRight buttonMargin"
          variant="contained"
          disabled={!request.completed}
          onClick={() => changeCompleted(false)}
        >
          Mark as incomplete
        </Button>
      </Box>
    </Paper>
  );
};

export default RequestInformation;
