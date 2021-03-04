import React,{Component} from 'react';
import styles from './caravaners.module.scss';




import {Grid,Card,Transition,Image,Container} from 'semantic-ui-react'

export default class Caravaners extends Component{

    state = {

        
    }


    componentDidMount(){
        
    }
    render () { 
        
        return(
            <Grid.Row className = {styles.customRow}>
                Caravaners
            </Grid.Row>
        )
    } 
}