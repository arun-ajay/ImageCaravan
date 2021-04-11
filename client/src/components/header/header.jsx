import React,{Component} from 'react';
import styles from  "components/header/header.module.scss"


import {Link} from "react-router-dom";
import Travelers from "components/header/assets/travelers.jpg"

import {Grid,Menu,Button,Card, Input, Image, Label,TransitionablePortal,Icon,Form,Dropdown} from 'semantic-ui-react'

import {menuJson} from "./data"


export default class SiteHeader extends Component{
    state = {
        activeItem : null,
        signIn: true,
        searchValue: null,
        options : [
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
                "text": "#squirrels",
                "value": "squirrels"
            },

        ]
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

    getSearchValue = () => {
        return this.state.searchValue
    }
  
    handleChange = (e) => {
        console.log("event",e.eventPhase)
        this.setState({
            searchValue: e.eventPhase
        }, () => {
            console.log(this.state.searchValue)
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
        console.log("redirecting");
    }

    componentDidMount(){
        this.setState({open: true})
        var path = null
        if (window.location.pathname === "/"){
            path = "Home"
        }
        this.setState({
            activeItem: path
        })
    }
    render () { 
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
                <Grid.Column width = {8} className = {styles.customColumn}>
                    <br></br>
                    {/* <Form>
                        <Form.Field>
                                <Form.Input
                                fluid
                                    icon={<Icon name='find' inverted circular link />}
                                placeholder='Check out our wares'
                                value = {this.state.searchValue}
                                onChange = {(e) => {
                                    this.handleChange(e)
                                }}
                                />
                        </Form.Field>
                    </Form> */}

                    <Dropdown
                        placeholder='Select your search term(s)'
                        fluid
                        multiple
                        search
                        selection
                        className = {styles.dropdown}
                        options={this.state.options}
                        onChange = {this.updateSelection.bind(this)}
                    />

                </Grid.Column>
            </Grid.Row>
        )
    } 
}