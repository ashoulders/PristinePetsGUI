/* eslint-disable promise/always-return */
import React, { useState, useEffect } from 'react';
import { Backdrop, CircularProgress, Grid, Paper } from '@mui/material';
import axios from 'axios';
import RequestList from './requestList';
import RequestInformation from './requestInformation';

const Requests = () => {
  const [requests, setRequests] = useState([
    {
      requestID: 0,
      name: 'Abigail Shoulders',
      email: 'a@a.com',
      phone: '01403',
      communication: 'email',
      petType: 'cat',
      petBreed: '',
      appointmentType: 'groom',
      notes: '',
      completed: true,
    },
    {
      requestID: 1,
      name: 'Jamie Sykes',
      email: 'a@a.com',
      phone: '01403',
      communication: 'email',
      petType: 'cat',
      petBreed: 'tabby',
      appointmentType: 'groom',
      notes: '',
      completed: false,
    },
    {
      requestID: 2,
      name: 'Michael Harvey',
      email: 'a@a.com',
      phone: '01403',
      communication: 'email',
      petType: 'cat',
      petBreed: '',
      appointmentType: 'groom',
      notes: '',
      completed: false,
    },
  ]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [tabLoading, setTabLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(true);

  const getSelectedRequest = (requestID) => {
    // axios.get(`/requests/${requestID}`);
    const request = requests.find((o) => o.id === requestID);
    setSelectedRequest(request);
  };

  const getRequests = () => {
    axios
      .get('/requests')
      .then((response) => {
        setRequests(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (tabLoading) {
    setTabLoading(false);
    // getRequests();
  }

  return (
    <>
      <Backdrop className="loading" open={tabLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <RequestList
            requests={requests}
            getSelectedRequest={getSelectedRequest}
          />
        </Grid>
        <Grid item xs={9}>
          <Paper className="paper paper2 overflow" variant="outlined">
            {selectedRequest && (
              <RequestInformation
                request={selectedRequest}
                setRequest={setSelectedRequest}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Requests;
