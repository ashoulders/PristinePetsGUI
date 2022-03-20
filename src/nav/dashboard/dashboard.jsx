/* eslint-disable promise/always-return */
import React, { useState } from 'react';
import {
  Backdrop,
  CircularProgress,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { format } from 'date-fns';
import { validateDate } from '../../utils/formValidator';

const Dashboard = () => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState(new Date());

  const [tabLoading, setTabLoading] = useState(true);
  const [tabLoaded, setTabLoaded] = useState(false);

  const [data, setData] = useState([]);
  // const [data, setData] = useState([
  //   { appointmentType: 'aeg1', 'Number of Appointments': 5 },
  //   { appointmentType: '2', 'Number of Appointments': 6 },
  //   { appointmentType: '3', 'Number of Appointments': 7 },
  //   { appointmentType: '4', 'Number of Appointments': 8 },
  // ]);
  const [graphMessage, setGraphMessage] = useState('');

  const [numRequests, setNumRequests] = useState('Retrieving...');

  const [errors, setErrors] = useState({
    startDate: false,
    endDate: false,
  });

  const validateForm = () => {
    const modifiedErrors = errors;

    const startDateValidation = validateDate(startDate);
    modifiedErrors.startDate = startDateValidation.valid
      ? false
      : startDateValidation.helperText;

    const endDateValidation = validateDate(endDate);
    modifiedErrors.endDate = endDateValidation.valid
      ? false
      : endDateValidation.helperText;

    setErrors({ ...modifiedErrors });
  };

  // get appointment type data from database
  const getAppointmentTypes = (start, end) => {
    validateForm();
    if (errors.startDate === false && errors.endDate === false) {
      const formattedStart = format(start, 'dd/MM/yyyy');
      const formattedEnd = format(end, 'dd/MM/yyyy');
      axios
        .get(
          `/Dashboards/GetDashboardData?startDate=${formattedStart}&endDate=${formattedEnd}`
        )
        .then((response) => {
          let graphData = response.data;
          graphData = graphData.map((datum) => ({
            appointmentType: datum.appointmentTypeName,
            'Number of Appointments': datum.numOfAppts,
          }));
          setGraphMessage('');
          setData(graphData);
          setTabLoaded(true);
        })
        .catch((error) => {
          console.log(error);
          setGraphMessage('Unable to retrieve appointment data.');
          setTabLoaded(true);
        });
    }
  };

  // get appointment type data from database
  const getNumRequests = () => {
    axios
      .get('/Dashboards/GetDashboardReqs?')
      .then((response) => {
        response.data.forEach((datum) => {
          if (!datum.isComplete) {
            setNumRequests(datum.countOfReqs.toString());
          }
        });

        setTabLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setNumRequests('Unable to retrieve request data.');
        setTabLoaded(true);
      });
  };

  if (!tabLoaded && tabLoading) {
    setTabLoading(false);
    getAppointmentTypes(startDate, endDate);
    getNumRequests();
  }

  return (
    <>
      <Backdrop className="loading" open={!tabLoaded}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper className="paper4" variant="outlined">
            <Grid container spacing={2}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <Grid item xs={6}>
                  <DesktopDatePicker
                    id="startDate"
                    label="Start Date"
                    className="formField"
                    inputFormat="dd/MM/yyyy"
                    value={startDate}
                    placeholder="dd/mm/yyyy"
                    onChange={(newValue) => {
                      setStartDate(newValue);
                      getAppointmentTypes(newValue, endDate);
                    }}
                    renderInput={(params) => (
                      <TextField
                        className="formField"
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...params}
                        fullWidth
                        error={!!errors.startDate}
                        helperText={errors.startDate}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DesktopDatePicker
                    id="endDate"
                    label="End Date"
                    className="formField"
                    inputFormat="dd/MM/yyyy"
                    value={endDate}
                    placeholder="dd/mm/yyyy"
                    onChange={(newValue) => {
                      setEndDate(newValue);
                      getAppointmentTypes(startDate, newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        className="formField"
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...params}
                        fullWidth
                        error={!!errors.endDate}
                        helperText={errors.endDate}
                      />
                    )}
                  />
                </Grid>
              </LocalizationProvider>
            </Grid>
            <div className="graph">
              {graphMessage.length > 0 ? (
                <p>{graphMessage}</p>
              ) : (
                <>
                  {data.length > 0 ? (
                    <ResponsiveBar
                      data={data}
                      animate={false}
                      keys={['Number of Appointments']}
                      indexBy="appointmentType"
                      margin={{ top: 20, right: 20, bottom: 30, left: 30 }}
                      padding={0.3}
                      // colors={this.getColor}
                      // borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                      colors={{ scheme: 'nivo' }}
                      axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Number of Appointments',
                        legendPosition: 'middle',
                        legendOffset: -40,
                      }}
                      labelSkipWidth={0}
                      labelSkipHeight={8}
                      motionStiffness={90}
                      motionDamping={15}
                    />
                  ) : (
                    <p>There are no appointments in this date range.</p>
                  )}
                </>
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="paper4 rightPaper" variant="outlined">
            <h3>Number of open requests: {numRequests}</h3>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
