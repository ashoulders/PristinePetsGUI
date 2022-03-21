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
  Tooltip,
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const TemplateList = ({ templates, getSelectedTemplate, addTemplate }) => {
  // const [templates, setTemplates] = useState([
  //   { name: 'Template 1' },
  //   { name: 'Template 2' },
  //   { name: 'Template 3' },
  //   { name: 'Template 3' },
  //   { name: 'Template 3' },
  //   { name: 'Template 3' },
  //   { name: 'Template 3' },
  //   { name: 'Template 3' },
  //   { name: 'Template 3' },
  //   { name: 'Template 3' },
  //   { name: 'Template 3' },
  // ]);
  const [templateSearch, setTemplateSearch] = useState('');

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  return (
    <Paper className="paper paper3 flexDivColumn" variant="outlined">
      <div>
        <h2 className="heading">Templates</h2>
        <StyledDivider />
        <p>Click on a template to edit its details.</p>
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
          <Tooltip title="Add new template" arrow placement="top">
            <IconButton
              className="primary"
              variant="contained"
              onClick={() => addTemplate()}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {/* Template List */}
      <div className="scrollableList">
        <List>
          {templates.map(
            (template, index) =>
              template.templateName.toLowerCase().includes(templateSearch) && (
                <>
                  <ListItem
                    key={index}
                    disablePadding
                    onClick={() => {
                      getSelectedTemplate(template.templateId);
                    }}
                  >
                    <ListItemButton>
                      <ListItemText primary={template.templateName} />
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

TemplateList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  templates: PropTypes.array.isRequired,
  getSelectedTemplate: PropTypes.func.isRequired,
  addTemplate: PropTypes.func.isRequired,
};

export default TemplateList;
