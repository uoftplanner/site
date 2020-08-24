import {CSSReset, ChakraProvider} from '@chakra-ui/core';
import theme from '@chakra-ui/theme';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';

class App extends React.PureComponent {
  render() {
    return (
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
          </Switch>
        </Router>
      </ChakraProvider>
    );
  }
}

export default App;
