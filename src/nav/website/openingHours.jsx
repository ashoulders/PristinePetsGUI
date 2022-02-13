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

const OpeningHours = () => {
  const openingHoursList = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const [openingHours, setOpeningHours] = useState([
    {
      day: 'Monday',
      closed: false,
      openingTime: '00:00',
      closingTime: '00:00',
    },
    {
      day: 'Tuesday',
      closed: false,
      openingTime: '00:00',
      closingTime: '00:00',
    },
    {
      day: 'Wednesday',
      closed: true,
      openingTime: '00:00',
      closingTime: '00:00',
    },
    {
      day: 'Thursday',
      closed: false,
      openingTime: '00:00',
      closingTime: '00:00',
    },
    {
      day: 'Friday',
      closed: false,
      openingTime: '00:00',
      closingTime: '00:00',
    },
    {
      day: 'Saturday',
      closed: false,
      openingTime: '00:00',
      closingTime: '00:00',
    },
    {
      day: 'Sunday',
      closed: true,
      openingTime: '00:00',
      closingTime: '00:00',
    },
  ]);

  // const handleChange = (event) => {
  //   const modifiedWebsite = website;
  //   modifiedWebsite[event.target.id] = event.target.value;
  //   setWebsite({ ...modifiedWebsite });
  // };

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  const handleCheckboxChange = (event) => {
    const modifiedOpeningHours = openingHours;
    modifiedOpeningHours[event.target.id].closed = event.target.checked;
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
        <Table>
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
                <TableCell key={index}>
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
                  <TimeField
                    id={index}
                    input={
                      <TextField
                        className="formField"
                        fullWidth={false}
                        label="Opening Time"
                      />
                    }
                    value={day.openingTime}
                    onChange={handleOpeningHoursChange}
                    colon=":"
                    disabled={!!day.closed}
                  />
                  <TimeField
                    id={index}
                    input={<TextField fullWidth={false} label="Closing Time" />}
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

export default OpeningHours;
