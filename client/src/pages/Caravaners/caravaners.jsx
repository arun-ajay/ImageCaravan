import React,{Component} from 'react';
import styles from './caravaners.module.scss';
import Caravanner from "pages/Caravaners/assets/caravanner.jpg";



import {Grid,Card,Transition,Image,Icon} from 'semantic-ui-react'

export default class Caravaners extends Component{

    state = {

        open : false
    }


    componentDidMount(){
        this.setState({
            open: true
        })
    }
    render () { 

        var projectData = [
            {
                'username': ' Joses Farrell ',
                'followerCount': 12,
                'bio': "Award-winning twitter nerd. Introvert. Future teen idol. Beer fanatic. Lifelong bacon maven. Hardcore student. Proud tv fan.",
                'followingCount': 15,
                'imagesUploaded': 17
            },
            {
                'username': ' Marita Anona ',
                'followerCount': 30,
                'bio': "Typical thinker. Total internet guru. Extreme tv ninja. Bacon evangelist.",
                'followingCount': 81,
                'imagesUploaded': 65
            },
            {
                'username': ' Diarmaid Eliav ',
                'followerCount': 5,
                'bio': "Friendly entrepreneur. Gamer. Award-winning zombie ninja. Travel practitioner. Thinker. General web fanatic.",
                'followingCount': 200,
                'imagesUploaded': 2
            },
            {
                'username': ' Eha Daphné ',
                'followerCount': 16,
                'bio': "Coffee lover. Falls down a lot. Freelance entrepreneur. Total twitter fan. Music trailblazer. Travel specialist.",
                'followingCount': 20,
                'imagesUploaded': 87
            },
            {
                'username': ' Cleve Stuart ',
                'followerCount': 99,
                'bio': "Internet fanatic. Hipster-friendly beer practitioner. General coffee fan. Food ninja. Certified twitter fanatic.",
                'followingCount': 11,
                'imagesUploaded': 305
            },
            {
                'username': ' Wöllem Ainura ',
                'followerCount': 74,
                'bio': "Avid zombieaholic. Friendly problem solver. Music practitioner. Thinker. Bacon fan. Devoted web junkie.",
                'followingCount': 20,
                'imagesUploaded': 66
            },
        ]

        var cardArray = projectData.map((data,index) => {
            return  <Transition
                 animation = "fade down"
                 duration = {500+(index)*100}
                 visible = {this.state.open}
             >
                 <Card>
                     <Image src = {Caravanner} wrapped ui = {false}/>
                     <Card.Content textAlign = {"center"}>
                         <Card.Header>
                             {data.username}
                         </Card.Header>
                         <Card.Meta>
                             <Grid>
                                <Grid.Row >
                                    <Grid.Column width = {2}/>
                                    <Grid.Column width = {4}>

                                            {data.followerCount} 
                                            <br></br>
                                            Followers

                                    </Grid.Column>
                                    <Grid.Column width = {4}>


                                            {data.followingCount} 
                                            <br></br>
                                            Following

                                    </Grid.Column>
                                    <Grid.Column width = {4}>

                                            
                                            {data.imagesUploaded} 
                                            <br></br>
                                            Images 

                                    </Grid.Column>
                                    <Grid.Column width = {2}/>
                                </Grid.Row>
                             </Grid>


                         </Card.Meta>
                         <Card.Description>
                             {data.bio}
                         </Card.Description>
                     </Card.Content>
                 </Card>
             </Transition>
         })
        return(
            <Grid.Row className = {styles.customRow}>
                <Grid.Column width = {3}/>
                <Grid.Column only = {"computer"} width = {10}>
                    <Card.Group stackable itemsPerRow = {2}>
                        {cardArray}
                    </Card.Group>
                </Grid.Column>
                <Grid.Column width = {3}/>
            </Grid.Row>
        )
    } 
}