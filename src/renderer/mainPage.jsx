import React from 'react';
import { useRecoilState } from 'recoil';
import Navbar from '../nav/navbar';
import { loginState } from '../utils/recoilStates';
import Login from './login';

const MainPage = () => {
  const [login, setLogin] = useRecoilState(loginState);

  return <>{login ? <Navbar /> : <Login />}</>;
};

export default MainPage;
