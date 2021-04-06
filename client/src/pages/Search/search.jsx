import React,{Component} from 'react';
import styles from './search.module.scss';

import {Grid,Card,Transition,Image,Container} from 'semantic-ui-react';
import queryString from 'query-string';
export default class Search extends Component{

    state = {

        
    }

    searchQuery = () => {
        console.log("path",window.location.pathname)
        const queryStringParameters  = queryString.parse(this.props.location.search)
        var params = {
            params: {
                "path": queryStringParameters
            }
        }

        console.log(params)
    }


    componentDidMount(){
        
    }
    render () { 
        
        return(
            <Grid.Row className = {styles.customRow}>
                <Grid.Column width = {2}/>
                <Grid.Column width = {8}>
                    Search
                    {this.searchQuery()}
                </Grid.Column>
                <Grid.Column width = {2}/>
            </Grid.Row>
        )
    } 
}