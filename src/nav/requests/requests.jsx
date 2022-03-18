/* eslint-disable promise/always-return */
import React, { useState, useEffect } from 'react';
import { Backdrop, CircularProgress, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { urlState } from '../../utils/recoilStates';
import RequestList from './requestList';
import RequestInformation from './requestInformation';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  // const [requests, setRequests] = useState([
  //   {
  //     id: 0,
  //     name: 'Abigail Shoulders',
  //     email: 'a@a.com',
  //     phone: '01403',
  //     communication: 'email',
  //     petType: 'cat',
  //     petBreed: '',
  //     appointmentType: 'groom',
  //     notes: '',
  //     completed: true,
  //   },
  //   {
  //     id: 1,
  //     name: 'Jamie Sykes',
  //     email: 'a@a.com',
  //     phone: '01403',
  //     communication: 'email',
  //     petType: 'cat',
  //     petBreed: 'tabby',
  //     appointmentType: 'groom',
  //     notes: '',
  //     completed: false,
  //   },
  //   {
  //     id: 2,
  //     name: 'Michael Harvey',
  //     email: 'a@a.com',
  //     phone: '01403',
  //     communication: 'email',
  //     petType: 'cat',
  //     petBreed: '',
  //     appointmentType: 'groom',
  //     notes: '',
  //     completed: false,
  //   },
  // ]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [tabLoading, setTabLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(true);
  const url = useRecoilValue(urlState);

  const getSelectedRequest = (requestID) => {
    // axios.get(`/requests/${requestID}`);
    const request = requests.find((o) => o.requestId === requestID);
    setSelectedRequest(request);
  };

  const getRequests = () => {
    axios
      .get('/Requests/GetReqs')
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (tabLoading) {
    setTabLoading(false);
    getRequests();
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
