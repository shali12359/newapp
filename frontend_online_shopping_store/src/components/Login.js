import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import NavBar from './Home/NavBar';

class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { 
            username: '',
            password: '',
            message: ''
         }
    }


    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            Username: this.state.username,
            Password: this.state.password,
        };
        axios.post('http://localhost:5000/user/sign-in', obj)
            .then(
                (response) => {
                    let time = new Date();
                    time.setTime(time.getTime() + (60*60*1000));
                    console.log(response);
                    const cookies = new Cookies();
                    cookies.set('token', response.data.token, { path: '/',expires:time });
                    cookies.set('user', {"username":response.data.username,"userId":response.data.userId,"type":response.data.type}, { path: '/',expires:time});
                    //console.log("User :" , cookies.get('user'));
                    this.setState({
                        message: response.data.message
                    });
                    if(this.state.message === 'Authentication successful'){
                        window.location.href = "/log";
                    }
                   
                },
                (error) => {
                    //console.log(error);
                    this.setState({
                        message: 'Invalid login, please try again'
                    });}
            );
        this.setState({
            message: '',
            username: '',
            password:'',
        });
    }


    

    render() { 
        return ( 
            <div>
            <NavBar/>
            <div className="container">
            <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 400 }}>
              <Header as='h2' color='teal' textAlign='center'>
                Log-in to your account
              </Header>
              <form onSubmit={this.onSubmit}>
              <Form  onSubmit={this.onSubmit} size='large'>
                <Segment stacked>
                  <Form.Input 
                    required
                    fluid icon='user' 
                    iconPosition='left' 
                    placeholder='E-mail address' 
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  />
                  <Form.Input
                    required
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.state.password}
                    onChange={this.onChangePassword}/>
                  
        
                  <Button color='teal' fluid size='large' type="submit">
                    Login
                  </Button>
                </Segment>
              </Form>
              </form>

              {   (this.state.message !== '') ? 

                    (
                        (this.state.message === 'Authentication successful') ? 
                        
                        (   <Message color='green'>
                                <center>{this.state.message}</center>
                            </Message>
                        )

                        :

                        (   <Message color='red'>
                                 <center>{this.state.message}</center>
                            </Message>
                        )

                    )
                    :
                    <Message color='olive'>
                        New to us?  <Link to="/Signup"className="edit">Sign Up</Link>
                    </Message>
          

            }
            </Grid.Column>
          </Grid>
          </div>
          </div>
         );
    }
}
 
export default Login;