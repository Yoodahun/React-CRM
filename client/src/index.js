import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import App from './App';
import Home from './components/Home';

import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"; //Theme적용

const theme = createMuiTheme({
    typography: {
        fontFamily: '"Noto Sans JP", serif',
    }
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/App/" component={App} />
        </Router>
    </MuiThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
