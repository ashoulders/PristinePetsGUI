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

  const weeklyData = [
    {
      week: 'w/c 28/02/22',
      'Type 1': 5,
      'Type 2': 10,
      'Type 3': 8,
      'Type 4': 3,
      'Type 5': 1,
    },
    {
      week: 'w/c 07/03/22',
      'Type 1': 5,
      'Type 2': 10,
      'Type 3': 8,
      'Type 4': 3,
      'Type 5': 1,
    },
    {
      week: 'w/c 14/03/22',
      'Type 1': 5,
      'Type 2': 10,
      'Type 3': 8,
      'Type 4': 3,
      'Type 5': 1,
    },
    {
      week: 'w/c 21/03/22',
      'Type 1': 5,
      'Type 2': 10,
      'Type 3': 8,
      'Type 4': 3,
      'Type 5': 1,
    },
    {
      week: 'w/c 28/03/22',
      'Type 1': 5,
      'Type 2': 10,
      'Type 3': 8,
      'Type 4': 3,
      'Type 5': 1,
    },
  ];

  const [data, setData] = useState(dailyData);

  const handleChange = (event) => {
    setTimePeriod(event.target.value);
    if (event.target.value === 'day') {
      setData(dailyData);
    } else if (event.target.value === 'week') {
      setData(weeklyData);
    }
  };

  return (
    <Paper className="paper paper2 paper4" variant="outlined">
      <FormControl>
        <InputLabel id="timePeriodLabel">Time Period</InputLabel>
        <Select
          value={timePeriod}
          label="Time Period"
          onChange={handleChange}
          labelId="timePeriodLabel"
          className="selectWidth"
        >
          <MenuItem value="day">Daily</MenuItem>
          <MenuItem value="week">Weekly</MenuItem>
          <MenuItem value="month">Monthly</MenuItem>
          <MenuItem value="year">Yearly</MenuItem>
        </Select>
      </FormControl>
      <div className="graph">
        <ResponsiveBar
          data={data}
          keys={['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5']}
          indexBy={timePeriod}
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
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 70,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          labelSkipWidth={0}
          labelSkipHeight={8}
          animate
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </Paper>
  );
};

export default Dashboard;
