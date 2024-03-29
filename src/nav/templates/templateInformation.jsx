/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import {
  Divider,
  Box,
  TextField,
  Button,
  InputAdornment,
  Autocomplete,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const TemplateInformation = ({
  templateInformation,
  setTemplateInformation,
  petTypes,
  addTemplate,
  updateTemplate,
  deleteTemplate,
  appointmentTypes,
  errors,
}) => {
  // const [templateInformation, setTemplateInformation] = useState({
  //   name: '',
  //   appointmentType: '',
  //   petType: '',
  //   length: '',
  // });

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  const handleChange = (event) => {
    const modifiedTemplateInformation = templateInformation;
    modifiedTemplateInformation[event.target.id] = event.target.value;
    setTemplateInformation({ ...modifiedTemplateInformation });
  };

  const handleAppointmentTypeChange = (event, newValue) => {
    const modifiedTemplateInformation = templateInformation;
    if (newValue?.appointmentTypeId) {
      modifiedTemplateInformation.appointmentTypeId =
        newValue.appointmentTypeId;
    } else {
      modifiedTemplateInformation.appointmentTypeId = '';
    }
    setTemplateInformation({ ...modifiedTemplateInformation });
  };

  const handlePetTypeChange = (event, newValue) => {
    const modifiedTemplateInformation = templateInformation;
    if (newValue?.petTypeId) {
      modifiedTemplateInformation.petTypeId = newValue.petTypeId;
    } else {
      modifiedTemplateInformation.petTypeId = '';
    }
    setTemplateInformation({ ...modifiedTemplateInformation });
  };

  // gets correct buttons based on the render type of the selected appointment type
  const buttons = useMemo(() => {
    if (templateInformation.renderType === 'Add') {
      return (
        <Button
          className="primary floatRight"
          variant="contained"
          onClick={addTemplate}
        >
          Add Template
        </Button>
      );
    }
    return (
      <>
        <Button
          className="primary floatRight"
          variant="contained"
          onClick={updateTemplate}
        >
          Save
        </Button>
        <Button
          className="secondary floatRight buttonMargin"
          variant="contained"
          onClick={deleteTemplate}
        >
          Delete
        </Button>
      </>
    );
  }, [
    addTemplate,
    deleteTemplate,
    templateInformation.renderType,
    updateTemplate,
  ]);

  return (
    <>
      <h2 className="heading">{templateInformation.renderType} Template</h2>
      <StyledDivider />

      {/* Template form */}
      <Box component="form" autoComplete="off">
        <TextField
          id="templateName"
          value={templateInformation.templateName}
          className="formField"
          fullWidth
          required
          label="Name"
          placeholder="Name"
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <Autocomplete
          disablePortal
          id="appointmentTypeId"
          className="formField"
          required
          fullWidth
          value={appointmentTypes.find(
            (o) => o.appointmentTypeId === templateInformation.appointmentTypeId
          )}
          options={appointmentTypes}
          getOptionLabel={(option) => option.appointmentTypeName}
          onChange={handleAppointmentTypeChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Appointment Type"
              required
              error={!!errors.appointmentType}
              helperText={errors.appointmentType}
            />
          )}
        />
        <Autocomplete
          ListboxProps={{ style: { maxHeight: 150, overflow: 'auto' } }}
          disablePortal
          id="petType"
          className="formField"
          required
          fullWidth
          value={petTypes.find(
            (o) => o.petTypeId === templateInformation.petTypeId
          )}
          options={petTypes}
          getOptionLabel={(option) => option.petType}
          onChange={handlePetTypeChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Pet Type"
              required
              error={!!errors.petType}
              helperText={errors.petType}
            />
          )}
        />
        <TextField
          id="templateLength"
          value={templateInformation.templateLength}
          className="formField"
          fullWidth
          required
          label="Length"
          placeholder="30"
          type="number"
          onChange={handleChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">mins</InputAdornment>,
          }}
          error={!!errors.length}
          helperText={errors.length}
        />
        {buttons}
      </Box>
    </>
  );
};

TemplateInformation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  templateInformation: PropTypes.object.isRequired,
  setTemplateInformation: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  petTypes: PropTypes.array.isRequired,
  addTemplate: PropTypes.func.isRequired,
  updateTemplate: PropTypes.func.isRequired,
  deleteTemplate: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  appointmentTypes: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
};

export default TemplateInformation;
