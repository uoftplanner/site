import {CSSReset, ChakraProvider} from '@chakra-ui/core';
import theme from '@chakra-ui/theme';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import UserContext from './context/UserContext';
import Header from './component/Header';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import ForgotPassword from './views/ForgotPassword';
import ResetPassword from './views/ResetPassword';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      auth: {
        isLoading: true,
        user: null,
      },
    };
  }

  componentDidMount() {
    // get and set currently logged in user to state
    Axios.get('/auth/').then(response => {
      if (response.data.success) {
        this.setState({
          auth: {
            isLoading: false,
            user: response.data.user,
          },
        });
        return;
      }

      this.setState({
        auth: {
          isLoading: false,
        },
      });
    });
  }

  render() {
    const {auth} = this.state;

    return (
      <ChakraProvider theme={theme}>
        <UserContext.Provider value={auth}>
          <CSSReset />
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/password/forgot" component={ForgotPassword} />
              <Route exact path="/password/reset/:ident/:today-:hash" component={ResetPassword} />
            </Switch>
          </Router>
        </UserContext.Provider>
      </ChakraProvider>
    );
  }
}

export default App;
