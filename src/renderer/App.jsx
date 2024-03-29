import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { RecoilRoot } from 'recoil';
import './App.global.css';
import axios from 'axios';
import theme from './theme';
import MainPage from './mainPage';

export default function App() {
  axios.defaults.baseURL = 'https://pristinepets.hopto.org:7021/api';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <Route path="/" component={MainPage} />
          </RecoilRoot>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}
