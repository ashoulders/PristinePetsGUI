/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Paper,
  Divider,
  Box,
  TextField,
  Table,
  TableHead,
  TableCell,
  TableBody,
  FormControlLabel,
  Checkbox,
  TableContainer,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TimeField from 'react-simple-timefield';
import PropTypes from 'prop-types';

const OpeningHours = ({ openingHours, setOpeningHours, errors }) => {
  const openingHoursList = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  // const [openingHours, setOpeningHours] = useState([
  //   {
  //     day: 'Monday',
  //     closed: false,
  //     openingTime: '00:00',
  //     closingTime: '00:00',
  //   },
  //   {
  //     day: 'Tuesday',
  //     closed: false,
  //     openingTime: '00:00',
  //     closingTime: '00:00',
  //   },
  //   {
  //     day: 'Wednesday',
  //     closed: true,
  //     openingTime: '00:00',
  //     closingTime: '00:00',
  //   },
  //   {
  //     day: 'Thursday',
  //     closed: false,
  //     openingTime: '00:00',
  //     closingTime: '00:00',
  //   },
  //   {
  //     day: 'Friday',
  //     closed: false,
  //     openingTime: '00:00',
  //     closingTime: '00:00',
  //   },
  //   {
  //     day: 'Saturday',
  //     closed: false,
  //     openingTime: '00:00',
  //     closingTime: '00:00',
  //   },
  //   {
  //     day: 'Sunday',
  //     closed: true,
  //     openingTime: '00:00',
  //     closingTime: '00:00',
  //   },
  // ]);

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  const handleCheckboxChange = (event) => {
    const modifiedOpeningHours = openingHours;
    modifiedOpeningHours[event.target.id].closed = event.target.checked ? 1 : 0;
    setOpeningHours([...modifiedOpeningHours]);
  };

  const handleOpeningHoursChange = (event) => {
    const modifiedOpeningHours = openingHours;
    modifiedOpeningHours[event.target.id].openingTime = event.target.value;
    setOpeningHours([...modifiedOpeningHours]);
  };

  const handleClosingHoursChange = (event) => {
    const modifiedClosingHours = openingHours;
    modifiedClosingHours[event.target.id].closingTime = event.target.value;
    setOpeningHours([...modifiedClosingHours]);
  };

  return (
    <>
      <h2 className="heading">Opening Hours</h2>
      <StyledDivider />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {openingHoursList.map((day) => (
                <TableCell>
                  <h4 className="noMargin">{day}</h4>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {openingHours.map((day, index) => (
                <TableCell key={index} sx={{ borderBottom: 'none' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={index}
                        checked={!!day.closed}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="Closed"
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {openingHours.map((day, index) => (
                <TableCell sx={{ borderBottom: 'none' }}>
                  <TimeField
                    id={index}
                    input={
                      <TextField
                        className="formField"
                        fullWidth={false}
                        label="Opening Time"
                        error={!!errors.openingHours[index][0]}
                        helperText={errors.openingHours[index][0]}
                      />
                    }
                    value={day.openingTime}
                    onChange={handleOpeningHoursChange}
                    colon=":"
                    disabled={!!day.closed}
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {openingHours.map((day, index) => (
                <TableCell sx={{ borderBottom: 'none' }}>
                  <TimeField
                    id={index}
                    input={
                      <TextField
                        fullWidth={false}
                        label="Closing Time"
                        error={!!errors.openingHours[index][1]}
                        helperText={errors.openingHours[index][1]}
                      />
                    }
                    value={day.closingTime}
                    onChange={handleClosingHoursChange}
                    colon=":"
                    disabled={!!day.closed}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

OpeningHours.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  openingHours: PropTypes.object.isRequired,
  setOpeningHours: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
};

export default OpeningHours;
