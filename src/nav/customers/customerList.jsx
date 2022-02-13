/* eslint-disable react/no-array-index-key */
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
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const CustomerList = () => {
  const [customers, setCustomers] = useState([
    { name: 'Abigail Shoulders' },
    { name: 'Jamie Sykes' },
    { name: 'Michael Harvey' },
  ]);
  const [customerSearch, setCustomerSearch] = useState('');

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  // styling for fitler button
  const StyledSecondaryButton = styled(IconButton)(() => ({
    marginRight: '10px',
  }));

  return (
    <Paper className="paper" variant="outlined">
      <h2 className="heading">Customers</h2>
      <StyledDivider />
      <div className="flexDiv">
        {/* Search field */}
        <TextField
          className="searchMargin"
          label="Search..."
          variant="outlined"
          fullWidth
          value={customerSearch}
          onChange={(event) => setCustomerSearch(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {/* Filter icon button */}
        <StyledSecondaryButton className="secondary" variant="contained">
          <FilterAltIcon />
        </StyledSecondaryButton>
        {/* Add customer button */}
        <IconButton className="primary" variant="contained">
          <AddIcon />
        </IconButton>
      </div>
      {/* Customer List */}
      <List>
        {customers.map(
          (customer, index) =>
            customer.name.toLowerCase().includes(customerSearch) && (
              <>
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={customer.name} />
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

export default CustomerList;
