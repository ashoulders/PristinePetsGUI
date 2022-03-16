/* eslint-disable promise/always-return */
import React, { useState } from 'react';
import { Grid, Paper, Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import {
  validateInteger,
  validatePrice,
  validateRequired,
} from '../../utils/formValidator';
import AppointmentTypeList from './appointmentTypesList';
import AppointmentType from './appointmentType';
import TemplateList from './templatesList';
import TemplateInformation from './templateInformation';

const Templates = () => {
  // list of appointment types
  // const [appointmentTypes, setAppointmentTypes] = useState([
  //   { id: 0, name: 'Appointment Type 1', pricePerHour: 10 },
  //   { id: 1, name: 'Appointment Type 2', pricePerHour: 10 },
  //   { id: 2, name: 'Appointment Type 3', pricePerHour: 10 },
  //   { id: 3, name: 'Appointment Type 3', pricePerHour: 10 },
  //   { id: 4, name: 'Appointment Type 3', pricePerHour: 10 },
  //   { id: 5, name: 'Appointment Type 3', pricePerHour: 10 },
  //   { id: 6, name: 'Appointment Type 3', pricePerHour: 10 },
  //   { id: 7, name: 'Appointment Type 3', pricePerHour: 10 },
  //   { id: 8, name: 'Appointment Type 3', pricePerHour: 10 },
  //   { id: 9, name: 'Appointment Type 3', pricePerHour: 10 },
  //   { id: 10, name: 'Appointment Type 3', pricePerHour: 10 },
  // ]);

  const [appointmentTypes, setAppointmentTypes] = useState([]);
  // list of templates
  const [templates, setTemplates] = useState([
    // eslint-disable-next-line prettier/prettier
    { id: 0, name: 'Template 1', appointmentType: 'groom', petType: 'cat', length: 60 },
    // eslint-disable-next-line prettier/prettier
    { id: 1, name: 'Template 2', appointmentType: 'groom', petType: 'cat', length: 60 },
    // eslint-disable-next-line prettier/prettier
    { id: 2, name: 'Template 3', appointmentType: 'groom', petType: 'cat', length: 60 },
    // eslint-disable-next-line prettier/prettier
    { id: 3, name: 'Template 3', appointmentType: 'groom', petType: 'cat', length: 60 },
    // eslint-disable-next-line prettier/prettier
    { id: 4, name: 'Template 3', appointmentType: 'groom', petType: 'cat', length: 60 },
    // eslint-disable-next-line prettier/prettier
    { id: 5, name: 'Template 3', appointmentType: 'groom', petType: 'cat', length: 60 },
    // eslint-disable-next-line prettier/prettier
    { id: 6, name: 'Template 3', appointmentType: 'groom', petType: 'cat', length: 60 },
    // eslint-disable-next-line prettier/prettier
    { id: 7, name: 'Template 3', appointmentType: 'groom', petType: 'cat', length: 60 },
    // eslint-disable-next-line prettier/prettier
    { id: 8, name: 'Template 3', appointmentType: 'groom', petType: 'cat', length: 60 },
    // eslint-disable-next-line prettier/prettier
    { id: 9, name: 'Template 3', appointmentType: 'groom', petType: 'cat', length: 60 },
    // eslint-disable-next-line prettier/prettier
    { id: 10, name: 'Template 3', appointmentType: 'groom', petType: 'cat', length: 60 },
  ]);

  const getAppointmentTypes = () => {
    axios
      .get('/Appointments/GetApptTypes')
      .then((response) => {
        console.log(response.data);
        setAppointmentTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // empty form for a new appointment type
  const newAppointmentType = {
    appointmentTypeName: '',
    pricePerHour: '',
    description: '',
    renderType: 'Add',
  };

  const newTemplate = {
    name: '',
    appointmentType: '',
    petType: '',
    length: '',
    renderType: 'Add',
  };

  const [selectedAppointmentType, setSelectedAppointmentType] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [tabLoading, setTabLoading] = useState(true);
  const [tabLoaded, setTabLoaded] = useState(false);

  const defaultAppointmentTypeErrors = {
    name: false,
    pricePerHour: false,
  };

  const defaultTemplateErrors = {
    name: false,
    // appointmentType: false,
    // petType: false,
    length: false,
  };

  const [appointmentTypeErrors, setAppointmentTypeErrors] = useState(
    defaultAppointmentTypeErrors
  );

  const [templateErrors, setTemplateErrors] = useState(defaultTemplateErrors);

  const getSelectedAppointmentType = (appointmentTypeID) => {
    // get appointment type from database
    const appointmentType = appointmentTypes.find(
      (o) => o.appointmentTypeId === appointmentTypeID
    );
    appointmentType.renderType = 'Edit';
    setSelectedAppointmentType({ ...appointmentType });
    setAppointmentTypeErrors({ ...defaultAppointmentTypeErrors });
  };

  const getSelectedTemplate = (templateID) => {
    // get appointment type from database
    const template = templates.find((o) => o.id === templateID);
    template.renderType = 'Edit';
    setSelectedTemplate({ ...template });
    setTemplateErrors({ ...defaultTemplateErrors });
  };

  const validateAppointmentTypeForm = () => {
    const modifiedErrors = appointmentTypeErrors;
    const nameValidation = validateRequired(
      selectedAppointmentType.appointmentTypeName
    );
    modifiedErrors.name = nameValidation.valid
      ? false
      : nameValidation.helperText;

    const priceValidation = validatePrice(selectedAppointmentType.pricePerHour);
    modifiedErrors.pricePerHour = priceValidation.valid
      ? false
      : priceValidation.helperText;

    setAppointmentTypeErrors({ ...modifiedErrors });
  };

  const addAppointmentType = () => {
    validateAppointmentTypeForm();
    if (
      appointmentTypeErrors.name === false &&
      appointmentTypeErrors.pricePerHour === false
    ) {
      const appointmentToPost = { ...selectedAppointmentType };
      delete appointmentToPost.renderType;
      appointmentToPost.pricePerHour = parseFloat(
        appointmentToPost.pricePerHour
      );
      axios
        .post('/Appointments/PostApptType', null, {
          params: { jsonValue: appointmentToPost },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // setSelectedAppointmentType(newAppointmentType);
  };

  const updateAppointmentType = () => {
    validateAppointmentTypeForm();
  };

  const validateTemplateForm = () => {
    const modifiedErrors = templateErrors;
    const nameValidation = validateRequired(selectedTemplate.name);
    modifiedErrors.name = nameValidation.valid
      ? false
      : nameValidation.helperText;

    const lengthValidation = validateInteger(selectedTemplate.length);
    modifiedErrors.length = lengthValidation.valid
      ? false
      : lengthValidation.helperText;

    setTemplateErrors({ ...modifiedErrors });
  };

  const addTemplate = () => {
    validateTemplateForm();
    // setSelectedTemplate(newTemplate);
  };

  const updateTemplate = () => {
    validateTemplateForm();
    // setSelectedTemplate(newTemplate);
  };

  if (!tabLoaded && tabLoading) {
    setTabLoading(false);
    getAppointmentTypes();
    setTabLoaded(true);
  }

  return (
    <>
      <Backdrop className="loading" open={!tabLoaded}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container columnSpacing={0} rowSpacing={1}>
        <Grid item xs={3}>
          {/* List of appointment types */}
          <AppointmentTypeList
            appointmentTypes={appointmentTypes}
            getSelectedAppointmentType={getSelectedAppointmentType}
            addAppointmentType={() => {
              setSelectedAppointmentType({ ...newAppointmentType });
              setAppointmentTypeErrors({ ...defaultAppointmentTypeErrors });
            }}
          />
        </Grid>
        <Grid item xs={9}>
          {/* Details of selected appointment type */}
          <Paper className="paper paper2 paper3 overflow" variant="outlined">
            {selectedAppointmentType && (
              <AppointmentType
                appointmentType={selectedAppointmentType}
                setAppointmentType={setSelectedAppointmentType}
                addAppointmentType={addAppointmentType}
                updateAppointmentType={updateAppointmentType}
                errors={appointmentTypeErrors}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          {/* List of templates */}
          <TemplateList
            templates={templates}
            getSelectedTemplate={getSelectedTemplate}
            addTemplate={() => {
              setSelectedTemplate({ ...newTemplate });
              setTemplateErrors({ ...defaultTemplateErrors });
            }}
          />
        </Grid>
        <Grid item xs={9}>
          {/* Details of selected template */}
          <Paper className="paper paper2 paper3 overflow" variant="outlined">
            {selectedTemplate && (
              <TemplateInformation
                templateInformation={selectedTemplate}
                setTemplateInformation={setSelectedTemplate}
                addTemplate={addTemplate}
                updateTemplate={updateTemplate}
                appointmentTypes={appointmentTypes}
                errors={templateErrors}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Templates;
