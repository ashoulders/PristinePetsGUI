import React, { useState } from 'react';
import { Paper, Divider, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import OpeningHours from './openingHours';

const WebsiteInformation = () => {
  const [website, setWebsite] = useState({
    address1: '',
    address2: '',
    town: '',
    county: '',
    postcode: '',
    phoneNumber: '',
    email: '',
  });
  const [openingHours, setOpeningHours] = useState([
    {
      day: 'Monday',
      closed: false,
      openingTime: '',
      closingTime: '',
    },
    {
      day: 'Tuesday',
      closed: false,
      openingTime: '',
      closingTime: '',
    },
    {
      day: 'Wednesday',
      closed: true,
      openingTime: '',
      closingTime: '',
    },
    {
      day: 'Thursday',
      closed: false,
      openingTime: '',
      closingTime: '',
    },
    {
      day: 'Friday',
      closed: false,
      openingTime: '',
      closingTime: '',
    },
    {
      day: 'Saturday',
      closed: false,
      openingTime: '',
      closingTime: '',
    },
    {
      day: 'Sunday',
      closed: true,
      openingTime: '',
      closingTime: '',
    },
  ]);

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
        />
      </Box>
    </>
  );
};

export default WebsiteInformation;
