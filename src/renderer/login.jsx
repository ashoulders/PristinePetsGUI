import { Button, Divider, Paper, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from '@mui/material/styles';
import { loginState } from '../utils/recoilStates';

const Login = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
  });

  const StyledDivider = styled(Divider)(() => ({
    marginBottom: '15px',
  }));

  const handleChange = (event) => {
    const modifiedLoginDetails = loginDetails;
    modifiedLoginDetails[event.target.id] = event.target.value;
    setLoginDetails({ ...modifiedLoginDetails });
  };

  const handleLogin = () => {
    setLogin(true);
  };

  return (
    <Paper className="login" elevated={2}>
      <h2 className="heading">Login</h2>
      <StyledDivider />
      <Box component="form" autoComplete="off">
        <TextField
          id="username"
          value={loginDetails.username}
          className="formField"
          fullWidth
          required
          label="Username"
          placeholder="Username"
          onChange={handleChange}
        />
        <TextField
          id="password"
          value={loginDetails.password}
          className="formField"
          fullWidth
          required
          label="Password"
          placeholder="Password"
          onChange={handleChange}
          type="password"
        />
        <Button
          className="primary floatRight"
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
