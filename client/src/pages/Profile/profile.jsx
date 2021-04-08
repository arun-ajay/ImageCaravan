import React,{Component} from 'react';
import styles from './profile.module.scss';

import queryString from 'query-string';

import {getProfile} from "utils/api";

import {Grid,Card,Transition,Image,Container,Divider,Header,Icon, Label} from 'semantic-ui-react'

export default class Profile extends Component{

    state = {


        profileData : [],
        open : false,
        colors : [
            'red',
            'orange',
            'yellow',
            'olive',
            'green',
            'teal',
            'blue',
            'violet',
            'purple',
            'pink',
            'brown',
            'grey',
            'black'],
 
        
    }

    apiGetProfileData = () => {
        const queryStringParameters = queryString.parse(this.props.location.search)
        
        var params = {
            "params": queryStringParameters

        }

        getProfile(params).then((response) => {
            console.log(response.data)
        })

        
    }



    async componentDidMount(){
    
    }
    render () { 

        this.apiGetProfileData()
        
        return(
            <Grid.Row className = {styles.customRow}>
                <Grid.Column width = {1}/>
                <Grid.Column style = {{"border": "5px solid red"}} width = {4}>
                    profile card here
                </Grid.Column>
                <Grid.Column padded = "vertically" style = {{"border": "5px solid blue"}} width = {10}>
                    <Grid>
                        <Grid.Row >
                            <Grid.Column width = {16}>
                                images here
                            </Grid.Column>
                            <Grid.Column width = {16}>
                                comments here
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column width = {1}/>
            </Grid.Row>
        )
    } 
}