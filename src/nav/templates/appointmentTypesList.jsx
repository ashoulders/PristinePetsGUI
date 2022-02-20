/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Tooltip,
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const AppointmentTypeList = ({
  appointmentTypes,
  getSelectedAppointmentType,
  addAppointmentType,
}) => {
  // const [appointmentTypes, setAppointmentTypes] = useState([
  //   { name: 'Appointment Type 1' },
  //   { name: 'Appointment Type 2' },
  //   { name: 'Appointment Type 3' },
  //   { name: 'Appointment Type 3' },
  //   { name: 'Appointment Type 3' },
  //   { name: 'Appointment Type 3' },
  //   { name: 'Appointment Type 3' },
  //   { name: 'Appointment Type 3' },
  //   { name: 'Appointment Type 3' },
  //   { name: 'Appointment Type 3' },
  //   { name: 'Appointment Type 3' },
  // ]);
  const [appointmentTypeSearch, setAppointmentTypeSearch] = useState('');

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  return (
    <Paper className="paper paper3 flexDivColumn" variant="outlined">
      <div>
        <h2 className="heading">Appointment Types</h2>
        <StyledDivider />
        <p>Click on an appointment type to edit its details.</p>
        {/* Search field */}
        <div className="flexDiv">
          <TextField
            className="searchMargin form"
            label="Search..."
            variant="outlined"
            fullWidth
            value={appointmentTypeSearch}
            onChange={(event) => setAppointmentTypeSearch(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          {/* Add appointment type button */}
          <Tooltip title="Add new appointment type" arrow placement="top">
            <IconButton
              className="primary"
              variant="contained"
              onClick={() => addAppointmentType()}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {/* Appointment Type List */}
      <div className="scrollableList">
        <List>
          {appointmentTypes.map(
            (appointmentType, index) =>
              appointmentType.name
                .toLowerCase()
                .includes(appointmentTypeSearch) && (
                <>
                  <ListItem
                    key={index}
                    disablePadding
                    onClick={() =>
                      getSelectedAppointmentType(appointmentType.id)
                    }
                  >
                    <ListItemButton>
                      <ListItemText primary={appointmentType.name} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              )
          )}
        </List>
      </div>
    </Paper>
  );
};

AppointmentTypeList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  appointmentTypes: PropTypes.array.isRequired,
  getSelectedAppointmentType: PropTypes.func.isRequired,
  addAppointmentType: PropTypes.func.isRequired,
};

export default AppointmentTypeList;
