/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Paper,
  Divider,
  Box,
  TextField,
  Grid,
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

const PetInformation = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [pets, setPets] = useState([]);
  const [pet, setPet] = useState({
    name: '',
    petType: '',
    breed: '',
    dob: '',
    notes: '',
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

  const addPet = (event) => {
    setPets([...pets, pet]);
    setPet({
      name: '',
      petType: '',
      breed: '',
      dob: '',
      notes: '',
    });
    handleCloseModal();
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
    const modifiedPets = pets;
    modifiedPets.splice(id, 1);
    setPets([...modifiedPets]);
  };

  return (
    <>
      <h2 className="heading">Pets</h2>
      <StyledDivider />

      {pets && (
        <Table>
          {pets.map((currentPet, index) => {
            return (
              <TableRow>
                <TableCell className="noPadding">{currentPet.name}</TableCell>
                <TableCell className="noPadding">
                  {currentPet.petType}
                </TableCell>
                <TableCell className="noPadding">{currentPet.breed}</TableCell>
                <TableCell className="noPadding" align="right">
                  <IconButton
                    // In Javascript, 0 converts to an empty string
                    id={index === 0 ? '0' : `${index.toString()}d`}
                    className="secondary formButton"
                    variant="contained"
                    // onClick={editPet}
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
        onClick={handleOpenModal}
      >
        <AddIcon />
      </Button>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box component="form" autoComplete="off" sx={style}>
          <h2>New Pet</h2>
          <StyledDivider />
          <TextField
            id="name"
            value={pet.name}
            className="formField"
            fullWidth
            required
            label="Name"
            placeholder="Name"
            onChange={handleChange}
          />
          <Autocomplete
            disablePortal
            id="petType"
            className="formField"
            required
            fullWidth
            options={[]}
            renderInput={(params) => <TextField {...params} label="Pet Type" />}
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
              className="primary noHover"
              variant="contained"
              fullWidth
              onClick={addPet}
            >
              Add Pet
            </Button>
            <Button
              className="secondary noHover"
              variant="contained"
              fullWidth
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </>
  );
};

export default PetInformation;
