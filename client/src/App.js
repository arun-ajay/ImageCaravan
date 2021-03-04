import logo from './logo.svg';
import styles from './App.module.scss'
import {
  BrowserRouter as Router,Route,
  Switch,
  Redirect
} from "react-router-dom"
import Header from "components/header/header";
import Landing from "pages/Landing/landing";
import React,{Component} from 'react';

import {Grid} from 'semantic-ui-react';
class App extends Component {

  state = {}

  render(){
    return (
  
        <Grid className = {styles.customGrid} padded = "vertically">
          
          <Router>
            <Route component = {Header}/>
            <Switch>
                <Route exact path = "/" component = {Landing}/>
                <Redirect from = "/home" to = "/"/>
                <Redirect from = "/*"  to = "/"/>
            </Switch>
          </Router>
  
        </Grid>
  
    );

  }
}

export default App;