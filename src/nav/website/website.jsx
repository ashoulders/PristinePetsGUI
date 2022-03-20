/* eslint-disable promise/always-return */
import React, { useState } from 'react';
import { Button, Paper, Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import {
  validateEmail,
  validatePhoneNumber,
  validateRequired,
  validateTime,
} from '../../utils/formValidator';
import WebsiteInformation from './websiteInformation';
import OpeningHours from './openingHours';
import Alert from '../../utils/alert';

const Website = () => {
  const [website, setWebsite] = useState({});
  // const [website, setWebsite] = useState({
  //   address1: '',
  //   address2: '',
  //   town: '',
  //   county: '',
  //   postcode: '',
  //   phoneNumber: '',
  //   email: '',
  // });

  const [openingHours, setOpeningHours] = useState([]);
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

  const [tabLoading, setTabLoading] = useState(true);
  const [tabLoaded, setTabLoaded] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // get website information from database
  const getWebsiteInfo = () => {
    axios
      .get('/WebsiteInfos/GetWebsiteInfos')
      .then((response) => {
        setOpeningHours(response.data[0].openingHours);
        delete response.data[0].openingHours;
        setWebsite(response.data[0]);
        setTabLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setTabLoaded(true);
        setAlertMessage('Something went wrong. Please try again later.');
        setAlertOpen(true);
      });
  };

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

  const validateWebsiteForm = () => {
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
    const postcodeValidation = validateRequired(website.postCode);
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

  const updateWebsite = () => {
    validateWebsiteForm();
    const openingHoursErrors = []
      .concat(...errors.openingHours)
      .filter((opening) => opening !== false);
    if (
      errors.address1 === false &&
      errors.town === false &&
      errors.county === false &&
      errors.postcode === false &&
      errors.phoneNumber === false &&
      errors.email === false &&
      openingHoursErrors.length === 0
    ) {
      const websiteToPatch = { ...website };
      if (websiteToPatch.address2.length === 0) {
        delete websiteToPatch.address2;
      }
      websiteToPatch.openingJson = JSON.stringify(openingHours);
      setTabLoaded(false);
      axios
        .patch('/WebsiteInfos/PatchWebsiteInfo', null, {
          params: websiteToPatch,
        })
        .then((response) => {
          getWebsiteInfo();
          setAlertMessage('Website updated successfully!');
          setAlertOpen(true);
        })
        .catch((error) => {
          console.log(error);
          setTabLoaded(true);
          setAlertMessage('Something went wrong. Please try again later.');
          setAlertOpen(true);
        });
    }
  };

  if (!tabLoaded && tabLoading) {
    setTabLoading(false);
    getWebsiteInfo();
  }

  return (
    <>
      <Backdrop className="loading" open={!tabLoaded}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
      {alertOpen && (
        <Alert setOpenModal={setAlertOpen} message={alertMessage} />
      )}
    </>
  );
};

export default Website;
