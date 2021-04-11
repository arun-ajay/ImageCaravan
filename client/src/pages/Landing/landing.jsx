import React,{Component} from 'react';
import styles from './landing.module.scss';

import {getRandomImages} from "utils/api"
import trader from "pages/Landing/assets/trader.png"
import {Redirect} from 'react-router';

import {Grid,Card,Transition,Image,Icon,Header,Segment,Label} from 'semantic-ui-react'

export default class Landing extends Component{

    state = {
        images : [],
        open: false,
        username: null,
        redirect: false,
        imageID: null,
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
            'black']
        
    }

    apiRandomImages = () => {
        getRandomImages().then((response) => {
            if(response.status === 200){
                this.setState({
                    images : response.data["RandomImageCollection"]
                }, () => {
                    this.setState({
                        open: true
                    })
                })
            }
            else{
                console.log("SERVER ERROR",response)
            }
        })
    }

    visitProfile = (username) => {
        this.setState({
            username: username,
            redirect: true
        })

    }

    visitImage = (imageID) => {

        this.setState({
            imageID: imageID,
            redirect: true
        })

    }



    async componentDidMount(){
        this.apiRandomImages()
    
    }

  

    render () { 

        if (this.state.redirect){
            if(this.state.username){
                return <Redirect push to = {"/profile?username=" + this.state.username}/>
            }
            else if (this.state.imageID){
                return <Redirect push to = {"/image?imageUUID=" + this.state.imageID}/>

            }
        }

        var cardArray = this.state.images.map((data,index) => {
            return <Transition  animation = "scale" duration = {500+(index)*100} visible = {this.state.open}>
                
                
                <Card as = 'a' color = {this.state.colors[index % 13]} fluid>
                    <Image as = 'a' onClick = {() => this.visitImage(data["imageUUID"])} src = {`data:image/jpeg;base64,${data["imageBase64"]}`}  wrapped ui = {false}/>
                    <Card.Content>
                        <Card.Header>{data["imageTitle"]}</Card.Header>
                        <Card.Meta>
                            {data["imageCaption"]}
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content as = 'a' onClick = {() => this.visitProfile(data["imageUploader"])} extra>
                        <a>
                            <Icon  name = 'user' />
                            {data["imageUploader"]}
                        </a>
                    </Card.Content>
                    
                </Card>
            
            </Transition>
        }
        )

        var first = cardArray.map((data,index) => {
            if ((index + 1) % 3 == 1){
                return data
            }
        })
        var second = cardArray.map((data,index) => {
            if ((index + 1) % 3 == 2){
                return data
            }
        })
        var third = cardArray.map((data,index) => {
            if ((index + 1) % 3 == 0){
                return data
            }
        })

        var fourth = cardArray.map((data,index) => {
            if ((index + 1) % 4 == 0){
                return data
            }
        })
        
    

        
        return(
            <Grid.Row className = {styles.customRow}>
                <Grid.Column width = {4}/>
                <Grid.Column textAlign = {"center"} width = {8}>
                    <Transition  animation = "fade down" duration = {500} visible = {this.state.open}>
                        <Image src = {trader} size = 'large' centered circular/>
                
                    </Transition>
                    <Transition  animation = "fade down" duration = {700} visible = {this.state.open}>
                        <Header as='h2'>
                                Welcome to Image Caravan traveler!
                            <Header.Subheader>
                                Like sharing memes? You'll fit right in...
                            </Header.Subheader>
                        </Header>
                    </Transition>
                    <br></br>
                </Grid.Column>
                <Grid.Column width = {4}/>
                
                <Grid.Column width = {2} />
                <Grid.Column width = {3}>
                        {first}
                 
                </Grid.Column>
                <Grid.Column width = {3}>
            
                        {second}
                 
                </Grid.Column>
                <Grid.Column width = {3}>
            
                        {third}
                 
                </Grid.Column>
                <Grid.Column width = {3}>
            
                        {fourth}
                 
                </Grid.Column>
                <Grid.Column width = {2}/>
            </Grid.Row>
        )
    } 
}