import React,{Component} from 'react';
import styles from  "components/header/header.module.scss"
import {Redirect} from 'react-router';


import {Link} from "react-router-dom";
import Travelers from "components/header/assets/travelers.jpg"
import queryString from 'query-string';

import {getAllProfileUsernames,getAllImageTitles,getHashtags} from "utils/api";

import {Grid,Menu,Button,Card, Input, Image, Label,TransitionablePortal,Icon,Form,Dropdown} from 'semantic-ui-react'

import {menuJson} from "./data"


export default class SiteHeader extends Component{
    state = {
        activeItem : null,
        signIn: true,
        searchType: '',
        searchQuery: [],
        hashtags : [],
        imageTitles: [],
        usernames: [],
        options : [],
        redirect: false
    }

    updateSelection = (e,{value}) => {
        console.log(value)
        this.props.history.push('/search')

    }

    getGoods = () => {
        return [
            {
                "key": 0,
                "text": "#dogs",
                "value": "dogs"
            },
            {
                "key": 1,
                "text": "#cats",
                "value": "cats"
            },
            {
                "key": 2,
                "text": "#birds",
                "value": "birds"
            },
            {
                "key": 3,
                "text": "#birds",
                "value": "birds"
            },

        ]
    }

    apiGetProfileNames = () => {
        const queryStringParameters = queryString.parse(this.props.location.search)
        
        var params = {
            "params": queryStringParameters

        }
        getAllProfileUsernames(params).then((response) => {
            if(response.status === 200){
                this.setState({
                    usernames : response.data["getAllProfileUsernames"]
                })
            }
        })  
    }

    apiGetHashtags = () => {
        const queryStringParameters = queryString.parse(this.props.location.search)
        
        var params = {
            "params": queryStringParameters

        }
        getHashtags(params).then((response) => {
            if(response.status === 200){
                this.setState({
                    hashtags : response.data["getAllHashtags"]
                })
            }
        })  
    }

    apiGetAllImageTitles = () => {
        const queryStringParameters = queryString.parse(this.props.location.search)
        
        var params = {
            "params": queryStringParameters

        }
        getAllImageTitles(params).then((response) => {
            if(response.status === 200){
                this.setState({
                    imageTitles : response.data["getAllImageTitles"]
                })
            }
        })  
    }

    searchImage = () => {
        this.setState({
            redirect: true
        })
    }

    getSearchValue = () => {
        return this.state.searchValue
    }
  
    adjustQuery = (e,{value}) => {
        console.log("VALUE",value)
        this.setState({
            searchQuery: value
        })
    }

    uploadFile = event => {
    
        // filename
        console.log('filename ' + event.target.value);
        
        //file 
        console.log('file ' + event.target.files[0]);
        
        // if you are using axios then you can use below code
        //const formData = new FormData();
            // formData.append('file', event.target.files[0])
            // axios.put(
            //     'url',
            //     formData,
            //     { headers: { 'content-type': 'multipart/form-data' } }
            // ).then(data => {
            //     console.log('file uploaded')
            //     console.log(data)
            // }).catch(e => {
            //     console.log('error')
            //     console.log(e)
            // })
            
            // in express , node, backend code would be
            //import formidable from 'formidable'
            //(req, res) => {
            //  let form = new formidable.IncomingForm();
            //  form.parse(req, (err, fields, files) => {
                // you can get the file from files.file.path
            //  })
            // }
      }

    changeLogin = () => {
        this.setState({
            signIn : !this.state.signIn
        }, () => {
            console.log("Sign In",this.state.signIn)
        })
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    }

    changeSearchType = (e,{value}) => {
        this.setState({
            searchType: value,
            searchQuery: []
        }, () => {
            if (this.state.searchType == "user"){
                this.setState({
                    options: this.state.usernames.map((data,index) => {
                        return {
                            key: index,
                            value: data["username"],
                            text: <span><Icon color = 'orange'  name='user circle' /> {data["username"]} </span>
                        }
                    }),
                   searchQuery: [] 
                    })
            }
            else if (this.state.searchType == "hash"){
                this.setState({
                    options: this.state.hashtags.map((data,index) => {
                        return {
                            key: index,
                            value: data["hashtag"],
                            text: <span><Icon color = 'orange'  name='hashtag' /> {data["hashtag"]} </span>
                        }
                    }),
                    searchQuery: [] 
                })
            }
            else if (this.state.searchType == "image"){
                this.setState({
                    options: this.state.imageTitles.map((data,index) => {
                        return {
                            key: index,
                            value: data["imageUUID"],
                            text: <span><Icon color = 'orange'  name='image' /> {data["imageTitle"]} </span>
                        }
                    }),
                    searchQuery: [] 
                })
            }
        })
    }

