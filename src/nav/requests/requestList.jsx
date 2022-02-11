import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const RequestList = () => {
  const [requests, setRequests] = useState([
    { name: 'Abigail Shoulders', completed: true },
    { name: 'Jamie Sykes', completed: false },
    { name: 'Michael Harvey', completed: false },
  ]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [requestSearch, setRequestSearch] = useState('');

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  return (
    <Paper className="paper" variant="outlined">
      <h2 className="heading">Requests</h2>
      <StyledDivider />
      <div className="flexDiv">
        {/* Search field */}
        <TextField
          className="searchMargin"
          label="Search..."
          variant="outlined"
          fullWidth
          value={requestSearch}
          onChange={(event) => setRequestSearch(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {/* Filter icon button */}
        <IconButton className="secondary" variant="contained">
          <FilterAltIcon />
        </IconButton>
      </div>
      <FormControlLabel
        control={
          <Checkbox
            checked={showCompleted}
            onChange={(event) => setShowCompleted(event.target.checked)}
          />
        }
        label="Show completed"
      />
      {/* Request List */}
      <List>
        {requests.map(
          (request) =>
            request.name.toLowerCase().includes(requestSearch) &&
            (showCompleted ? 1 : request.completed === false) && (
              <>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={request.name} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            )
        )}
      </List>
    </Paper>
  );
};

export default RequestList;