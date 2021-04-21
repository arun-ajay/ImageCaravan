import React,{Component} from 'react';
import styles from './search.module.scss';
import {Redirect} from 'react-router';

import {Grid,Card,Transition,Image,Icon,Loader} from 'semantic-ui-react';
import queryString from 'query-string';

import {search} from "utils/api";

export default class Search extends Component{

    state = {
        images: [],
        redirect: false,
        username : null,
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
            'black'],
        open: false
        
    }

    searchQuery = () => {
        console.log("path",window.location.pathname)
        const queryStringParameters  = queryString.parse(this.props.location.search)
        var params = {
            params: {
                "path": queryStringParameters
            }
        }
    }

    apiSearch = () => {
        const queryStringParameters = queryString.parse(this.props.location.search)
        
        var params = {
            "params": queryStringParameters

        }

        search(params).then((response) => {
            if(response.status === 200){
                this.setState({
                    images : response.data["data"]
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


    componentDidMount(){

        this.apiSearch()
        
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
            if ((index + 1) % 4 == 1){
                return data
            }
        })
        var second = cardArray.map((data,index) => {
            if ((index + 1) % 4 == 2){
                return data
            }
        })
        var third = cardArray.map((data,index) => {
            if ((index + 1) % 4 == 3){
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
            {
                this.state.images.length ?
                <Grid>
                    <Grid.Row>
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
                </Grid>

 
                :
                <Grid.Column width = {16}>
                <Loader size = 'large' active inline = 'centered'>
                    Fetching your images...
                </Loader>

                </Grid.Column>
            }
            </Grid.Row>
        )
    } 
}