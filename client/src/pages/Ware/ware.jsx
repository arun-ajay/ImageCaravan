import React,{Component} from 'react';
import styles from './ware.module.scss';
import {Redirect,Link} from 'react-router';
import queryString from 'query-string';
import {v1 as uuid} from "uuid";

import {getImage} from "utils/api";

import {Grid,Card,Transition,Image,Icon,Form, Button,Header,Label, Loader, Comment} from 'semantic-ui-react'

export default class Ware extends Component{

    state = {


        hashtagData : [],
        commentData : [],
        imageData: null,
        open : false,
        redirect: false,
        username : null,
        animations: ["swing right", "swing down", "swing left"],
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

    apiGetImageData = () => {
        const queryStringParameters = queryString.parse(this.props.location.search)
        
        var params = {
            "params": queryStringParameters

        }

        getImage(params).then((response) => {
            console.log(response.data)
            if(response.status === 200){
                this.setState({
                    hashtagData : response.data["imageData"]["hashtags"],
                    commentData : response.data["comments"],
                    imageData :   response.data["imageData"]
                }, () => {
                    this.setState({
                        open: true
                    })
                })
            }
        })

        
    }

    visitProfile = (username) => {
        this.setState({
            username: username,
            redirect: true
        })

    }




    async componentDidMount(){

        this.apiGetImageData()
    
    }
    render () {

        if (this.state.redirect){

            return <Redirect push to = {"/profile?username=" + this.state.username}/>
        }

        var labelArray = this.state.hashtagData.map((data,index) => {
            return <Transition  animation = {this.state.animations[index % 4]} duration = {500+(index)*100} visible = {this.state.open}>
            
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


        var comments = this.state.commentData.map((data,index) => {
            return <span><Transition
            animation = "fly left"
            duration = {500+index*100}
            visible = {this.state.open}
        >
                    <Comment>
                        <Comment.Avatar src = {`data:image/jpeg;base64,${data["commenterPicture"]}`}/>
                        <Comment.Content>
                            <Comment.Author>
                                {data["commenter"]}
                            </Comment.Author>
                            <Comment.Text>
                                {data["comment"]}
                            </Comment.Text>
                            <Comment.Actions>
                                <Comment.Action as = 'a' onClick = {() => this.visitProfile(data["commenter"])}>
                                    Visit Profile
                                </Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                </Transition>
                    <br></br>
                    <br></br>
                </span>
        })



        
        return(
            <Grid.Row className = {styles.customRow}>
                <Grid.Column width = {2}/>
                <Grid.Column width = {12}>
                    {
                        this.state.imageData ?  <Transition
                        animation = "fade down"
                        duration = {500+100}
                        visible = {this.state.open}
                    >
                        <Card centered>
                            <Image  src = {`data:image/jpeg;base64,${this.state.imageData["imageBase64"]}`}/>
                            <Card.Content textAlign = {"center"}>
                                <Card.Header>{this.state.imageData["imageTitle"]}</Card.Header>
                                <Card.Meta>
                                    {this.state.imageData["imageCaption"]}
                                </Card.Meta>
                            </Card.Content>
                            <Card.Content as = 'a' onClick = {() => this.visitProfile(this.state.imageData["imageUploader"])} extra>
                                <a>
                                    <Icon  name = 'user' />
                                    {this.state.imageData["imageUploader"]}
                                </a>
                            </Card.Content>
                        </Card>
                    </Transition>
         
                        :
                        null

                    }
                </Grid.Column>
                <Grid.Column width = {2} />
                <Grid.Column width = {1}/>
 
                <Grid.Column  width = {14}>
                    {
                        this.state.imageData ?
                            <Grid padded = "vertically">
                                <Grid.Row>
                                        <Grid.Column  padded = "horizontally" width = {8}>
                                            <Grid padded = "vertically">
                                                <Grid.Row >
                                                    <Grid.Column  width = {2} />
                                                    <Grid.Column  width = {12}>
                                                        <Label.Group size = 'huge' tag>
                                                            {labelArray}
                                                        </Label.Group>
                                                    </Grid.Column>
                                                    <Grid.Column  width = {2}/>
                                                </Grid.Row>
                                            </Grid>
                                        </Grid.Column>
                                    <Grid.Column  width = {8}>
                                            <Comment.Group size = {"massive"}>
                                                <Header as ='h1' dividing>
                                                    Comments
                                                </Header>
                                                {comments}
        
        
                                                <Form reply>
                                                <Form.TextArea />
                                                <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                                                </Form>
                                            </Comment.Group>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        :
                        <Loader size = 'large' active inline = 'centered'>
                            Digging for your image...
                        </Loader>

                    }
                </Grid.Column>
                <Grid.Column width = {1}/>
            </Grid.Row>
        )
    } 
}