    componentDidMount(){
        this.setState({open: true})
        var path = null
        if (window.location.pathname === "/"){
            path = "Home"
        }
        this.setState({
            activeItem: path
        }, () => {
            this.apiGetProfileNames()
            this.apiGetAllImageTitles()
            this.apiGetHashtags()
        })

    }
    render () { 

        if (this.state.redirect){
            if (this.state.searchType && this.state.searchQuery){
                var queryURL = "?searchType" + "=" + this.state.searchType + "&values="
                var values = ""
                for(var i=0; i < this.state.searchQuery.length; i++){
                    values += this.state.searchQuery[i]
                    if (i + 1 != this.state.searchQuery.length){
                        values += ","
                    }
                } 
                queryURL += values
                window.location.assign("http://localhost:3000/search"+queryURL)
            }
            else{
                this.setState({
                    redirect: false
                })
            }
        }

        const options = [
            { 
                key: 1, 
                text: <span><Icon color = 'orange'  name='hashtag' /> Good </span>, 
                value: "hash" 
            },
            { 
                key: 2, 
                text: <span><Icon color = 'orange'  name='user circle' /> Carvanner </span>, 
                value: "user" 
            },
            { 
                key: 3, 
                text: <span><Icon color = 'orange'  name='image' /> Image </span>, 
                value: "image" 
            }
          ]
        const {activeItem} = this.state
        var menuArray = menuJson.map((data,index) => {
            if (data.hasOwnProperty("name")){
                return <Menu.Item
                name = {data.name}
                as = {Link}
                to = {data.to}
                active = {activeItem === data.name}
                onClick = {this.handleItemClick}>
                    {data.display}
                </Menu.Item>
            }
            else{
                return <Menu.Item header>{data.display}</Menu.Item>
            }
        })
        
        


        
        return(
            <Grid.Row className = {styles.customRow}>
                
                <Grid.Column width = {16} className = {styles.customColumn}>
                    <Menu borderless  className = {styles.customMenu}>
                        {menuArray}
 
                        <Menu.Item>
                            <TransitionablePortal
                            transition={{
                                animation: 'zoom',
                                duration: 300

                            }}
                            trigger={
                                <Button compact circular icon = "upload" className = {styles.upload}/>
                            }
                            >
                                <Card className = {styles.login}>
                                
                                    <Card.Content textAlign = {"center"}>
                                        <Card.Header>We've got room for your image!</Card.Header>
                                    </Card.Content>
                                       
                                        <Card.Content extra textAlign = {"center"}>
                                            upload here
                                            <input type="file" id="file" name="filename" onChange={this.uploadFile} />
                                        </Card.Content>
                                </Card>
                            </TransitionablePortal>
                        </Menu.Item>
                        <Menu.Menu stackable position = 'right'>
                            <Menu.Item>
                                <TransitionablePortal
                                transition={{
                                    animation: 'zoom',
                                    duration: 300

                                }}
                                trigger={
                                    <Button icon labelPosition='right' className = {styles.upload}>
                                        Log In
                                      <Icon name='sign in alternate' />
                                    </Button>
                                }
                                >
                                    <Card className = {styles.login}>
                                        <Image src = {Travelers} wrapped ui = {false}/>
                                        {
                                            this.state.signIn ?
                                            <Card.Content textAlign = {"center"}>
                                                <Card.Header>Welcome back traveler!</Card.Header>
                                                <br></br>
                                                <Input icon='user circle' iconPosition='left' placeholder='Username' />
                                                <br></br>
                                                <br></br>
                                                <Input icon='key' iconPosition='left' placeholder='Password' />
                                                <br></br>
                                                <br></br>
                                                <Button compact circular icon = "upload" className = {styles.upload}>
                                                    Log In
                                                </Button>

                                            </Card.Content>
                                            :
                                            <Card.Content textAlign = {"center"}>
                                                <Card.Header>Come join us!</Card.Header>
                                                <br></br>
                                                <Input icon='user circle' iconPosition='left' placeholder='Username' />
                                                <br></br>
                                                <br></br>
                                                <Input icon='key' iconPosition='left' placeholder='Password' />
                                                <br></br>
                                                <br></br>
                                                <Input icon='key' iconPosition='left' placeholder='Confirm Password' />
                                                <br></br>
                                                <br></br>
                                                <Input icon='location arrow' iconPosition='left' placeholder='Location' />
                                                <br></br>
                                                <br></br>
                                                <Button compact circular icon = "upload" className = {styles.upload}>
                                                    Sign Up
                                                </Button>

                                            </Card.Content>
                                        }
                                        {
                                            this.state.signIn ?
                                            <Card.Content extra>
                                                <Label as='a' color = 'orange' ribbon onClick = {this.changeLogin}>
                                                    Need an acccount?
                                                </Label>
    
                                            </Card.Content>
                                            :
                                            <Card.Content extra>
                                                <Label as='a' color = 'orange' ribbon onClick = {this.changeLogin}>
                                                    Go back to sign in
                                                </Label>
    
                                            </Card.Content>
                                            
                                        }
                                    </Card>
                                </TransitionablePortal>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Grid.Column>
                <Grid.Column width = {4}/>
                <Grid.Column  width = {8} className = {styles.customColumn}>
                    <br></br>
                    <Menu borderless>
                        <Dropdown
                            clearable
                            fluid
                            multiple
                            search
                            selection
                            options={this.state.options}
                            onChange = {this.adjustQuery}
                            placeholder = 'Choose from our vast selection!'
                        />
                        <Dropdown onChange = {this.changeSearchType}  clearable selection options={options} placeholder='Search by...' />
                    </Menu>
                </Grid.Column>
                <Grid.Column verticalAlign = {"bottom"}  width = {4} >
                    {
                        (this.state.searchType.length && this.state.searchQuery.length) ?
                        
                        <Button size = 'big' color = 'orange' circular icon = 'search' onClick = {() => this.searchImage()}/>
                        :
                        <Button size = 'big' color = 'orange' disabled circular icon = 'search'/>
                    }
                </Grid.Column>
            </Grid.Row>
        )
    } 
}