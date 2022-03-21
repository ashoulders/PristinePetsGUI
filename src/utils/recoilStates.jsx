import { atom } from 'recoil';

const loginState = atom({
  key: 'loginState',
  default: false,
});

const jwtTokenState = atom({
  key: 'jwtTokenState',
  default: '',
});

const urlState = atom({
  key: 'url',
  default: 'https://pristinepets.hopto.org:7021/api',
});

export { loginState, jwtTokenState, urlState };
