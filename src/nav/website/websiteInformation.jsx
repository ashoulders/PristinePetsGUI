import React, { useState } from 'react';
import { Divider, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const WebsiteInformation = ({ website, setWebsite, errors }) => {
  // const [website, setWebsite] = useState({
  //   address1: '',
  //   address2: '',
  //   town: '',
  //   county: '',
  //   postcode: '',
  //   phoneNumber: '',
  //   email: '',
  // });
  // const [openingHours, setOpeningHours] = useState([
  //   {
  //     day: 'Monday',
  //     closed: false,
  //     openingTime: '',
  //     closingTime: '',
  //   },
  //   {
  //     day: 'Tuesday',
  //     closed: false,
  //     openingTime: '',
  //     closingTime: '',
  //   },
  //   {
  //     day: 'Wednesday',
  //     closed: true,
  //     openingTime: '',
  //     closingTime: '',
  //   },
  //   {
  //     day: 'Thursday',
  //     closed: false,
  //     openingTime: '',
  //     closingTime: '',
  //   },
  //   {
  //     day: 'Friday',
  //     closed: false,
  //     openingTime: '',
  //     closingTime: '',
  //   },
  //   {
  //     day: 'Saturday',
  //     closed: false,
  //     openingTime: '',
  //     closingTime: '',
  //   },
  //   {
  //     day: 'Sunday',
  //     closed: true,
  //     openingTime: '',
  //     closingTime: '',
  //   },
  // ]);

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  const handleChange = (event) => {
    const modifiedWebsite = website;
    modifiedWebsite[event.target.id] = event.target.value;
    setWebsite({ ...modifiedWebsite });
  };

  return (
    <>
      <h2 className="heading">Website Information</h2>
      <StyledDivider />

      {/* Customer form */}
      <Box component="form" autoComplete="off">
        <TextField
          id="address1"
          value={website.address1}
          className="formField"
          fullWidth
          required
          label="Address Line 1"
          placeholder="AddressLine 1"
          onChange={handleChange}
          error={!!errors.address1}
          helperText={errors.address1}
        />
        <TextField
          id="address2"
          value={website.address2}
          className="formField"
          fullWidth
          label="Address Line 2"
          placeholder="AddressLine 2"
          onChange={handleChange}
        />
        <TextField
          id="town"
          value={website.town}
          className="formField"
          fullWidth
          required
          label="Town"
          placeholder="Town"
          onChange={handleChange}
          error={!!errors.town}
          helperText={errors.town}
        />
        <TextField
          id="county"
          value={website.county}
          className="formField"
          fullWidth
          required
          label="County"
          placeholder="County"
          onChange={handleChange}
          error={!!errors.county}
          helperText={errors.county}
        />
        <TextField
          id="postcode"
          value={website.postcode}
          className="formField"
          fullWidth
          required
          label="Postcode"
          placeholder="Postcode"
          onChange={handleChange}
          error={!!errors.postcode}
          helperText={errors.postcode}
        />
        <TextField
          id="phoneNumber"
          value={website.phoneNumber}
          className="formField"
          fullWidth
          required
          label="Phone Number"
          placeholder="hone Number"
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
        <TextField
          id="email"
          value={website.email}
          className="formField"
          fullWidth
          required
          label="Email"
          placeholder="Email"
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Box>
    </>
  );
};

WebsiteInformation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  website: PropTypes.object.isRequired,
  setWebsite: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
};

export default WebsiteInformation;
