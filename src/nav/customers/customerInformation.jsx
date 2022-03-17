import React, { useState, useMemo } from 'react';
import {
  Paper,
  Divider,
  Box,
  TextField,
  Grid,
  IconButton,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import PetInformation from './petInformation';

const CustomerInformation = ({
  customer,
  setCustomer,
  addCustomer,
  updateCustomer,
  errors,
  setErrors,
}) => {
  // const [customer, setCustomer] = useState({
  //   firstName: '',
  //   surname: '',
  //   email: '',
  //   phone: [],
  //   notes: '',
  // });

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  const handleChange = (event) => {
    const modifiedCustomer = customer;
    modifiedCustomer[event.target.id] = event.target.value;
    setCustomer({ ...modifiedCustomer });
  };

  const handlePhoneChange = (event) => {
    const modifiedCustomer = customer;
    modifiedCustomer.phone[event.target.id] = event.target.value;
    setCustomer({ ...modifiedCustomer });
  };

  const addPhone = () => {
    const modifiedCustomer = customer;
    modifiedCustomer.phone.push('');
    setCustomer({ ...modifiedCustomer });
    const modifiedErrors = errors;
    modifiedErrors.phone.push(false);
    setErrors(modifiedErrors);
  };

  const deletePhone = (event) => {
    let { target } = event;
    let { id } = target;
    let tries = 0;
    while (!id && tries < 5) {
      target = target.parentElement;
      id = target.id;
      tries += 1;
    }
    id = id.slice(0, -1);
    const modifiedCustomer = customer;
    modifiedCustomer.phone.splice(id, 1);
    setCustomer({ ...modifiedCustomer });

    const modifiedErrors = errors;
    modifiedErrors.phone.splice(id, 1);
    setErrors(modifiedErrors);
  };

  // gets correct buttons based on the render type of the selected customer type
  const buttons = useMemo(() => {
    if (customer.renderType === 'Add') {
      return (
        <Button
          className="primary floatRight"
          variant="contained"
          onClick={addCustomer}
        >
          Add Customer
        </Button>
      );
    }
    return (
      <>
        <Button
          className="primary floatRight"
          variant="contained"
          onClick={updateCustomer}
        >
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
  }, [addCustomer, customer.renderType, updateCustomer]);

  return (
    <>
      <h2 className="heading">Customer</h2>
      <StyledDivider />

      {/* Customer form */}
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="forename"
              value={customer.forename}
              className="formField"
              fullWidth
              required
              label="First name"
              placeholder="First name"
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              id="surname"
              value={customer.surname}
              className="formField"
              fullWidth
              required
              label="Surname"
              placeholder="Surname"
              onChange={handleChange}
              error={!!errors.surname}
              helperText={errors.surname}
            />
            <TextField
              id="email"
              value={customer.email}
              fullWidth
              label="Email Address"
              placeholder="someone@example.com"
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            {/* Phone numbers */}
            <p>Phone Numbers</p>
            <div className="phoneNumbers">
              {customer.phone.map((number, index) => {
                return (
                  <div className="flexDiv">
                    <TextField
                      // In Javascript, 0 converts to an empty string
                      id={index === 0 ? '0' : index.toString()}
                      value={number}
                      className="formField"
                      label="Phone number"
                      fullWidth
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      onChange={handlePhoneChange}
                      error={!!errors.phone[index]}
                      helperText={errors.phone[index]}
                    />
                    <IconButton
                      // In Javascript, 0 converts to an empty string
                      id={index === 0 ? '0d' : `${index.toString()}d`}
                      className="secondary formButton"
                      variant="contained"
                      onClick={deletePhone}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                );
              })}
            </div>
            <Button
              className="primary"
              variant="contained"
              fullWidth
              onClick={addPhone}
            >
              <AddIcon />
            </Button>
            {/* Phone numbers end */}
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="notes"
              value={customer.notes}
              minRows={17}
              maxRows={17}
              multiline
              fullWidth
              label="Notes"
              placeholder="Notes"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Box>
      <PetInformation customer={customer} setCustomer={setCustomer} />
      {buttons}
    </>
  );
};

CustomerInformation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  customer: PropTypes.object.isRequired,
  setCustomer: PropTypes.func.isRequired,
  addCustomer: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default CustomerInformation;
