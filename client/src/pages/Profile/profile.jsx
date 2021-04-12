import React,{Component} from 'react';
import styles from './profile.module.scss';
import {Redirect} from 'react-router';
import queryString from 'query-string';

import {getProfile} from "utils/api";

import {Grid,Card,Transition,Image,Flag,Form, Button,Header,Icon, Loader, Comment} from 'semantic-ui-react'

export default class Profile extends Component{

    state = {


        profileData : null,
        commentData : [],
        imageData: [],
        open : false,
        redirect: false,
        username : null,
        imageID: null,
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

    apiGetProfileData = () => {
        const queryStringParameters = queryString.parse(this.props.location.search)
        
        var params = {
            "params": queryStringParameters

        }

        getProfile(params).then((response) => {
            console.log(response.data)
            if(response.status === 200){
                this.setState({
                    profileData : response.data["profileData"],
                    commentData : response.data["profileData"]["comments"],
                    imageData :   response.data["profileData"]["imageData"]
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

    visitImage = (imageID) => {
        this.setState({
            imageID: imageID,
            redirect: true
        })

    }





    async componentDidMount(){

        this.apiGetProfileData()
    
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

         

        var cardArray = this.state.imageData.map((data,index) => {
            return <Transition  animation = {this.state.animations[index % 3]} duration = {500+(index)*20} visible = {this.state.open}>
                
                
                <Card as = 'a' onClick = {() => this.visitImage(this.state.imageData[index]["imageUUID"])}  color = {this.state.colors[index % 13]} fluid>
                    <Image src = {`data:image/jpeg;base64,${data["imageBase64"]}`}  wrapped ui = {false}/>
                    
                </Card>
            
            </Transition>
        }
        )



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



        
        return(
            <Grid.Row className = {styles.customRow}>
                <Grid.Column width = {2}/>
                <Grid.Column width = {12}>
                    {
                        this.state.profileData ?  <Transition
                        animation = "fade down"
                        duration = {500+100}
                        visible = {this.state.open}
                    >
                        <Card centered>
                            <Image  src = {`data:image/jpeg;base64,${this.state.profileData["profilePicture"]}`}/>
                            <Card.Content textAlign = {"center"}>
                                <Card.Header>
                                    {this.state.profileData["username"]}{' '}<Flag name = {this.state.profileData["location"]}/> 
                                </Card.Header>
                                <Card.Meta>
                                    <Grid>
                                       <Grid.Row >
                                           <Grid.Column width = {2}/>
                                           <Grid.Column width = {4}>
       
                                                   {this.state.profileData["followers"]} 
                                                   <br></br>
                                                   Followers
       
                                           </Grid.Column>
                                           <Grid.Column width = {4}>
       
       
                                                   {this.state.profileData["following"]} 
                                                   <br></br>
                                                   Following
       
                                           </Grid.Column>
                                           <Grid.Column width = {4}>
       
                                                   
                                                   {this.state.profileData["imageCount"]} 
                                                   <br></br>
                                                   Images 
       
                                           </Grid.Column>
                                           <Grid.Column width = {2}/>
                                       </Grid.Row>
                                    </Grid>
       
       
                                </Card.Meta>
                                <Card.Description>
                                    {this.state.profileData["bio"]}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                follow?
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
                        this.state.profileData ?
                            <Grid padded = "vertically">
                                <Grid.Row>
                                        <Grid.Column  padded = "horizontally" width = {8}>
                                            <Grid padded = "vertically">
                                                <Grid.Row >
                                                    <Grid.Column  width = {2} />
                                                    <Grid.Column  width = {4}>
                                                            {first}
                                                    </Grid.Column>
                                                    <Grid.Column width = {4}>
                                                            {second}
                                                    </Grid.Column>
                                                    <Grid.Column width = {4}>
                                                            {third}
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
                            Signaling traveler...
                        </Loader>

                    }
                </Grid.Column>
                <Grid.Column width = {1}/>
            </Grid.Row>
        )
    } 
}