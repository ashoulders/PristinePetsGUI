/* eslint-disable promise/always-return */
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
import PropTypes from 'prop-types';
import axios from 'axios';

const RequestInformation = ({ request, setRequest, updateRequest }) => {
  // const [request, setRequest] = useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  //   communication: '',
  //   petType: '',
  //   petBreed: '',
  //   appointmentType: '',
  //   notes: '',
  //   completed: false,
  // });

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  // const changeCompleted = (completed) => {
  //   const modifiedRequest = request;
  //   modifiedRequest.completed = completed;
  //   setRequest({ ...modifiedRequest });
  //   axios
  //     .post('/requests', {
  //       requestID: request.requestID,
  //       completed,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  return (
    <>
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
        />
        <TextField
          id="email"
          label="Email Address"
          value={request.email}
          className="formField"
          fullWidth
        />
        <TextField
          id="phone"
          label="Phone Number"
          value={request.phone}
          className="formField"
          fullWidth
        />
        <TextField
          id="contactMethod"
          label="Preferred method of communication"
          value={request.contactMethod}
          className="formField"
          fullWidth
        />
        <TextField
          id="petType"
          label="Pet Type"
          value={request.petType}
          className="formField"
          fullWidth
        />
        <TextField
          id="breed"
          label="Pet Breed"
          value={request.breed}
          className="formField"
          fullWidth
        />
        <TextField
          id="appointmentType"
          label="Appointment Type"
          value={request.appointmentType}
          className="formField"
          fullWidth
        />
        <TextField
          id="notes"
          label="Notes"
          className="formField"
          value={request.notes}
          minRows={4}
          fullWidth
          multiline
        />
        <FormControlLabel
          control={<Checkbox checked={!!request.completed} />}
          label="Completed"
        />
        <Button
          className="primary floatRight"
          variant="contained"
          disabled={request.completed}
          onClick={() => updateRequest(1)}
        >
          Mark as complete
        </Button>
        <Button
          className="secondary floatRight buttonMargin"
          variant="contained"
          disabled={!request.completed}
          onClick={() => updateRequest(0)}
        >
          Mark as incomplete
        </Button>
      </Box>
    </>
  );
};

RequestInformation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  request: PropTypes.object.isRequired,
  setRequest: PropTypes.func.isRequired,
  updateRequest: PropTypes.func.isRequired,
};

export default RequestInformation;
