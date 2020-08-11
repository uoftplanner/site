import {CSSReset, ThemeProvider} from '@chakra-ui/core'
import React from 'react';
import './App.css';
import Header from './component/Header'

class App extends React.Component {
    render() {
        return (
            <ThemeProvider>
                <CSSReset/>
                <Header/>
            </ThemeProvider>
        );
    }
}

export default App;
