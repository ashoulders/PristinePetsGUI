import React, { useState } from 'react';
import { Button, Paper } from '@mui/material';
import {
  validateEmail,
  validatePhoneNumber,
  validateRequired,
  validateTime,
} from '../../utils/formValidator';
import WebsiteInformation from './websiteInformation';
import OpeningHours from './openingHours';

const Website = () => {
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

  const [errors, setErrors] = useState({
    address1: false,
    town: false,
    county: false,
    postcode: false,
    phoneNumber: false,
    email: false,
    // eslint-disable-next-line prefer-spread
    openingHours: Array.apply(null, Array(7)).map((_) => [false, false]),
  });

  const updateWebsite = () => {
    const modifiedErrors = errors;
    const address1Validation = validateRequired(website.address1);
    modifiedErrors.address1 = address1Validation.valid
      ? false
      : address1Validation.helperText;

    const townValidation = validateRequired(website.town);
    modifiedErrors.town = townValidation.valid
      ? false
      : townValidation.helperText;

    // TODO: postcode validation
    const postcodeValidation = validateRequired(website.postcode);
    modifiedErrors.postcode = postcodeValidation.valid
      ? false
      : postcodeValidation.helperText;

    const countyValidation = validateRequired(website.county);
    modifiedErrors.county = countyValidation.valid
      ? false
      : countyValidation.helperText;

    const phoneNumberValidation = validatePhoneNumber(website.phoneNumber);
    modifiedErrors.phoneNumber = phoneNumberValidation.valid
      ? false
      : phoneNumberValidation.helperText;

    const emailValidation = validateEmail(website.email);
    modifiedErrors.email = phoneNumberValidation.valid
      ? false
      : emailValidation.helperText;

    let openingHoursValidation;
    let closingHoursValidation;
    openingHours.forEach((day, index) => {
      if (day.closed) {
        modifiedErrors[index] = [false, false];
      } else {
        openingHoursValidation = validateTime(day.openingTime);
        modifiedErrors.openingHours[index][0] = openingHoursValidation.valid
          ? false
          : openingHoursValidation.helperText;
        closingHoursValidation = validateTime(day.closingTime);
        modifiedErrors.openingHours[index][1] = closingHoursValidation.valid
          ? false
          : closingHoursValidation.helperText;
      }
    });

    setErrors({ ...modifiedErrors });
  };

  return (
    <Paper className="paper paper2 overflow" variant="outlined">
      <WebsiteInformation
        website={website}
        setWebsite={setWebsite}
        errors={errors}
      />
      <OpeningHours
        openingHours={openingHours}
        setOpeningHours={setOpeningHours}
        errors={errors}
      />
      <Button
        className="primary floatRight"
        variant="contained"
        onClick={updateWebsite}
      >
        Confirm
      </Button>
    </Paper>
  );
};

export default Website;
