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
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const TemplateList = () => {
  const [templates, setTemplates] = useState([
    { name: 'Template 1' },
    { name: 'Template 2' },
    { name: 'Template 3' },
    { name: 'Template 3' },
    { name: 'Template 3' },
    { name: 'Template 3' },
    { name: 'Template 3' },
    { name: 'Template 3' },
    { name: 'Template 3' },
    { name: 'Template 3' },
    { name: 'Template 3' },
  ]);
  const [templateSearch, setTemplateSearch] = useState('');

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  return (
    <Paper className="paper paper3 flexDivColumn" variant="outlined">
      <div>
        <h2 className="heading">Templates</h2>
        <StyledDivider />
        {/* Search field */}
        <div className="flexDiv">
          <TextField
            className="searchMargin form"
            label="Search..."
            variant="outlined"
            fullWidth
            value={templateSearch}
            onChange={(event) => setTemplateSearch(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          {/* Add template button */}
          <IconButton className="primary" variant="contained">
            <AddIcon />
          </IconButton>
        </div>
      </div>
      {/* Template List */}
      <div className="scrollableList">
        <List>
          {templates.map(
            (template, index) =>
              template.name.toLowerCase().includes(templateSearch) && (
                <>
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={template.name} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              )
          )}
        </List>
      </div>
    </Paper>
  );
};

export default TemplateList;
