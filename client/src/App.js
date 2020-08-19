import {CSSReset, ChakraProvider} from '@chakra-ui/core';
import theme from '@chakra-ui/theme';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import HomePage from './views/HomePage';
import CoursePage from './views/CoursePage';

class App extends React.Component {
  render() {
    return (
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/course/:courseId" component={CoursePage} />
          </Switch>
        </Router>
      </ChakraProvider>
    );
  }
}

export default App;
