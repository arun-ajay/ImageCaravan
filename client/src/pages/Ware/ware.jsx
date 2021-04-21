import React,{Component} from 'react';
import styles from './ware.module.scss';
import {Redirect,Link} from 'react-router';
import queryString from 'query-string';

import {getImage,imagecomment} from "utils/api";

import {Grid,Card,Transition,Image,Icon,Form, Button,Header,Label, Loader, Comment} from 'semantic-ui-react'

export default class Ware extends Component{

    state = {


        hashtagData : [],
        commentData : [],
        imageData: null,
        open : false,
        comment: '',
        redirect: false,
        username : null,
        hash: null,
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

    onChangeComment(e){
        this.setState({
            comment: e.target.value
        })
    }

    apiImageComment = () =>{        
        var data = {
            "username": this.state.profileUser,
            "targetImageUUID": this.state.imageIDPage,
            "comment": this.state.comment
        }
        imagecomment(data)
        .then((response) => {
            if (response.status === 200){
                window.location.reload()
            }
        }
        )
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
                    commentData : response.data["imageData"]["comments"],
                    imageData :   response.data["imageData"],
                    imageIDPage: queryStringParameters["imageUUID"]
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

    visitHash = (hash) => {
        this.setState({
            hash: hash,
            redirect: true
        })

    }




    async componentDidMount(){
        this.setState({
            isLoggedIn : JSON.parse(localStorage.getItem("caravan-isLoggedIn")),
            profileUser : localStorage.getItem("caravan-username"),
            profileList : JSON.parse(localStorage.getItem("caravan-followList"))
        }, () => {
            this.apiGetImageData()
        })    
    
    }
    render () {

        if (this.state.redirect){
            if(this.state.username){
                return <Redirect push to = {"/profile?username=" + this.state.username}/>
            }
            else if (this.state.hash){
                return <Redirect push to = {"/search?searchType=hash&value=" + this.state.hash}/>

            }
        }

        if (this.state.redirect){

            return <Redirect push to = {"/profile?username=" + this.state.username}/>
        }

        var labelArray = this.state.hashtagData.map((data,index) => {
            return <Transition  animation = {this.state.animations[index % 4]} duration = {500+(index)*100} visible = {this.state.open}>
            
            <Label onClick = {() => this.visitHash(data["hashtag"])}  as = 'a'  color = {this.state.colors[index % 13 ]} >
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
                            {
                                (this.state.imageData["imageUploader"] == "Anonymous") ?
                                <Card.Content extra>
                                    <span>
                                        <Icon  name = 'user' />
                                        {this.state.imageData["imageUploader"]}
                                    </span>
                                </Card.Content>
                                :
                                <Card.Content as = 'a' onClick = {() => this.visitProfile(this.state.imageData["imageUploader"])} extra>
                                    <a>
                                        <Icon  name = 'user' />
                                        {this.state.imageData["imageUploader"]}
                                    </a>
                                </Card.Content>
                            }
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
        
                                                {
                                                    this.state.isLoggedIn ?
                                                    <Form reply>
                                                        <Form.TextArea onChange = {(e) => {this.onChangeComment(e)}} />
                                                        {
                                                            this.state.comment.length ?
                                                            <Button className = {styles.upload} onClick = {() => this.apiImageComment()} floated = 'right' content='Add Reply' labelPosition='left' icon='edit' primary />
    
                                                            :
                                                            <Button className = {styles.upload} disabled floated = 'right' content='Add Reply' labelPosition='left' icon='edit' primary />
    
                                                        }
                                                    </Form>
                                                    :
                                                    null
                                                }
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