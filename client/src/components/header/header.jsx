import React,{Component} from 'react';
import styles from  "components/header/header.module.scss"


import {Link} from "react-router-dom";
import CamelLogo from "components/header/assets/camel.jpg"
import Travelers from "components/header/assets/travelers.jpg"

import {Grid,Menu,Button,Card, Input, Image, TransitionablePortal,Icon} from 'semantic-ui-react'

import {menuJson} from "./data"


export default class SiteHeader extends Component{
    state = {
        activeItem : null
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
                                    <Button className = {styles.upload}>
                                      Sign Up
                                    </Button>
                                }
                                >
                                    <Card className = {styles.login}>
                                        <Image src = {CamelLogo} wrapped ui = {false}/>
                                        <Card.Content textAlign = {"center"}>
                                            <Card.Header>Come join us!</Card.Header>
                                        </Card.Content>
                                        
                                            <Card.Content extra textAlign = {"center"}>
                                                <Button circular color='facebook' icon='facebook'  />
                                                <Button circular color='twitter' icon='twitter' />
                                                <Button circular color='linkedin' icon='linkedin' />
                                                <Button circular color='google plus' icon='google' onClick = {() => this.visitAuth(process.env.REACT_APP_AUTH)} />
                                            </Card.Content>
                                    </Card>
                                </TransitionablePortal>
                            </Menu.Item>
                            <Menu.Item>
                                <TransitionablePortal
                                transition={{
                                    animation: 'zoom',
                                    duration: 300

                                }}
                                trigger={
                                    <Button icon labelPosition='right' className = {styles.upload}>
                                      Sign in
                                      <Icon name='sign in alternate' />
                                    </Button>
                                }
                                >
                                    <Card className = {styles.login}>
                                        <Image src = {Travelers} wrapped ui = {false}/>
                                        <Card.Content textAlign = {"center"}>
                                            <Card.Header>Welcome back traveler!</Card.Header>
                                        </Card.Content>
                                            <Card.Content extra textAlign = {"center"}>
                                                <Button circular color='facebook' icon='facebook'  />
                                                <Button circular color='twitter' icon='twitter' />
                                                <Button circular color='linkedin' icon='linkedin' />
                                                <Button circular color='google plus' icon='google' onClick = {() => this.visitAuth(process.env.REACT_APP_AUTH)} />
                                            </Card.Content>
                                    </Card>
                                </TransitionablePortal>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Grid.Column>
                <Grid.Column width = {4}/>
                <Grid.Column width = {8} className = {styles.customColumn}>

                                <Input
                                fluid
                                    icon={<Icon name='find' inverted circular link />}
                                placeholder='Check out our wares'
                                />

                </Grid.Column>
            </Grid.Row>
        )
    } 
}