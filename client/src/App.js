import logo from './logo.svg';
import styles from './App.module.scss'
import {
  BrowserRouter as Router,Route,
  Switch,
  Redirect
} from "react-router-dom"
import Header from "components/header/header";
import Landing from "pages/Landing/landing";
import Caravaners from "pages/Caravaners/caravaners";
import Goods from "pages/Goods/goods";
import Search from "pages/Search/search";
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
                <Route exact path = "/caravanners" component = {Caravaners}/>
                <Route exact path = "/goods" component = {Goods}/>
                <Route exact path = "/search" component = {Search}/>
                <Redirect from = "/home" to = "/"/>
                <Redirect from = "/*"  to = "/"/>
            </Switch>
          </Router>
  
        </Grid>
  
    );

  }
}

export default App;