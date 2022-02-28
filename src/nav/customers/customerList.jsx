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
import PropTypes from 'prop-types';

const CustomerList = ({ customers, getSelectedCustomer, addCustomer }) => {
  // const [customers, setCustomers] = useState([
  //   { name: 'Abigail Shoulders' },
  //   { name: 'Jamie Sykes' },
  //   { name: 'Michael Harvey' },
  // ]);
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
      <p>Click on a customer to view their details.</p>
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
        <IconButton
          className="primary"
          variant="contained"
          onClick={addCustomer}
        >
          <AddIcon />
        </IconButton>
      </div>
      {/* Customer List */}
      <List>
        {customers.map((customer, index) => {
          const name = `${customer.firstName} ${customer.surname}`;
          return (
            name.toLowerCase().includes(customerSearch) && (
              <>
                <ListItem
                  key={index}
                  disablePadding
                  onClick={() => getSelectedCustomer(customer.id)}
                >
                  <ListItemButton>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            )
          );
        })}
      </List>
    </Paper>
  );
};

CustomerList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  customers: PropTypes.array.isRequired,
  getSelectedCustomer: PropTypes.func.isRequired,
  addCustomer: PropTypes.func.isRequired,
};

export default CustomerList;
