/* eslint-disable promise/always-return */
import React, { useState } from 'react';
import { Grid, Paper, Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import {
  validateEmail,
  validatePhoneNumber,
  validateRequired,
} from '../../utils/formValidator';
import CustomerList from './customerList';
import CustomerInformation from './customerInformation';
import DeleteModal from '../../utils/deleteModal';
import Alert from '../../utils/alert';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [tabLoading, setTabLoading] = useState(true);
  const [tabLoaded, setTabLoaded] = useState(false);
  const [petTypes, setPetTypes] = useState([]);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [customerDeleteModalOpen, setCustomerDeleteModalOpen] = useState(false);
  // const [customers, setCustomers] = useState([
  //   {
  //     id: 0,
  //     firstName: 'Abigail',
  //     surname: 'Shoulders',
  //     email: 'a@a.com',
  //     phone: ['012345678'],
  //     notes: '',
  //     pets: [
  //       {
  //         name: 'Pet 1',
  //         petType: 'Option 1',
  //         breed: '',
  //         dob: '01/01/2001',
  //         notes: 'Notes',
  //       },
  //     ],
  //   },
  //   {
  //     id: 1,
  //     firstName: 'Jamie',
  //     surname: 'Sykes',
  //     email: 'b@b.com',
  //     phone: ['123456789', '234567890'],
  //     notes: '',
  //     pets: [],
  //   },
  //   {
  //     id: 2,
  //     firstName: 'Michael',
  //     surname: 'Harvey',
  //     email: 'c@c.com',
  //     phone: [],
  //     notes: '',
  //     pets: [
  //       {
  //         name: 'Pet 2',
  //         petType: 'Option 2',
  //         breed: 'Tabby',
  //         dob: '01/02/2003',
  //         notes: '',
  //       },
  //     ],
  //   },
  // ]);

  // get customers from database
  const getCustomers = () => {
    axios
      .get('/Customers/GetCustomers')
      .then((response) => {
        const newCustomers = response.data;
        newCustomers.forEach((customer) => {
          customer.pets.forEach((pet) => {
            if (pet.petBirthday) {
              const [DD, MM, YYYY] = pet.petBirthday.split('/');
              pet.petBirthday = new Date(YYYY, MM, DD).setMonth(MM - 1);
            }
          });
        });
        setCustomers(newCustomers);
        setTabLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setTabLoaded(true);
        setAlertMessage('Something went wrong. Please try again later.');
        setAlertOpen(true);
      });
  };

  // get pet types from database
  const getPetTypes = () => {
    axios
      .get('/Pets/GetPetTypes')
      .then((response) => {
        setPetTypes(response.data);
        setTabLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setTabLoaded(true);
        setAlertMessage('Something went wrong. Please try again later.');
        setAlertOpen(true);
      });
  };

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // empty form for new customer
  const newCustomer = {
    forename: '',
    surname: '',
    email: '',
    phoneNumbers: [],
    notes: '',
    renderType: 'Add',
    pets: [],
  };

  // blank errors
  const defaultErrors = {
    firstName: false,
    surname: false,
    email: false,
    phone: [],
  };

  const [errors, setErrors] = useState(defaultErrors);

  const getSelectedCustomer = (customerID) => {
    // get customer from database
    const customer = customers.find((o) => o.customerId === customerID);
    customer.renderType = 'Edit';
    setSelectedCustomer({ ...customer });

    const modifiedErrors = defaultErrors;
    // eslint-disable-next-line prefer-spread
    modifiedErrors.phone = Array.apply(
      null,
      Array(customer.phoneNumbers.length)
    ).map((_) => false);
    setErrors({ ...modifiedErrors });
  };

  // validate form
  const validateForm = () => {
    const modifiedErrors = errors;
    const firstNameValidation = validateRequired(selectedCustomer.forename);
    modifiedErrors.firstName = firstNameValidation.valid
      ? false
      : firstNameValidation.helperText;

    const surnameValidation = validateRequired(selectedCustomer.surname);
    modifiedErrors.surname = surnameValidation.valid
      ? false
      : surnameValidation.helperText;

    const emailValidation = validateEmail(selectedCustomer.email);
    modifiedErrors.email =
      emailValidation.valid || selectedCustomer.email.length === 0
        ? false
        : emailValidation.helperText;

    modifiedErrors.phone = [];
    let phoneValidation;
    selectedCustomer.phoneNumbers.forEach((phone) => {
      phoneValidation = validatePhoneNumber(phone);
      modifiedErrors.phone.push(
        phoneValidation.valid ? false : phoneValidation.helperText
      );
    });

    setErrors({ ...modifiedErrors });
  };

  // adds selected customer to database
  const handlePets = (message) => {
    const postParams = {};
    if (selectedCustomer.customerId) {
      postParams.customerId = selectedCustomer.customerId;
    }
    const petsToPost = [...selectedCustomer.pets];
    petsToPost.forEach((pet) => {
      if (pet.petBirthday) {
        pet.petBirthday = format(pet.petBirthday, 'dd/MM/yyyy');
      }
    });
    const newPets = JSON.stringify(petsToPost);
    postParams.pets = newPets;
    axios
      .post('/Pets/PostPet', null, {
        params: postParams,
      })
      .then((response) => {
        getCustomers();
        setSelectedCustomer(null);
        setAlertMessage(`Customer ${message} successfully!`);
        setAlertOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setTabLoaded(true);
        setAlertMessage('Something went wrong. Please try again later.');
        setAlertOpen(true);
      });
  };

  // adds selected customer to database
  const addCustomer = () => {
    // validate form data
    validateForm();
    const phoneNumberErrors = errors.phone.filter((number) => number !== false);
    // check no errors
    if (
      errors.firstName === false &&
      errors.surname === false &&
      errors.email === false &&
      phoneNumberErrors.length === 0
    ) {
      const customerToPost = { ...selectedCustomer };
      delete customerToPost.renderType;
      if (customerToPost.email.length === 0) {
        delete customerToPost.email;
      }
      if (customerToPost.notes.length === 0) {
        delete customerToPost.notes;
      }
      if (customerToPost.phoneNumbers.length > 0) {
        customerToPost.phoneNumbers = JSON.stringify(
          customerToPost.phoneNumbers
        );
      }
      setTabLoaded(false);
      axios
        .post('/Customers/PostCustomer', null, {
          params: customerToPost,
        })
        .then((response) => {
          handlePets('added');
          getCustomers();
          setSelectedCustomer(null);
        })
        .catch((error) => {
          console.log(error);
          getCustomers();
          setTabLoaded(true);
          setAlertMessage('Something went wrong. Please try again later.');
          setAlertOpen(true);
        });
    }
  };

  // update selected customer in database
  const updateCustomer = () => {
    validateForm();
    const phoneNumberErrors = errors.phone.filter((number) => number !== false);
    if (
      errors.firstName === false &&
      errors.surname === false &&
      errors.email === false &&
      phoneNumberErrors.length === 0
    ) {
      const customerToPatch = { ...selectedCustomer };
      delete customerToPatch.renderType;
      if (customerToPatch.email.length === 0) {
        delete customerToPatch.email;
      }
      if (customerToPatch.notes.length === 0) {
        delete customerToPatch.notes;
      }
      if (customerToPatch.phoneNumbers.length > 0) {
        customerToPatch.phoneNumbers = JSON.stringify(
          customerToPatch.phoneNumbers
        );
      }
      setTabLoaded(false);
      axios
        .patch('/Customers/PatchCustomer', null, {
          params: customerToPatch,
        })
        .then((response) => {
          handlePets('updated');
          getCustomers();
          setSelectedCustomer(null);
        })
        .catch((error) => {
          console.log(error);
          setTabLoaded(true);
          setAlertMessage('Something went wrong. Please try again later.');
          setAlertOpen(true);
        });
    }
  };

  // deletes selected customer from database
  const deleteCustomer = () => {
    setTabLoaded(false);
    axios
      .delete(
        `/Customers/DeleteCustomer?customerId=${selectedCustomer.customerId}`
      )
      .then((response) => {
        getCustomers();
        setCustomerDeleteModalOpen(false);
        setSelectedCustomer(null);
        setAlertMessage('Customer deleted successfully!');
        setAlertOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setAlertMessage('Something went wrong. Please try again later.');
        setAlertOpen(true);
      });
  };

  if (tabLoading) {
    setTabLoading(false);
    getCustomers();
    getPetTypes();
  }

  return (
    <>
      <Backdrop className="loading" open={!tabLoaded}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CustomerList
            customers={customers}
            getSelectedCustomer={getSelectedCustomer}
            addCustomer={() => {
              setSelectedCustomer(newCustomer);
              setErrors(defaultErrors);
            }}
          />
        </Grid>
        <Grid item xs={9}>
          <Paper className="paper paper2" variant="outlined">
            {selectedCustomer && (
              <CustomerInformation
                customer={selectedCustomer}
                setCustomer={setSelectedCustomer}
                petTypes={petTypes}
                addCustomer={addCustomer}
                updateCustomer={updateCustomer}
                deleteCustomer={() => setCustomerDeleteModalOpen(true)}
                errors={errors}
                setErrors={setErrors}
                setAlertOpen={setAlertOpen}
                setAlertMessage={setAlertMessage}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
      {customerDeleteModalOpen && (
        <DeleteModal
          setOpenModal={setCustomerDeleteModalOpen}
          deleteFunction={deleteCustomer}
        />
      )}
      {alertOpen && (
        <Alert setOpenModal={setAlertOpen} message={alertMessage} />
      )}
    </>
  );
};

export default Customers;
