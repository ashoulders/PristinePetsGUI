import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
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

  // styling for search field
  const StyledSearch = styled(TextField)(() => ({
    marginRight: '10px',
  }));

  // styling for add button
  const StyledButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: '#000',
    alignItems: 'center',
    borderRadius: '10%',
  }));

  // styling for fitler button
  const StyledSecondaryButton = styled(IconButton)(() => ({
    backgroundColor: '#dcdcdd',
    color: '#000',
    alignItems: 'center',
    borderRadius: '10%',
    marginRight: '10px',
  }));

  return (
    <Paper className="paper" variant="outlined">
      <h2>Customers</h2>
      <div className="flexDiv">
        {/* Search field */}
        <StyledSearch
          label="Search..."
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {/* Filter icon button */}
        <StyledSecondaryButton variant="contained">
          <FilterAltIcon />
        </StyledSecondaryButton>
        {/* Add customer button */}
        <StyledButton variant="contained">
          <AddIcon />
        </StyledButton>
      </div>
      {/* Customer List */}
      <List>
        {customers.map((customer) => (
          <>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={customer.name} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Paper>
  );
};

export default CustomerList;
