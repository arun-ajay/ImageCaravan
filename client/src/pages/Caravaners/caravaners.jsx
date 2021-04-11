import React,{Component} from 'react';
import styles from './caravaners.module.scss';
import {Redirect} from 'react-router';

import {getAllProfiles} from "utils/api"

import {Grid,Card,Transition,Image,Icon,Flag,Label} from 'semantic-ui-react'

export default class Caravaners extends Component{

    state = {
        profileData : [],
        open : false,
        redirect : false,
        username: null
    }

    apiGetAllProfiles = () => {
        getAllProfiles().then((response) => {
            if(response.status === 200){
                this.setState({
                    profileData : response.data["getAllProfiles"]
                }, () => {
                    this.setState({
                        open : true
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
        this.apiGetAllProfiles()
    }
    render () { 

        if (this.state.redirect){
            return <Redirect push to = {"/profile?username=" + this.state.username}/>
        }

        var cardArray = this.state.profileData.map((data,index) => {
            return  <Transition
                 animation = "fade down"
                 duration = {500+(index)*100}
                 visible = {this.state.open}
             >
                 <Card as = 'a' fluid  onClick = {() => this.visitProfile(data["username"])}>
                     <Image  src = {`data:image/jpeg;base64,${data["profilePicture"]}`}/>
                     <Card.Content textAlign = {"center"}>
                         <Card.Header>
                             {data["username"]}{' '}<Flag name = {data["location"]}/> 
                         </Card.Header>
                         <Card.Meta>
                             <Grid>
                                <Grid.Row >
                                    <Grid.Column width = {2}/>
                                    <Grid.Column width = {4}>

                                            {data["followers"]} 
                                            <br></br>
                                            Followers

                                    </Grid.Column>
                                    <Grid.Column width = {4}>


                                            {data["following"]} 
                                            <br></br>
                                            Following

                                    </Grid.Column>
                                    <Grid.Column width = {4}>

                                            
                                            {data["imageCount"]} 
                                            <br></br>
                                            Images 

                                    </Grid.Column>
                                    <Grid.Column width = {2}/>
                                </Grid.Row>
                             </Grid>


                         </Card.Meta>
                         <Card.Description>
                             {data["bio"]}
                         </Card.Description>
                     </Card.Content>
                 </Card>
             </Transition>
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
            
            <Grid.Column width = {2} />
            <Grid.Column width = {4} >
                    {first}
             
            </Grid.Column>
            <Grid.Column width = {4}>
        
                    {second}
             
            </Grid.Column>
            <Grid.Column width = {4}>
        
                    {third}
             
            </Grid.Column>
            <Grid.Column width = {2}/>
            </Grid.Row>
        )
    } 
}