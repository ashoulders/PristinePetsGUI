import { atom } from 'recoil';

const loginState = atom({
  key: 'loginState',
  default: false,
});

const jwtTokenState = atom({
  key: 'jwtTokenState',
  default: '',
});

const url = atom({
  key: 'url',
  default: '',
});

export { loginState, jwtTokenState };
