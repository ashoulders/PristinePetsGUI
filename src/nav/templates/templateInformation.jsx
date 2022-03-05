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
  addTemplate,
  updateTemplate,
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
  }, [addTemplate, templateInformation.renderType, updateTemplate]);

  return (
    <>
      <h2 className="heading">{templateInformation.renderType} Template</h2>
      <StyledDivider />

      {/* Template form */}
      <Box component="form" autoComplete="off">
        <TextField
          id="name"
          value={templateInformation.name}
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
          id="appointmentType"
          className="formField"
          required
          fullWidth
          options={[]}
          renderInput={(params) => (
            <TextField {...params} label="Appointment Type" required />
          )}
        />
        <Autocomplete
          disablePortal
          id="petType"
          className="formField"
          required
          fullWidth
          options={[]}
          renderInput={(params) => (
            <TextField {...params} label="Pet Type" required />
          )}
        />
        <TextField
          id="length"
          value={templateInformation.length}
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
  addTemplate: PropTypes.func.isRequired,
  updateTemplate: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
};

export default TemplateInformation;
