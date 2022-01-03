import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import Navbar from '../nav/navbar';
import './App.global.css';
import theme from './theme';

export default function App() {
  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <Route path="/" component={Navbar} />
        </ThemeProvider>
      </Switch>
    </Router>
  );
}
