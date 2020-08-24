import {CSSReset, ChakraProvider} from '@chakra-ui/core';
import theme from '@chakra-ui/theme';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import {UserContext} from './context/UserContext';
import Header from './component/Header';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';

import Axios from 'axios';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: {}
    };
  }

  componentDidMount() {
    // get and set currently logged in user to state
    Axios.get('/auth/')
    .then((response) => {
      console.log(response);
      if (response.data.success) {
        this.setState({loggedIn: true, user: response.data.user});
      } else {
        this.setState({loggedIn: false});
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    const value = {
      loggedIn: this.state.loggedIn,
      user: this.state.user
    }
    return (
      <ChakraProvider theme={theme}>
        <UserContext.Provider value={value}>
          <CSSReset />
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
            </Switch>
          </Router>
        </UserContext.Provider>
      </ChakraProvider>
    );
  }
}

export default App;
