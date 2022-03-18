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
  Chip,
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const RequestList = ({ requests, getSelectedRequest }) => {
  // const [requests, setRequests] = useState([
  //   { name: 'Abigail Shoulders', completed: true },
  //   { name: 'Jamie Sykes', completed: false },
  //   { name: 'Michael Harvey', completed: false },
  // ]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [requestSearch, setRequestSearch] = useState('');

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  return (
    <Paper className="paper" variant="outlined">
      <h2 className="heading">Requests</h2>
      <StyledDivider />
      <p>Click on a request to view its details.</p>
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
                <ListItem
                  disablePadding
                  onClick={() => getSelectedRequest(request.requestId)}
                >
                  <ListItemButton>
                    <ListItemText primary={request.name} />
                    <Chip
                      label={request.completed ? 'Completed' : 'Not complete'}
                      color={request.completed ? 'success' : 'error'}
                    />
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

RequestList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  requests: PropTypes.array.isRequired,
  getSelectedRequest: PropTypes.func.isRequired,
};

export default RequestList;
