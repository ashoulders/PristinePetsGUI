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
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const AppointmentTypeList = () => {
  const [appointmentTypes, setAppointmentTypes] = useState([
    { name: 'Appointment Type 1' },
    { name: 'Appointment Type 2' },
    { name: 'Appointment Type 3' },
    { name: 'Appointment Type 3' },
    { name: 'Appointment Type 3' },
    { name: 'Appointment Type 3' },
    { name: 'Appointment Type 3' },
    { name: 'Appointment Type 3' },
    { name: 'Appointment Type 3' },
    { name: 'Appointment Type 3' },
    { name: 'Appointment Type 3' },
  ]);
  const [appointmentTypeSearch, setAppointmentTypeSearch] = useState('');

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  return (
    <Paper className="paper paper3 flexDivColumn" variant="outlined">
      <div>
        <h2 className="heading">Appointment Types</h2>
        <StyledDivider />
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
          <IconButton className="primary" variant="contained">
            <AddIcon />
          </IconButton>
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
                  <ListItem key={index} disablePadding>
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

export default AppointmentTypeList;
