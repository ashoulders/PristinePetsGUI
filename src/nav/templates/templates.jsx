import React, { useState } from 'react';
import { Grid, Paper } from '@mui/material';
import AppointmentTypeList from './appointmentTypesList';
import AppointmentType from './appointmentType';
import TemplateList from './templatesList';
import TemplateInformation from './templateInformation';

const Templates = () => {
  // list of appointment types
  const [appointmentTypes, setAppointmentTypes] = useState([
    { id: 0, name: 'Appointment Type 1', pricePerHour: 10 },
    { id: 1, name: 'Appointment Type 2', pricePerHour: 10 },
    { id: 2, name: 'Appointment Type 3', pricePerHour: 10 },
    { id: 3, name: 'Appointment Type 3', pricePerHour: 10 },
    { id: 4, name: 'Appointment Type 3', pricePerHour: 10 },
    { id: 5, name: 'Appointment Type 3', pricePerHour: 10 },
    { id: 6, name: 'Appointment Type 3', pricePerHour: 10 },
    { id: 7, name: 'Appointment Type 3', pricePerHour: 10 },
    { id: 8, name: 'Appointment Type 3', pricePerHour: 10 },
    { id: 9, name: 'Appointment Type 3', pricePerHour: 10 },
    { id: 10, name: 'Appointment Type 3', pricePerHour: 10 },
  ]);
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

  // empty form for a new appointment type
  const newAppointmentType = {
    name: '',
    pricePerHour: '',
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

  const getSelectedAppointmentType = (appointmentTypeID) => {
    // get appointment type from database
    const appointmentType = appointmentTypes.find(
      (o) => o.id === appointmentTypeID
    );
    appointmentType.renderType = 'Edit';
    setSelectedAppointmentType(appointmentType);
  };

  const getSelectedTemplate = (templateID) => {
    // get appointment type from database
    const template = templates.find((o) => o.id === templateID);
    template.renderType = 'Edit';
    setSelectedTemplate(template);
  };

  const addAppointmentType = () => {
    setSelectedAppointmentType(newAppointmentType);
  };

  const addTemplate = () => {
    setSelectedTemplate(newTemplate);
  };

  return (
    <Grid container columnSpacing={0} rowSpacing={1}>
      <Grid item xs={3}>
        {/* List of appointment types */}
        <AppointmentTypeList
          appointmentTypes={appointmentTypes}
          getSelectedAppointmentType={getSelectedAppointmentType}
          addAppointmentType={addAppointmentType}
        />
      </Grid>
      <Grid item xs={9}>
        {/* Details of selected appointment type */}
        <Paper className="paper paper2 paper3 overflow" variant="outlined">
          {selectedAppointmentType && (
            <AppointmentType
              appointmentType={selectedAppointmentType}
              setAppointmentType={setSelectedAppointmentType}
            />
          )}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        {/* List of templates */}
        <TemplateList
          templates={templates}
          getSelectedTemplate={getSelectedTemplate}
          addTemplate={addTemplate}
        />
      </Grid>
      <Grid item xs={9}>
        {/* Details of selected template */}
        <Paper className="paper paper2 paper3 overflow" variant="outlined">
          {selectedTemplate && (
            <TemplateInformation
              templateInformation={selectedTemplate}
              setTemplateInformation={setSelectedTemplate}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Templates;
