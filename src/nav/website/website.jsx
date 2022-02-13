import React, { useState } from 'react';
import { Button, Paper } from '@mui/material';
import WebsiteInformation from './websiteInformation';
import OpeningHours from './openingHours';

const Website = () => {
  return (
    <Paper className="paper paper2 overflow" variant="outlined">
      <WebsiteInformation />
      <OpeningHours />
      <Button className="primary floatRight" variant="contained">
        Confirm
      </Button>
    </Paper>
  );
};

export default Website;
