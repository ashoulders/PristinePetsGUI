/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Divider, Box, Button, Modal } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const Alert = ({ setOpenModal, message }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  return (
    <Modal open>
      <Box component="form" autoComplete="off" sx={style}>
        <h2>{message}</h2>
        <StyledDivider />
        <Button
          className="primary floatRight"
          variant="contained"
          onClick={() => setOpenModal(false)}
        >
          Ok
        </Button>
      </Box>
    </Modal>
  );
};

Alert.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default Alert;
