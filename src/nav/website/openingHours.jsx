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
      openingTime: '',
      closingTime: '',
    },
    {
      day: 'Tuesday',
      closed: false,
      openingTime: '',
      closingTime: '',
    },
    {
      day: 'Wednesday',
      closed: true,
      openingTime: '',
      closingTime: '',
    },
    {
      day: 'Thursday',
      closed: false,
      openingTime: '',
      closingTime: '',
    },
    {
      day: 'Friday',
      closed: false,
      openingTime: '',
      closingTime: '',
    },
    {
      day: 'Saturday',
      closed: false,
      openingTime: '',
      closingTime: '',
    },
    {
      day: 'Sunday',
      closed: true,
      openingTime: '',
      closingTime: '',
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

  return (
    <>
      <h2 className="heading">Opening Hours</h2>
      <StyledDivider />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {openingHoursList.map((day) => (
                <TableCell>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {openingHours.map((day, index) => (
                <TableCell>
                  <FormControlLabel
                    control={<Checkbox key={index} checked={!!day.closed} />}
                    label="Closed"
                    disabled
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
