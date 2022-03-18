/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useMemo } from 'react';
import {
  Divider,
  Box,
  TextField,
  IconButton,
  Button,
  Modal,
  Autocomplete,
  Table,
  TableRow,
  TableCell,
  ButtonGroup,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import { validateDate, validateRequired } from '../../utils/formValidator';

const PetInformation = ({ customer, setCustomer, petTypes }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [mode, setMode] = useState('Add');

  const options = ['Option 1', 'Option 2', 'Option 3'];

  // const [pets, setPets] = useState([]);
  const [pet, setPet] = useState({
    petName: '',
    petType: '',
    breed: '',
    petBirthday: '',
    notes: '',
  });
  const [selectedPetIndex, setSelectedPetIndex] = useState(null);
  const [errors, setErrors] = useState({
    name: false,
    petType: false,
    dob: false,
  });

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

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

  const handleChange = (event) => {
    const modifiedPet = pet;
    modifiedPet[event.target.id] = event.target.value;
    setPet({ ...modifiedPet });
  };

  const validateForm = () => {
    const modifiedErrors = errors;
    const nameValidation = validateRequired(pet.petName);
    modifiedErrors.name = nameValidation.valid
      ? false
      : nameValidation.helperText;
    const dobValidation = validateDate(pet.petBirthday);
    modifiedErrors.dob = dobValidation.valid ? false : dobValidation.helperText;
    setErrors({ ...modifiedErrors });
  };

  const addPet = (event) => {
    validateForm();
    if (!errors.name && !errors.petType && !errors.dob) {
      const modifiedCustomer = customer;
      modifiedCustomer.pets = [...customer.pets, pet];
      setCustomer({ ...modifiedCustomer });
      setPet({
        petName: '',
        petType: '',
        breed: '',
        petBirthday: '',
        notes: '',
      });
      handleCloseModal();
    }
  };

  const editPet = (event) => {
    validateForm();
    if (!errors.name && !errors.petType && !errors.dob) {
      const modifiedCustomer = customer;
      modifiedCustomer.pets[selectedPetIndex] = pet;
      setCustomer({ ...modifiedCustomer });
      setPet({
        petName: '',
        petType: '',
        breed: '',
        petBirthday: '',
        notes: '',
      });
      setSelectedPetIndex(null);
      handleCloseModal();
    }
  };

  const deletePet = (event) => {
    let { target } = event;
    let { id } = target;
    let tries = 0;
    while (!id && tries < 5) {
      target = target.parentElement;
      id = target.id;
      tries += 1;
    }
    id = id.slice(0, -1);
    const modifiedCustomer = customer;
    modifiedCustomer.pets.splice(id, 1);
    setCustomer({ ...modifiedCustomer });
  };

  const handlePetTypeChange = (event, newValue) => {
    const modifiedPet = pet;
    if (newValue?.petTypeId) {
      modifiedPet.petTypeId = newValue.petTypeId;
    } else {
      modifiedPet.petTypeId = '';
    }
    setPet({ ...modifiedPet });
  };

  return (
    <>
      <h2 className="heading">Pets</h2>
      <StyledDivider />

      {customer.pets && (
        <Table>
          {customer.pets.map((currentPet, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <TableRow key={index}>
                <TableCell className="noPadding">
                  {currentPet.petName}
                </TableCell>
                <TableCell className="noPadding">
                  {
                    petTypes.find((o) => o.petTypeId === currentPet.petTypeId)
                      .petType
                  }
                </TableCell>
                <TableCell className="noPadding">{currentPet.breed}</TableCell>
                <TableCell className="noPadding" align="right">
                  <IconButton
                    // In Javascript, 0 converts to an empty string
                    id={index === 0 ? '0e' : `${index.toString()}e`}
                    className="secondary formButton"
                    variant="contained"
                    onClick={() => {
                      handleOpenModal();
                      setMode('Edit');
                      setPet({ ...currentPet });
                      setSelectedPetIndex(index);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    // In Javascript, 0 converts to an empty string
                    id={index === 0 ? '0d' : `${index.toString()}d`}
                    className="secondary formButton"
                    variant="contained"
                    onClick={deletePet}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      )}
      <Button
        className="primary formField"
        variant="contained"
        fullWidth
        onClick={() => {
          handleOpenModal();
          setMode('Add');
        }}
      >
        <AddIcon />
      </Button>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box component="form" autoComplete="off" sx={style}>
          <h2>{mode} Pet</h2>
          <StyledDivider />
          <TextField
            id="petName"
            value={pet.petName}
            className="formField"
            fullWidth
            required
            label="Name"
            placeholder="Name"
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <Autocomplete
            disablePortal
            id="petType"
            className="formField"
            required
            fullWidth
            value={petTypes.find((o) => o.petTypeId === pet.petTypeId)}
            options={petTypes}
            getOptionLabel={(option) => option.petType}
            onChange={handlePetTypeChange}
            renderInput={(params) => <TextField {...params} label="Pet Type" />}
            error={!!errors.petType}
            helperText={errors.petType}
          />
          <TextField
            id="breed"
            value={pet.breed}
            className="formField"
            fullWidth
            label="Breed"
            placeholder="Breed"
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
              id="petBirthday"
              label="Date of Birth"
              className="formField"
              inputFormat="dd/MM/yyyy"
              value={pet.petBirthday}
              placeholder="dd/mm/yyyy"
              onChange={(newValue) => {
                const modifiedPet = pet;
                modifiedPet.petBirthday = newValue;
                setPet({ ...modifiedPet });
              }}
              renderInput={(params) => (
                <TextField
                  className="formField"
                  {...params}
                  fullWidth
                  error={!!errors.dob}
                  helperText={errors.dob}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            id="notes"
            value={pet.notes}
            className="formField"
            minRows={1}
            maxRows={10}
            multiline
            fullWidth
            label="Notes"
            placeholder="Notes"
            onChange={handleChange}
          />
          <ButtonGroup fullWidth>
            <Button
              className="secondary noHover"
              variant="contained"
              fullWidth
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            {mode === 'Add' ? (
              <Button
                className="primary noHover"
                variant="contained"
                fullWidth
                onClick={addPet}
              >
                Add Pet
              </Button>
            ) : (
              <Button
                className="primary noHover"
                variant="contained"
                fullWidth
                onClick={editPet}
              >
                Update Pet
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </Modal>
    </>
  );
};

PetInformation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  customer: PropTypes.object.isRequired,
  setCustomer: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  petTypes: PropTypes.array.isRequired,
};

export default PetInformation;
