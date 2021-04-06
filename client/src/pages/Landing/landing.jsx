import React,{Component} from 'react';
import styles from './landing.module.scss';

import {getRandomImages} from "utils/api"


import {Grid,Card,Transition,Image,Container} from 'semantic-ui-react'

export default class Landing extends Component{

    state = {
        images : []
        
    }

    apiRandomImages = () => {
        console.log("calling func...")
        getRandomImages().then((response) => {
            if(response.status === 200){
                console.log(response.data)
                this.setState({
                    images : response.data["RandomImageCollection"]
                })
            }
            else{
                console.log("SERVER ERROR",response)
            }
        })
    }


    async componentDidMount(){
        this.apiRandomImages()
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