import React,{Component} from 'react';
import styles from './goods.module.scss';




import {Grid,Card,Transition,Image,Container,Divider} from 'semantic-ui-react'

export default class Goods extends Component{

    state = {

        
    }


    componentDidMount(){
        
    }
    render () { 
        
        return(
            <Grid.Row className = {styles.customRow}>
                Selected Goods
                <Divider></Divider>
                All goods
            </Grid.Row>
        )
    } 
}