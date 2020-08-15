import {CSSReset, ThemeProvider} from '@chakra-ui/core'
import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import './App.css';
import Header from './component/Header'
import HomePage from './views/HomePage'

class App extends React.Component {
	render() {
		return (
			<ThemeProvider>
				<CSSReset />
				<Header />
				<Router>
					<Switch>
						<Route exact path="/" component={HomePage} />
					</Switch>
				</Router>
			</ThemeProvider>
		);
	}
}

export default App;
