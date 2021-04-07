import React,{Component} from 'react';
import styles from './goods.module.scss';

import {getHashtags} from "utils/api"
import bazaar from "pages/Goods/assets/bazaar.png"

import {Grid,Card,Transition,Image,Container,Divider,Header,Icon, Label} from 'semantic-ui-react'

export default class Goods extends Component{

    state = {


        hashtags : [],
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
        animation : ["swing right", "swing up", "swing down", "swing left"]
        
    }



    apiGetHashtags = () => {

        getHashtags().then((response) => {
            console.log(response.data)
            if (response.status === 200){
                this.setState({
                    hashtags: response.data["getAllHashtags"]
                }, () => {
                    this.setState({
                        open : true
                    })
                })
            }
            else{
                console.log("SERVER ERROR",response)
            }

        })
    }

    async componentDidMount(){
        this.apiGetHashtags()
    }
    render () { 

        var labelArray = this.state.hashtags.map((data,index) => {
            console.log(data["hashtag"])
            return <Transition  animation = {this.state.animation[index % 4]} duration = {500+(index)*100} visible = {this.state.open}>
            
            <Label as = 'a'  color = {this.state.colors[index % 13 ]} >
                <Icon name = 'hashtag'/>
                {data["hashtag"]}     
                <Label.Detail>
                    <Icon name = 'images'/>
                    {data["imageCount"]}
                </Label.Detail>
            </Label>
            </Transition>
        })
        
        return(
            <Grid.Row className = {styles.customRow}>
                <Grid.Column width = {3}/>
                <Grid.Column textAlign = {"center"} width = {10}>
                    <Transition  animation = "fade down" duration = {500} visible = {this.state.open}>
                        <Image src = {bazaar} size = 'medium' centered/>
                
                    </Transition>
                    <Transition  animation = "fade down" duration = {700} visible = {this.state.open}>
                    
                        <Header as='h2'>
                                We've got plenty of goods!
                        </Header>
                    </Transition>
                    <Label.Group size = 'huge' tag>
                        {labelArray}
                    </Label.Group>
                </Grid.Column>
                <Grid.Column width = {3}/>
            </Grid.Row>
        )
    } 
}