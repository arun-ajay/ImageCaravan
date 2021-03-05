import React,{Component} from 'react';
import styles from './search.module.scss';




import {Grid,Card,Transition,Image,Container} from 'semantic-ui-react'

export default class Search extends Component{

    state = {

        
    }


    componentDidMount(){
        
    }
    render () { 
        
        return(
            <Grid.Row className = {styles.customRow}>
                <Grid.Column width = {2}/>
                <Grid.Column width = {8}>
                    Search
                </Grid.Column>
                <Grid.Column width = {2}/>
            </Grid.Row>
        )
    } 
}