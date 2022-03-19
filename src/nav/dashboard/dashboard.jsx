/* eslint-disable promise/always-return */
import React, { useState, useEffect } from 'react';
import {
  Backdrop,
  CircularProgress,
  Grid,
  Paper,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';

const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState('day');

  const dailyData = [
    {
      day: 'Monday',
      'Type 1': 5,
      'Type 2': 10,
      'Type 3': 8,
      'Type 4': 3,
      'Type 5': 1,
    },
    {
      day: 'Tuesday',
      'Type 1': 5,
      'Type 2': 10,
      'Type 3': 8,
      'Type 4': 3,
      'Type 5': 1,
    },
    {
      day: 'Wednesday',
      'Type 1': 5,
      'Type 2': 10,
      'Type 3': 8,
      'Type 4': 3,
      'Type 5': 1,
    },
    {
      day: 'Thursday',
      'Type 1': 5,
      'Type 2': 10,
      'Type 3': 8,
      'Type 4': 3,
      'Type 5': 1,
    },
    {
      day: 'Friday',
      'Type 1': 5,
      'Type 2': 10,
      'Type 3': 8,
      'Type 4': 3,
      'Type 5': 1,
    },
    {
      day: 'Saturday',
      'Type 1': 5,
      'Type 2': 10,
      'Type 3': 8,
      'Type 4': 3,
      'Type 5': 1,
    },
    {
      day: 'Sunday',
      'Type 1': 5,
      'Type 2': 10,
      'Type 3': 8,
      'Type 4': 3,
      'Type 5': 1,
    },
  ];

  const [data, setData] = useState([
    { appointmentType: 'aeg1', 'Number of Appointments': 5 },
    { appointmentType: '2', 'Number of Appointments': 6 },
    { appointmentType: '3', 'Number of Appointments': 7 },
    { appointmentType: '4', 'Number of Appointments': 8 },
  ]);

  return (
    <Paper className="paper paper2 paper4" variant="outlined">
      <div className="graph">
        <ResponsiveBar
          data={data}
          animate={false}
          keys={['Number of Appointments']}
          indexBy="appointmentType"
          margin={{ top: 20, right: 60, bottom: 40, left: 50 }}
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
      </div>
    </Paper>
  );
};

export default Dashboard;
