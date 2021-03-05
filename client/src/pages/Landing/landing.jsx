import React,{Component} from 'react';
import styles from './landing.module.scss';




import {Grid,Card,Transition,Image,Container} from 'semantic-ui-react'

export default class Landing extends Component{

    state = {

        
    }


    componentDidMount(){
        
    }
    render () { 
        
        return(
            <Grid.Row className = {styles.customRow}>
                <Grid.Column width = {2}/>
                <Grid.Column width = {8}>
                    Landing
                </Grid.Column>
                <Grid.Column width = {2}/>
            </Grid.Row>
        )
    } 
}