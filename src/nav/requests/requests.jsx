import React, { useState } from 'react';
import { Grid, Paper } from '@mui/material';
import RequestList from './requestList';
import RequestInformation from './requestInformation';

const Requests = () => {
  const [requests, setRequests] = useState([
    {
      id: 0,
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
      id: 1,
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
      id: 2,
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

  const getSelectedRequest = (requestID) => {
    // get request from database
    const request = requests.find((o) => o.id === requestID);
    setSelectedRequest(request);
  };

  return (
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
  );
};

export default Requests;
